from pathlib import Path
from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field
from .db import init_db, execute, one, all_rows, connect
from .services.planner import generate_plan
import json, shutil, uuid

BASE=Path(__file__).resolve().parents[1]
FRONTEND=BASE.parent/"frontend"
UPLOADS=Path("/tmp")/"yatrasutra_uploads"
(UPLOADS/"sonic").mkdir(parents=True, exist_ok=True)
(UPLOADS/"heritage").mkdir(parents=True, exist_ok=True)

app=FastAPI(title="YatraSutra API", version="1.0.0")
app.add_middleware(CORSMiddleware,allow_origins=["*"],allow_credentials=False,allow_methods=["*"],allow_headers=["*"])

@app.on_event("startup")
def startup(): init_db()

class PlanIn(BaseModel):
    city:str="Delhi"; budget:int=Field(20000,ge=1000); days:int=Field(6,ge=1,le=15)
    interest:str="Krishna Heritage"; mode:str="Budget"; travellers:int=Field(2,ge=1,le=20)
class ExperienceIn(BaseModel): title:str; kind:str="tradition"
class SwapIn(BaseModel): artisan:str; learn:str; help:str
class SonicIn(BaseModel): title:str="My Sonic Capsule"; location:str="Varanasi"; note:str=""
class SevaIn(BaseModel): activity:str; credits:int=Field(...,gt=0,le=500)
class PriorityIn(BaseModel): category:str; note:str=""
class SosIn(BaseModel): kind:str="SOS"
class PassportIn(BaseModel): event_type:str; title:str; detail:str=""
class HeritageIn(BaseModel): year:int=Field(...,ge=1800,le=2100); note:str="Family archive contribution"

@app.get("/api/health")
def health(): return {"ok":True,"service":"YatraSutra API"}

@app.post("/api/planner")
def planner(p:PlanIn):
    plan=generate_plan(p.city,p.budget,p.days,p.interest,p.mode,p.travellers)
    jid=execute("INSERT INTO journeys(city,budget,days,interest,mode,travellers,route,estimated_cost) VALUES(?,?,?,?,?,?,?,?)",
        (p.city,p.budget,p.days,p.interest,p.mode,p.travellers,json.dumps(plan["route"]),plan["estimated_cost"]))
    plan["journey_id"]=jid
    execute("INSERT INTO passport_events(event_type,title,detail) VALUES(?,?,?)",("journey","Yatra planned"," → ".join(plan["route"])))
    return plan

@app.get("/api/journeys")
def journeys(): return all_rows("SELECT * FROM journeys ORDER BY id DESC LIMIT 20")

@app.post("/api/experiences")
def experience(p:ExperienceIn):
    i=execute("INSERT INTO experiences(title,kind) VALUES(?,?)",(p.title,p.kind))
    execute("INSERT INTO passport_events(event_type,title,detail) VALUES(?,?,?)",("experience",p.title,p.kind))
    return {"id":i,"status":"added","title":p.title}

@app.post("/api/cultureswap")
def culture_swap(p:SwapIn):
    i=execute("INSERT INTO culture_swaps(artisan,learn,help) VALUES(?,?,?)",(p.artisan,p.learn,p.help))
    execute("INSERT INTO passport_events(event_type,title,detail) VALUES(?,?,?)",("cultureswap",p.artisan,f"Learn {p.learn}; help with {p.help}"))
    return {"id":i,"status":"matched"}

@app.post("/api/sonic")
def sonic(p:SonicIn):
    i=execute("INSERT INTO sonic_capsules(title,location,note) VALUES(?,?,?)",(p.title,p.location,p.note))
    execute("INSERT INTO passport_events(event_type,title,detail) VALUES(?,?,?)",("sonic",p.title,p.location))
    return {"id":i,"status":"saved"}

@app.post("/api/sonic/upload")
async def sonic_upload(file:UploadFile=File(...), location:str=Form("Unknown")):
    ext=Path(file.filename or "audio.webm").suffix or ".webm"; name=f"{uuid.uuid4().hex}{ext}"
    dest=UPLOADS/"sonic"/name; dest.parent.mkdir(parents=True,exist_ok=True)
    with dest.open("wb") as f: shutil.copyfileobj(file.file,f)
    i=execute("INSERT INTO sonic_capsules(title,location,note,filename) VALUES(?,?,?,?)",(file.filename or "Sonic Capsule",location,"Recorded/uploaded capsule",name))
    return {"id":i,"status":"saved","filename":name}

@app.get("/api/seva")
def seva_wallet(): return {"credits":one("SELECT credits FROM seva_wallet WHERE id=1")["credits"],"ledger":all_rows("SELECT * FROM seva_ledger ORDER BY id DESC LIMIT 20")}

@app.post("/api/seva/earn")
def seva_earn(p:SevaIn):
    with connect() as con:
        con.execute("UPDATE seva_wallet SET credits=credits+? WHERE id=1",(p.credits,))
        con.execute("INSERT INTO seva_ledger(activity,delta) VALUES(?,?)",(p.activity,p.credits)); con.commit()
    return seva_wallet()

@app.post("/api/seva/redeem")
def seva_redeem(p:SevaIn):
    wallet=one("SELECT credits FROM seva_wallet WHERE id=1")["credits"]
    if wallet<p.credits: raise HTTPException(400,"Not enough Seva Credits")
    with connect() as con:
        con.execute("UPDATE seva_wallet SET credits=credits-? WHERE id=1",(p.credits,))
        con.execute("INSERT INTO seva_ledger(activity,delta) VALUES(?,?)",(p.activity,-p.credits)); con.commit()
    return seva_wallet()

@app.post("/api/priority")
def priority(p:PriorityIn):
    i=execute("INSERT INTO priority_requests(category,note) VALUES(?,?)",(p.category,p.note))
    return {"id":i,"status":"demo-review","message":"Assistance request saved for transparent review."}

@app.post("/api/sos")
def sos(p:SosIn):
    i=execute("INSERT INTO sos_events(kind,relays,status) VALUES(?,?,?)",(p.kind,3,"Help Point reached"))
    return {"id":i,"relays":3,"status":"Help Point reached"}

@app.get("/api/passport")
def passport():
    events=all_rows("SELECT * FROM passport_events ORDER BY id DESC LIMIT 100")
    counts={}
    for e in events: counts[e["event_type"]]=counts.get(e["event_type"],0)+1
    return {"events":events,"counts":counts}

@app.post("/api/passport/event")
def passport_event(p:PassportIn):
    i=execute("INSERT INTO passport_events(event_type,title,detail) VALUES(?,?,?)",(p.event_type,p.title,p.detail))
    return {"id":i,"status":"saved"}

@app.post("/api/documentary")
def documentary():
    events=all_rows("SELECT * FROM passport_events ORDER BY id ASC LIMIT 50")
    title="My YatraSutra — A Living Heritage Journey"
    chapters=[{"title":e["title"],"detail":e["detail"],"type":e["event_type"]} for e in events[-8:]]
    return {"status":"generated","title":title,"chapters":chapters,"narration":"A journey through sacred routes, living traditions, sounds and shared memories."}

@app.get("/api/heritage")
def heritage(): return all_rows("SELECT * FROM heritage_photos ORDER BY year,id")

@app.post("/api/heritage")
def heritage_meta(p:HeritageIn):
    i=execute("INSERT INTO heritage_photos(year,note) VALUES(?,?)",(p.year,p.note))
    return {"id":i,"status":"archived"}

@app.post("/api/heritage/upload")
async def heritage_upload(file:UploadFile=File(...), year:int=Form(...), note:str=Form("Family archive contribution")):
    ext=Path(file.filename or "photo.jpg").suffix or ".jpg"; name=f"{uuid.uuid4().hex}{ext}"
    dest=UPLOADS/"heritage"/name; dest.parent.mkdir(parents=True,exist_ok=True)
    with dest.open("wb") as f: shutil.copyfileobj(file.file,f)
    i=execute("INSERT INTO heritage_photos(year,note,filename) VALUES(?,?,?)",(year,note,name))
    return {"id":i,"status":"archived","filename":name}

app.mount("/uploads",StaticFiles(directory=str(UPLOADS)),name="uploads")
app.mount("/",StaticFiles(directory=str(FRONTEND),html=True),name="frontend")

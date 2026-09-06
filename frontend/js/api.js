const API = {
  async req(path, options={}) {
    const r=await fetch(`/api${path}`, {headers:{"Content-Type":"application/json",...(options.headers||{})},...options});
    if(!r.ok) throw new Error((await r.text()) || `HTTP ${r.status}`);
    return r.json();
  },
  post(path,data){return this.req(path,{method:"POST",body:JSON.stringify(data)})},
  get(path){return this.req(path)}
};
function apiStatus(msg,ok=true){
  let e=document.getElementById("backendStatus"); if(!e)return;
  e.textContent=msg; e.dataset.ok=ok?"1":"0";
}
window.addEventListener("DOMContentLoaded",async()=>{
  try{await API.get("/health");apiStatus("● BACKEND LIVE",true)}
  catch(e){apiStatus("● FRONTEND DEMO MODE",false)}
  refreshPassport();
  refreshSeva();
});
async function refreshPassport(){
  try{
    const p=await API.get("/passport");
    const c=p.counts||{}, el=document.getElementById("passportStats");
    if(el) el.textContent=`${c.journey||0} journeys • ${c.sonic||0} sonic capsules • ${c.cultureswap||0} CultureSwaps • ${c.experience||0} experiences`;
  }catch(e){}
}
async function refreshSeva(){
  try{const w=await API.get("/seva");document.querySelectorAll(".sevaCredits").forEach(x=>x.textContent=w.credits)}catch(e){}
}

from pathlib import Path
import sqlite3

BASE_DIR = Path(__file__).resolve().parents[1]
DB_PATH = Path("/tmp") / "yatrasutra.db"

SCHEMA = """
CREATE TABLE IF NOT EXISTS journeys(
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 city TEXT, budget INTEGER, days INTEGER, interest TEXT, mode TEXT, travellers INTEGER,
 route TEXT, estimated_cost INTEGER, created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS experiences(
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 title TEXT, kind TEXT, status TEXT DEFAULT 'added', created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS culture_swaps(
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 artisan TEXT, learn TEXT, help TEXT, status TEXT DEFAULT 'matched', created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS sonic_capsules(
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 title TEXT, location TEXT, note TEXT, filename TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS seva_wallet(
 id INTEGER PRIMARY KEY CHECK(id=1), credits INTEGER NOT NULL DEFAULT 240
);
CREATE TABLE IF NOT EXISTS seva_ledger(
 id INTEGER PRIMARY KEY AUTOINCREMENT, activity TEXT, delta INTEGER, created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS priority_requests(
 id INTEGER PRIMARY KEY AUTOINCREMENT, category TEXT, note TEXT, status TEXT DEFAULT 'demo-review', created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS sos_events(
 id INTEGER PRIMARY KEY AUTOINCREMENT, kind TEXT, relays INTEGER DEFAULT 3, status TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS passport_events(
 id INTEGER PRIMARY KEY AUTOINCREMENT, event_type TEXT, title TEXT, detail TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS heritage_photos(
 id INTEGER PRIMARY KEY AUTOINCREMENT, year INTEGER, note TEXT, filename TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
"""
def connect():
    con=sqlite3.connect(DB_PATH)
    con.row_factory=sqlite3.Row
    return con

def init_db():
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    with connect() as con:
        con.executescript(SCHEMA)
        con.execute("INSERT OR IGNORE INTO seva_wallet(id,credits) VALUES(1,240)")
        con.commit()

def execute(sql, params=()):
    with connect() as con:
        cur=con.execute(sql, params); con.commit()
        return cur.lastrowid

def one(sql, params=()):
    with connect() as con:
        r=con.execute(sql, params).fetchone()
        return dict(r) if r else None

def all_rows(sql, params=()):
    with connect() as con:
        return [dict(r) for r in con.execute(sql, params).fetchall()]

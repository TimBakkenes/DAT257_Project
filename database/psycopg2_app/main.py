from fastapi import FastAPI, Depends
#from database import engine, SessionLocal
#from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Annotated
#from sqlalchemy import Column, String, Integer
#from database import Base
from fastapi.middleware.cors import CORSMiddleware
from postgres_server import db


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

with open("tables.sql", "r") as file:
   sql_script = file.read()
   db.cur.execute(sql_script)

@app.post("/user")
async def add_user(id, user):
   return db.add_user(id, user)

@app.get("/user")
async def get_user():
   return db.get_users()







    





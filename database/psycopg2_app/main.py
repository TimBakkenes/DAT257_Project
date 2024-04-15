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

class UserBase(BaseModel):
    username: str


@app.post("/user")
async def add_user():
   pass

@app.get("/user")
async def get_user():
   return db.get_users()







    





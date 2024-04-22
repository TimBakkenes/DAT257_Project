from fastapi import FastAPI
from typing import List, Annotated
from fastapi.middleware.cors import CORSMiddleware
from postgres_connection import DataBaseManager
from contextlib import asynccontextmanager


dc = DataBaseManager()
@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Connected")
    dc.get_conn()
    dc.get_cursor()

    yield
    print("Disconnecting")
    dc.disconnect()

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

@app.post("/api/post/add_user")
async def add_user(id, user, bio):
   return dc.add_user(id, user, bio)

@app.get("/api/get/get_user")
async def get_user():
   return dc.get_users()

@app.get("/api/get/get_favourites")
async def get_favourites(user: str):
   return dc.get_favourites(user)
   








    





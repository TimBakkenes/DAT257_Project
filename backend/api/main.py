from fastapi import FastAPI
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


@app.get("/")
def read_root():
   return {"message": "Hello, world!"}

@app.get("/test")
def read_root():
   return {"message": "Hello, world!"}

@app.post("/api/post/add_user")
async def add_user(id, user, bio):
   return dc.add_user(id, user, bio)

@app.get("/api/get/get_users")
async def get_users():
   return dc.get_users()

@app.get("/api/get/get_favourites")
async def get_favourites(user: str):
   return dc.get_favourites(user)

@app.post("/api/post/add_favourite")
async def add_favourite(user: str, store: str):
   return dc.add_favourite(user, store)
   








    





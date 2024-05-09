from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from postgres_connection import DataBaseManager
from contextlib import asynccontextmanager


dc = DataBaseManager()
@asynccontextmanager
async def lifespan(app: FastAPI):
   print("Connecting ... ")
   dc.get_conn()
   dc.get_cursor()
   print("Connected")
   yield
   print("Disconnecting ... ")
   dc.disconnect()
   print("Disconnected")

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


# Users
@app.post("/api/post/add_user")
async def add_user(id, user, bio):
   return dc.add_user(id, user, bio)

@app.get("/api/get/get_users")
async def get_users():
   return dc.get_users()

@app.post("/api/post/remove_user")
async def remove_user(id, user):
   return dc.remove_user(id, user)


# Stores
@app.get("/api/get/get_stores")
async def get_stores():
   return dc.get_favourites()

@app.post("/api/post/add_store")
async def add_store(id, owner, name, lat, long):
   return dc.add_store(id, owner, name, lat, long)

@app.post("/api/post/remove_store")
async def remove_store(id: str):
   return dc.remove_store(id)


# Favourites
@app.get("/api/get/get_favourites")
async def get_favourites(user: str):
   return dc.get_favourites(user)

@app.post("/api/post/add_favourite")
async def add_favourite(user: str, store: str):
   return dc.add_favourite(user, store)

@app.post("/api/post/remove_favourite")
async def remove_favourite(user: str, store: str):
   return dc.remove_favourite(user, store)


# Ratings
@app.get("/api/get/get_ratings")
async def get_rating(user: str, store:str):
   return dc.get_ratings(user, store)

@app.get("/api/get/get_all_stores_ratings")
async def get_all_stores_ratings():
   return dc.get_all_stores_rating()

@app.post("/api/post/add_rating")
async def add_rating(user: str, store: str, rating:int):
   return dc.add_rating(user, store, rating)

@app.post("/api/post/remove_rating")
async def remove_rating(user: str, store: str):
   return dc.add_rating(user, store)








    




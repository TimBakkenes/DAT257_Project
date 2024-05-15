
from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import postgres_connection as dc
from pydantic import BaseModel

class FavouriteData(BaseModel):
    user: str
    store: str

class RatingData(BaseModel):
    user: str
    store: str
    rating: int

class Store(BaseModel):
    name: str
    owner: str
    description: str
    type: str
    lat: float
    long: float
   
class RemoveRatingData(BaseModel):
    user: str
    store: str

class UserData(BaseModel):
   username: str
   displayname: str
   bio: str
   password: str

class RemoveUserData(BaseModel):
   id: str
   user: str

@asynccontextmanager
async def lifespan(app: FastAPI):
   print("Connecting ... ")
   dc.database_context()
   print("Connected")
   yield
   print("Disconnecting ... ")
   
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
@app.get("/api/get/login")
async def login(username, password):
   return dc.log_in(username, password)


@app.get("/api/get/user/{user_id}")
async def get_user_profile(user_id: str):
    user_info = dc.get_user_by_id(user_id)
    return user_info


@app.post("/api/post/add_user")
async def add_user(model: UserData):
   print("Start")
   return dc.add_user(model.username, model.displayname, model.bio, model.password)

@app.get("/api/get/get_users")
async def get_users():
   return dc.get_users()

@app.post("/api/post/remove_user")
async def remove_user(model: RemoveUserData):
   return dc.remove_user(model.id, model.user)


# Stores
@app.get("/api/get/get_stores")
async def get_stores():
   return dc.get_stores()
    

@app.post("/api/post/add_store")
async def add_store(store: Store):
   print(store)
   return dc.add_store(store.name, store.owner, store.description, store.type, store.lat, store.long)


@app.post("/api/post/remove_store")
async def remove_store(id: str):
   return dc.remove_store(id)


# Favourites
@app.get("/api/get/get_favourites")
async def get_favourites(user: str):
   return dc.get_favourites(user)

@app.post("/api/post/add_favourite")
async def add_favourite(favourite_data: FavouriteData):
    try:
        dc.add_favourite(favourite_data.user, favourite_data.store)
    except Exception as e:
        raise Exception(str(e))

@app.post("/api/post/remove_favourite")
async def remove_favourite(favourite_data: FavouriteData):
   try:
        return dc.remove_favourite(favourite_data.user, favourite_data.store)
   except Exception as e:
      raise Exception(str(e))
   

# Ratings
@app.get("/api/get/get_ratings")
async def get_rating(user: str, store:str):
   return dc.get_ratings(user, store)

@app.get("/api/get/get_user_ratings")
async def get_user_ratings(user: str):
   return dc.get_user_ratings(user)

@app.get("/api/get/get_all_stores_ratings")
async def get_all_stores_ratings():
   return dc.get_all_stores_rating()

@app.post("/api/post/add_rating")
async def add_rating(model: RatingData):
   return dc.add_rating(model.user, model.store, model.rating)

@app.post("/api/post/remove_rating")
async def remove_rating(model: RemoveRatingData):
   return dc.add_rating(model.user, model.store)








    





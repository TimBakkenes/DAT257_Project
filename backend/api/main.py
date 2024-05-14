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

class StoreData(BaseModel):
    id: str
    owner: str
    name: str
    lat: float
    long: float
   
class RemoveRatingData(BaseModel):
    user: str
    store: str

# @asynccontextmanager
# async def lifespan(app: FastAPI):
#    print("Connecting ... ")
#    dc.database_context()
#    print("Connected")
#    yield
#    print("Disconnecting ... ")
#    dc.disconnect()
#    print("Disconnected")

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


# # Users
# @app.post("/api/post/add_user")
# async def add_user(id, user, bio):
#    return dc.add_user(id, user, bio)

# @app.get("/api/get/get_users")
# async def get_users():
#    return dc.get_users()

# @app.post("/api/post/remove_user")
# async def remove_user(id, user):
#    return dc.remove_user(id, user)


# # Stores
# @app.get("/api/get/get_stores")
# async def get_stores():
#    return dc.get_favourites()

@app.post("/api/post/add_store")
async def add_store(model: StoreData):
   return dc.add_store(model.id, model.owner, model.name, model.lat, model.long)

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
   

# # Ratings
# @app.get("/api/get/get_ratings")
# async def get_rating(user: str, store:str):
#    return dc.get_ratings(user, store)

# @app.get("/api/get/get_all_stores_ratings")
# async def get_all_stores_ratings():
#    return dc.get_all_stores_rating()

@app.post("/api/post/add_rating")
async def add_rating(model: RatingData):
   return dc.add_rating(model.user, model.store, model.rating)

@app.post("/api/post/remove_rating")
async def remove_rating(model: RemoveRatingData):
   return dc.add_rating(model.user, model.store)








    





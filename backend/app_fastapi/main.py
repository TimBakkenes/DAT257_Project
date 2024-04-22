from fastapi import FastAPI, Depends
from database import engine, SessionLocal
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Annotated
from sqlalchemy import Column, String, Integer
from database import Base
from fastapi.middleware.cors import CORSMiddleware

class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True)

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

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
    

db_dependancy = Annotated[Session, Depends(get_db)]

@app.post("/user")
async def add_user(user: UserBase, db: Session = Depends(get_db)):
    db_user = User(username=user.username)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.get("/user")
async def get_user(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return users







    





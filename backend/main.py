from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import Base, engine, SessionLocal
import models, schemas, auth

Base.metadata.create_all(bind=engine)

app = FastAPI()
@app.get("/ping")
def ping():
    return {"message": "backend is alive"}


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],   # <-- THIS enables OPTIONS
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/register")
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    new_user = models.User(
        username=user.username,
        password=auth.hash_password(user.password),
        role=user.role
    )
    db.add(new_user)
    db.commit()
    return {"msg": "User registered"}

@app.post("/attendance")
def mark_attendance(att: schemas.AttendanceCreate, db: Session = Depends(get_db)):
    record = models.Attendance(**att.dict())
    db.add(record)
    db.commit()
    return {"msg": "Attendance marked"}

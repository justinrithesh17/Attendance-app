from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from database import Base, engine, SessionLocal
import models, schemas, auth
from auth import verify_password, create_access_token, SECRET_KEY

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# OAuth2 scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# Root route
@app.get("/")
def root():
    return {"message": "backend is running successfully"}


# Database dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Get current user from token
def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        username = payload.get("sub")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = db.query(models.User).filter(models.User.username == username).first()

    if user is None:
        raise HTTPException(status_code=401, detail="User not found")

    return user


# Register
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


# Login
@app.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = db.query(models.User).filter(
        models.User.username == form_data.username
    ).first()

    if not user:
        raise HTTPException(status_code=400, detail="User not found")

    if not verify_password(form_data.password, user.password):
        raise HTTPException(status_code=400, detail="Incorrect password")

    access_token = create_access_token({"sub": user.username})

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "role": user.role
    }

# Protected attendance route
@app.get("/attendance")
def get_attendance(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    records = db.query(models.Attendance).filter(
        models.Attendance.student_id == current_user.id
    ).all()

    return records

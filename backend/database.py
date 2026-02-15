import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Try to get DATABASE_URL from environment
DATABASE_URL = os.getenv("DATABASE_URL")

# If not found (local development), use SQLite
if not DATABASE_URL:
    DATABASE_URL = "sqlite:///./attendance.db"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

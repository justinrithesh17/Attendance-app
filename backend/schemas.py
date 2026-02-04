from pydantic import BaseModel
from datetime import date

class UserCreate(BaseModel):
    username: str
    password: str
    role: str

class AttendanceCreate(BaseModel):
    student_id: int
    date: date
    present: bool

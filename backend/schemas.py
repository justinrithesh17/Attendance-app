from pydantic import BaseModel


class UserCreate(BaseModel):
    username: str
    password: str
    role: str


class AttendanceCreate(BaseModel):
    student_id: int
    subject: str
    date: str
    present: bool

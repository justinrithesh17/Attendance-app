import React, { useEffect, useState } from "react"; 
import { fetchAllStudents, markStudentAttendance } from "../services/apiService"; 

function AttendancePage() { 
  const [studentsList, setStudentsList] = useState([]); 
  const [selectedDate, setSelectedDate] = useState(""); 

  useEffect(() => {
    async function loadStudentsFromDatabase() {
      const studentsData = await fetchAllStudents(); 
      setStudentsList(studentsData); 
    }
    loadStudentsFromDatabase(); 
  }, []);

  const handleAttendanceChange = async (studentIdentifier, attendanceStatusValue) => {
    await markStudentAttendance({
      studentId: studentIdentifier,
      date: selectedDate,
      status: attendanceStatusValue,
    });
  };

  return (
    <div>
      <h1>Mark Attendance</h1>
      <input
        type="date"
        value={selectedDate}
        onChange={(event) => setSelectedDate(event.target.value)}
      />
      <ul>
        {studentsList.map((studentObject) => (
          <li key={studentObject.id}>
            {studentObject.name}
            <button
              onClick={() =>
                handleAttendanceChange(studentObject.id, "Present")
              }
            >
              Present
            </button>
            <button
              onClick={() =>
                handleAttendanceChange(studentObject.id, "Absent")
              }
            >
              Absent
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AttendancePage;
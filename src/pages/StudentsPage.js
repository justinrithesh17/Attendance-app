import React, { useEffect, useState } from "react"; 
import { fetchAllStudents } from "../services/apiService"; 

function StudentsPage() { 
  const [studentsList, setStudentsList] = useState([]); 

  useEffect(() => {
    async function loadStudentsFromDatabase() {
      const studentsData = await fetchAllStudents(); 
      setStudentsList(studentsData); 
    }
    loadStudentsFromDatabase(); 
  }, []);

  return (
    <div>
      <h1>Students List</h1>
      <ul>
        {studentsList.map((studentObject) => (
          <li key={studentObject.id}>
            {studentObject.name} - {studentObject.department}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentsPage;
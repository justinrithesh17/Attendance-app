import { useState } from "react"
import axios from "axios"

export default function Attendance({ teacher }) {
  const [studentId, setStudentId] = useState("")
  const [present, setPresent] = useState(true)

  const markAttendance = async () => {
    await axios.post("/attendance", {
      student_id: Number(studentId),
      date: new Date().toISOString().split("T")[0],
      present
    })
    alert("Attendance marked")
  }

  return (
    <div>
      <h3>Attendance</h3>

      {teacher && (
        <>
          <input
            placeholder="Student ID"
            value={studentId}
            onChange={e => setStudentId(e.target.value)}
          /><br /><br />

          <label>
            <input
              type="checkbox"
              checked={present}
              onChange={() => setPresent(!present)}
            />
            Present
          </label><br /><br />

          <button onClick={markAttendance}>Submit</button>
        </>
      )}

      {!teacher && <p>Attendance details will appear here.</p>}
    </div>
  )
}

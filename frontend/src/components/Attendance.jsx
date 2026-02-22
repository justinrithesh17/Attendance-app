import { useState, useEffect } from "react"
import axios from "axios"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts"

export default function Attendance({ teacher }) {

  const [studentId, setStudentId] = useState("")
  const [present, setPresent] = useState(true)

  // ✅ NEW STATES (ADDED)
  const [attendanceData, setAttendanceData] = useState(null)

  const markAttendance = async () => {

    try {

      // ✅ GET TOKEN
      const token = localStorage.getItem("token")

      await axios.post("/attendance", {
        student_id: Number(studentId),
        date: new Date().toISOString().split("T")[0],
        present
      }, {
        headers: {
          Authorization: `Bearer ${token}`  // ✅ ADDED TOKEN HEADER
        }
      })

      alert("Attendance marked")

    } catch (error) {
      console.log("Error marking attendance:", error)
      alert("Failed to mark attendance")
    }
  }

  // ✅ Fetch student attendance if NOT teacher
  useEffect(() => {

    if (!teacher) {

      const fetchAttendance = async () => {
        try {

          // ✅ TOKEN MODULE ADDED HERE (AS REQUESTED)
          const token = localStorage.getItem("token")

          const response = await axios.get("/attendance", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })

          setAttendanceData(response.data)

        } catch (error) {
          console.log("Error fetching attendance:", error)
        }
      }

      fetchAttendance()
    }

  }, [teacher])

  // ✅ Prepare chart data
  const chartData = attendanceData ? [
    { name: "Present", value: attendanceData.present },
    { name: "Absent", value: attendanceData.absent }
  ] : []

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

      {!teacher && attendanceData && (
        <div>

          <h4>Attendance Percentage: {attendanceData.percentage}%</h4>

          <PieChart width={300} height={300}>
            <Pie
              data={chartData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              <Cell fill="#4CAF50" />
              <Cell fill="#F44336" />
            </Pie>
            <Tooltip />
          </PieChart>

          <BarChart width={400} height={300} data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#2196F3" />
          </BarChart>

        </div>
      )}

      {!teacher && !attendanceData && (
        <p>Attendance details will appear here.</p>
      )}
    </div>
  )
}
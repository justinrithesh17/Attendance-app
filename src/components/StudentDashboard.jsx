import Attendance from "./Attendance"
import Analytics from "./Analytics" 
import { useEffect, useState } from "react"
import axios from "axios" 

export default function StudentDashboard({ user }) {
  const [records, setRecords] = useState([])
  
   useEffect(() => {
    axios.get("/attendance")
      .then(res => setRecords(res.data))
  }, [])

  const [analytics, setAnalytics] = useState({})

  useEffect(() => {
    axios.get("/attendance/analytics")
    .then(res => setAnalytics(res.data))
  }, [])
  
function StudentDashboard() { 
  return (
    <div>
      <h2>Student Dashboard</h2>
      <Analytics />
    </div>
  )
}
  return (
    <><div>
      <h2>Your Attendance</h2>
      {records.map(r => (
        <p key={r.id}>
          {r.date} - {r.present ? "Present" : "Absent"}
        </p>
      ))}
      
    </div><div>
        <h3>Attendance Analytics</h3>
        <p>Total Classes: {analytics.total_classes}</p>
        <p>Present: {analytics.present}</p>
        <p>Percentage: {analytics.percentage}%</p>
      </div></>
  )}
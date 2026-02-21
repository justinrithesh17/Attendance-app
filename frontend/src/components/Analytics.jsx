import { useEffect, useState } from "react"
import axios from "axios"
import { Pie, Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from "chart.js"

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
)

export default function Analytics() {

  const [analytics, setAnalytics] = useState({})
  const [attendance, setAttendance] = useState([])

  useEffect(() => {
    fetchAnalytics()
    fetchAttendance()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get("/attendance/analytics")
      setAnalytics(res.data)
    } catch (err) {
      console.log("Analytics error", err)
    }
  }

  const fetchAttendance = async () => {
    try {
      const res = await axios.get("/attendance")
      setAttendance(res.data)
    } catch (err) {
      console.log("Attendance error", err)
    }
  }

  // Pie Chart Data
  const pieData = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        data: [
          analytics.present || 0,
          (analytics.total_classes || 0) - (analytics.present || 0)
        ],
        backgroundColor: ["#4CAF50", "#F44336"]
      }
    ]
  }

  // Subject-wise calculation
  const subjectStats = {}
  attendance.forEach(record => {
    if (!subjectStats[record.subject]) {
      subjectStats[record.subject] = { total: 0, present: 0 }
    }
    subjectStats[record.subject].total += 1
    if (record.present) {
      subjectStats[record.subject].present += 1
    }
  })

  const barData = {
    labels: Object.keys(subjectStats),
    datasets: [
      {
        label: "Attendance %",
        data: Object.keys(subjectStats).map(subject => {
          const s = subjectStats[subject]
          return ((s.present / s.total) * 100).toFixed(2)
        }),
        backgroundColor: "#2196F3"
      }
    ]
  }

  return (
    <div style={{ padding: "20px" }}>

      <h2>Attendance Analytics</h2>

      <p><strong>Total Classes:</strong> {analytics.total_classes}</p>
      <p><strong>Present:</strong> {analytics.present}</p>
      <p><strong>Percentage:</strong> {analytics.percentage}%</p>

      <div style={{ width: "300px", margin: "20px auto" }}>
        <Pie data={pieData} />
      </div>

      <div style={{ width: "500px", margin: "20px auto" }}>
        <Bar data={barData} />
      </div>

    </div>
  )
}
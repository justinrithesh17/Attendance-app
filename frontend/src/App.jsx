import axios from "axios"
import { useState } from "react"
import Login from "./components/Login"
import StudentDashboard from "./components/StudentDashboard"
import TeacherDashboard from "./components/TeacherDashboard"

axios.defaults.baseURL = "https://attendance-backend-fdhd.onrender.com"
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
 

function App() {
  const [user, setUser] = useState(null)

  if (!user) {
    return <Login setUser={setUser} />
  }

  if (user.role === "student") {
    return <StudentDashboard user={user} />
  }

  if (user.role === "teacher") {
    return <TeacherDashboard user={user} />
  }

  return null
}

export default App

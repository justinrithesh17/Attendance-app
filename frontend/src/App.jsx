import axios from "axios"
import { useState } from "react"
import Login from "./components/Login"
import StudentDashboard from "./components/StudentDashboard"
import TeacherDashboard from "./components/TeacherDashboard"

axios.defaults.baseURL = "https://attendance-backend-fdhd.onrender.com"

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

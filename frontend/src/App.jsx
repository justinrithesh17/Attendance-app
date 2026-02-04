import axios from "axios"
import { useState } from "react"
import Login from "./components/Login"
import StudentDashboard from "./components/StudentDashboard"
import TeacherDashboard from "./components/TeacherDashboard"

axios.defaults.baseURL = "http://127.0.0.1.8000"

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

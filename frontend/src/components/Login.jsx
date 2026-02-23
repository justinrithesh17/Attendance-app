import { useState } from "react"
import axios from "axios"

axios.defaults.baseURL = "https://attendance-backend-fdhd.onrender.com"

export default function Login({ setUser }) {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("student")

  // Original handleLogin (kept as-is)
  const handleLogin = async () => {
    try {
      const formData = new URLSearchParams()
      formData.append("username", username)
      formData.append("password", password)
      formData.append("grant_type", "password")

      const res = await axios.post("/login", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })

      localStorage.setItem("token", res.data.access_token)

      setUser({
        username: username,
        role: res.data.role
      })

      alert("Login successful")

    } catch (error) {
      alert("Login failed")
    }
  }

  const testApiCall = async () => {
    try {
      const response = await axios.post("/register", {
        username: "testuser1",
        password: "1234",
        role: "student"
      })
      console.log("API Response:", response.data)
      alert("Backend connected successfully!")
    } catch (error) {
      console.error("API Error:", error)
      alert("Backend connection failed")
    }
  }

  // ✅ Added new snippet: handleLogin with logging
  const handleLoginWithLogs = async () => {
    try {
      const formData = new URLSearchParams()
      formData.append("username", username)
      formData.append("password", password)
      formData.append("grant_type", "password")  // 🔥 REQUIRED

      const res = await axios.post("/login", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })

      console.log("Login response:", res.data)

      localStorage.setItem("token", res.data.access_token)

      setUser({
        username: username,
        role: res.data.role
      })

      alert("Login successful")

    } catch (error) {
      console.log("Login error:", error.response?.data)
      alert("Login failed")
    }
  }

  return (
    <div>
      <h2>Login</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
      </select><br /><br />

      <button onClick={handleLogin}>Login</button>
      {/* ✅ Added new button for logging version */}
      <button onClick={handleLoginWithLogs}>Login (with logs)</button>
    </div>
  )
}

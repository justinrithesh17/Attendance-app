import { useState } from "react"
import axios from "axios"

axios.defaults.baseURL = "https://super-taiyaki-68c997.https://super-taiyaki-68c997.netlify.app/.app/://127.0.0.1:8000"

export default function Login({ setUser }) {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("student")

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
    </div>
  )
}
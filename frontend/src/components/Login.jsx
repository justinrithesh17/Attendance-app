import { useState } from "react"
import axios from "axios"

axios.defaults.baseURL = "http://127.0.0.1:8000"

export default function Login({ setUser }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("student")

  const handleLogin = async () => {
    // TEMP login (no auth yet)
    setUser({ username, role })
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
    <div style={{ width: 300, margin: "100px auto" }}>
      <h2>Login</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      /><br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      /><br /><br />

      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
      </select><br /><br />
      
    
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

import Attendance from "./Attendance"

export default function StudentDashboard({ user }) {
  return (
    <div>
      <h2>Welcome, {user.username} (Student)</h2>
      <Attendance />
    </div>
  )
}

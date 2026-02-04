import Attendance from "./Attendance"

export default function TeacherDashboard({ user }) {
  return (
    <div>
      <h2>Welcome, {user.username} (Teacher)</h2>
      <Attendance teacher />
    </div>
  )
}

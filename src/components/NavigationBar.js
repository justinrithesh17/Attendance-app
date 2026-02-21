import React from "react"; 
import { Link } from "react-router-dom"; 
import "../styles/navigationBarStyles.css"; 

function NavigationBar() { 
  return (
    <nav className="navigation-bar-container">
      <h2 className="application-title">Attendance Management</h2>
      <ul className="navigation-links-list">
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/students">Students</Link>
        </li>
        <li>
          <Link to="/attendance">Attendance</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationBar;
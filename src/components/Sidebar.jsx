import { Link } from "react-router-dom";

import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

import "../styles/sidebar.css";

export default function Sidebar({ isOpen, onClose }) {

  const { user, logout } =
    useContext(AuthContext);

  // HIDE SIDEBAR IF NOT LOGGED IN
  if (!user) return null;

  return (

    <div className={`sidebar ${isOpen ? "open" : ""}`}>

      <div className="sidebar-logo">
        HIREIQ
      </div>

      <div className="sidebar-links">

        {/* COMMON */}
        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/jobs">
          View Jobs
        </Link>

        {/* CANDIDATE */}
        {user.role === "candidate" && (

        <>
          <Link to="/my-applications">
            My Applications
          </Link>  
          
          <Link to="/edit-profile">
              Edit Profile
        </Link>

         <Link to="/profile">View Profile</Link>

         <Link to="/mock-interview">
  AI Mock Interview
</Link>

          
         </>
          )}

        {/* HR */}
        {user.role === "hr" && (
          <>

            <Link to="/add-job">
              Post Job
            </Link>

            <Link to="/applicants">
              Applicants
            </Link>

          </>
        )}

        <button
          className="sidebar-logout"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </div>

  );

}
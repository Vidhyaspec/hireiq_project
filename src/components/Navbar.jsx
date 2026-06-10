import { Link } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

import "../styles/navbar.css";

export default function Navbar({ toggleSidebar, showHamburger }) {

  const { user, logout } = useContext(AuthContext);

  return (

    <div className={`navbar ${user ? "navbar-logged-in" : ""}`}>

      <div className="navbar-brand">
        {showHamburger && user && (
          <button className="hamburger-btn" onClick={toggleSidebar} aria-label="Toggle Menu">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        )}
        <div className="logo">
          HIREIQ
        </div>
      </div>

      <div className="nav-links">

        {/* NOT LOGGED IN */}
        {!user && (
          <>
            <Link to="/">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {/* LOGGED IN */}
        {user && (
          <>

            <Link to="/dashboard">Dashboard</Link>
            <Link to="/jobs">View Jobs</Link>

            {/* CANDIDATE */}
            {user.role === "candidate" && (
              <>
                {/* FIXED ROUTE */}
                <Link to="/my-applications">
                  My Applications
                </Link>

                <Link to="/edit-profile">
                  Edit Profile
                </Link>

                <Link to="/profile">
                  View Profile
                </Link>

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
              className="logout-btn"
              onClick={logout}
            >
              Logout
            </button>

          </>
        )}

      </div>

    </div>

  );
}
import { Link } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

import "../styles/navbar.css";

export default function Navbar() {

  const { user, logout } = useContext(AuthContext);

  return (

    <div className="navbar">

      <div className="logo">
        HIREIQ
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
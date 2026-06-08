import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import "../styles/jobs.css";
import API_URL from "../config";

export default function Applicants() {

  const [applications, setApplications] =
    useState([]);

  // FETCH APPLICATIONS
  const fetchApplications = () => {

    axios.get(
      '${API_URL}/get_applications.php'
    )

    .then((res) => {

      setApplications(res.data);

    });

  };

  useEffect(() => {

    fetchApplications();

  }, []);

  // UPDATE STATUS
  const updateStatus = (
    id,
    status
  ) => {

    axios.post(

      '${API_URL}/update_status.php',

      {
        id,
        status
      }

    )

    .then((res) => {

     toast.success(res.data.message);

      // REFRESH DATA
      fetchApplications();

    });

  };

  return (

    <div className="jobs-container">

      <h1 className="jobs-title">
        Job Applicants
      </h1>

      {applications.length === 0 ? (

        <div className="empty-state">

  <img
    src="https://cdn-icons-png.flaticon.com/512/4076/4076478.png"
    alt="empty"
  />

  <h2>No Applicants Yet</h2>

  <p>
    Applications will appear here once candidates apply.
  </p>

</div>

      ) : (

        applications.map((app) => (

          <div
            className="job-card"
            key={app.id}
          >

            <div className="job-title">
              {app.user_name ||
               app.name ||
               "Candidate"}
            </div>

            <div className="job-info">
              <strong>Applied For:</strong>
              {" "}
              {app.title}
            </div>

            <div className="job-info">
              <strong>Resume Skills:</strong>
              {" "}
              {app.resume_skills}
            </div>

            <div className="job-info">
              <strong>AI Score:</strong>
              {" "}
              {app.score}%
            </div>

            <div className="job-info">

              <strong>Status:</strong>
              {" "}

              <span
                style={{
                  color:

                  app.status ===
                  "Shortlisted"

                  ? "#22c55e"

                  : app.status ===
                    "Rejected"

                  ? "#ef4444"

                  : "#f59e0b",

                  fontWeight: "bold"
                }}
              >

                {app.status?.toUpperCase() || "PENDING"}

              </span>

            </div>

            {/* RESUME BUTTON */}
            <a
              href={`${API_URL.replace('/api', '')}/uploads/${app.resume}`}
              target="_blank"
              rel="noreferrer"

              style={{
                display: "inline-block",
                marginTop: "15px",
                padding: "12px 18px",
                background:
                "linear-gradient(135deg,#2563eb,#3b82f6)",

                color: "white",

                borderRadius: "10px",

                textDecoration: "none",

                fontWeight: "bold"
              }}
            >

              View Resume

            </a>

            {/* STATUS BUTTONS */}
            <div
              style={{
                marginTop: "15px"
              }}
            >

              <button

                onClick={() =>

                  updateStatus(
                    app.id,
                    "Shortlisted"
                  )

                }

                style={{
                  marginRight: "10px",
                  padding: "10px 15px",
                  background: "#22c55e",
                  color: "white",
                  border: "none",
                  borderRadius: "8px"
                }}
              >

                Shortlist

              </button>

              <button

                onClick={() =>

                  updateStatus(
                    app.id,
                    "Rejected"
                  )

                }

                style={{
                  padding: "10px 15px",
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  borderRadius: "8px"
                }}
              >

                Reject

              </button>

            </div>

          </div>

        ))

      )}

    </div>

  );

}
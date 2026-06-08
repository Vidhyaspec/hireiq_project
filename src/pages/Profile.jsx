import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config";

import "../styles/profile.css";

export default function Profile() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [applications, setApplications] =
    useState([]);

  useEffect(() => {

    axios.get(
      '${API_URL}//get_applications.php'
    )
    .then((res) => {

      setApplications(res.data);

    });

  }, []);

  const myApplications =
    applications.filter(

      (app) =>

        String(app.user_id) ===
        String(user?.id)

    );

  return (

    <div className="profile-container">

      <h1 className="profile-title">
        My Applications
      </h1>

      {myApplications.length === 0 ? (

        <p>No applications found</p>

      ) : (

        myApplications.map((app) => (

          <div
            className="profile-card"
            key={app.id}
          >

            <h2>{app.title}</h2>

            <p>
              AI Score:
              {" "}
              {app.score}%
            </p>

            <p>
              Skills:
              {" "}
              {app.resume_skills}
            </p>

            <p>

              Status:

              {" "}

              <span
                className="status-badge"
                style={{

                  background:

                    app.status ===
                    "Shortlisted"

                      ? "#22c55e"

                      : app.status ===
                        "Rejected"

                      ? "#ef4444"

                      : "#f59e0b"

                }}
              >

                {app.status}

              </span>

            </p>

            <a
              href= {`${API_URL.replace('/api', '')}/uploads/${app.resume}`}
              target="_blank"
              rel="noreferrer"
            >
              View Resume
            </a>

          </div>

        ))

      )}

    </div>

  );

}
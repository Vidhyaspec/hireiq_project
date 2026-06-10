import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/myapplications.css";
import API_URL from "../config";

export default function MyApplications() {

  const [applications, setApplications] = useState([]);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {

    if (!user?.id) return;

    axios.get(
      `${API_URL}/get_my_applications.php?user_id=${user.id}`
    )
    .then((res) => {
      setApplications(Array.isArray(res.data) ? res.data : []);
  })
  .catch(err => console.log(err));

}, [user?.id]);

      
  const safeApplications = Array.isArray(applications)
    ? applications
    : [];

  return (

    <div className="myapps-container">

      <h1 className="myapps-title">My Applications</h1>

      {safeApplications.length === 0 ? (

        <div className="empty-state">

          <img
            src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png"
            alt="empty"
          />

          <h2>No Applications Yet</h2>

          <p>Apply for jobs to see them here.</p>

        </div>

      ) : (

        safeApplications.map((app) => (

          <div className="myapp-card" key={app.id}>

            <div><b>Job:</b> {app.title}</div>
            <div><b>Company:</b> {app.company}</div>
            <div><b>Description:</b> {app.description}</div>
            <div><b>Skills:</b> {app.skills}</div>
            <div><b>AI Score:</b> {app.score}%</div>

            <div>
              <b>Status:</b>{" "}
              <span style={{
                color:
                  app.status?.toLowerCase() === "shortlisted"
                    ? "green"
                    : app.status === "Rejected"
                    ? "red"
                    : "orange",
                fontWeight: "bold"
              }}>
                {app.status?.toUpperCase()}
              </span>
            </div>

            <a
              className="resume-btn"
              href={`${API_URL.replace('/api', '')}/uploads/${app.resume}`}
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
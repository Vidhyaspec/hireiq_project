import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/myapplications.css";

export default function MyApplications() {

  const [applications, setApplications] = useState([]);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {

    if (!user?.id) return;

    axios.get(
      `http://localhost/hireiq-project/backend/api/get_my_applications.php?user_id=${user.id}`
    )
    .then((res) => {
      setApplications(res.data || []);
    })
    .catch(err => console.log(err));

  }, [user.id]);

  return (

    <div className="myapps-container">

      <h1 className="myapps-title">My Applications</h1>

      {applications.length === 0 ? (
       
       <div className="empty-state">

  <img
    src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png"
    alt="empty"
  />

  <h2>No Applications Yet</h2>

  <p>
    Apply for jobs to see them here.
  </p>

</div>

      ) : (

        applications.map((app) => (

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
                  app.status === "Shortlisted"
                    ? "green"
                    : app.status === "Rejected"
                    ? "red"
                    : "orange",
                fontWeight: "bold"
              }}>
                {app.status}
              </span>
            </div>

            <a
              className="resume-btn"
              href={`http://localhost/hireiq-project/backend/uploads/${app.resume}`}
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
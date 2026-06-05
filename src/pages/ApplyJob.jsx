import "./ApplyJob.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function ApplyJob() {

  const navigate = useNavigate();
  const location = useLocation();

  const job = location.state || {};

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState("");

  const applyJob = async () => {
    try {
      const res = await axios.post(
        "http://localhost/backend/api/apply_job.php",
        {
          job_id: job.id || 0,
          job_title: job.title || "",
          skills_required: job.skills_required || "",
          candidate_name: name,
          email: email,
          resume: resume
        }
      );

      console.log(res.data);

      toast.success("Applied Successfully");

      navigate("/view-applicants");

    } catch (err) {
      console.log(err);
      toast.error("Error applying job");
    }
  };

  return (
    <div className="page-container">

      <h2>Apply Job</h2>

      <div className="apply-box">

        <input
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <textarea
          placeholder="Enter skills (java, sql, react...)"
          onChange={(e) => setResume(e.target.value)}
        />

        <button onClick={applyJob}>Apply</button>

      </div>

    </div>
  );
}

export default ApplyJob;
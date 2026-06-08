import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config";

export default function HRJobs() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    skills: "",
    description: "",
  });
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadJobs();
  }, []);

  // Only HR can see this page
  if (!user || user.role !== "hr") return null;

  const loadJobs = () => {
    axios
      .get('${API_URL}/get_jobs.php')
      .then((res) => setJobs(res.data))
      .catch((err) => console.error("Failed to load jobs", err));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({ title: "", company: "", location: "", skills: "", description: "" });
    setEditId(null);
    setShowForm(false);
  };

  const saveJob = () => {
    if (!form.title || !form.skills) {
      alert("Title and Skills are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("company", form.company);
    formData.append("location", form.location);
    formData.append("skills", form.skills);
    formData.append("description", form.description);
    formData.append("hr_id", user.id);

    if (editId) {
      formData.append("id", editId);
      axios
        .post(
          '${API_URL}/update_job.php',
          formData
        )
        .then(() => {
          alert("Job updated!");
          resetForm();
          loadJobs();
        })
        .catch(() => alert("Update failed."));
    } else {
      axios
        .post(
          '${API_URL}/post_job.php',
          formDatan
        )
        .then(() => {
          alert("Job posted!");
          resetForm();
          loadJobs();
        })
        .catch(() => alert("Post failed."));
    }
  };

  const editJob = (job) => {
    setForm({
      title: job.title,
      company: job.company,
      location: job.location,
      skills: job.skills,
      description: job.description || "",
    });
    setEditId(job.id);
    setShowForm(true);
    window.scrollTo(0, 0);
  };

  const deleteJob = (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    axios
      .get(
        `${API_URL}/delete_job.php?id=${id}`
      )
      .then(() => {
        alert("Job deleted.");
        loadJobs();
      })
      .catch(() => alert("Delete failed."));
  };

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1>HR Job Management</h1>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          style={{
            padding: "10px 18px",
            background: "#1a73e8",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          + Post New Job
        </button>
      </div>

      {/* Post / Edit Form */}
      {showForm && (
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "20px",
            marginBottom: "24px",
            background: "#f9f9f9",
          }}
        >
          <h2 style={{ marginBottom: "14px" }}>
            {editId ? "Edit Job" : "Post New Job"}
          </h2>

          {["title", "company", "location", "skills"].map((field) => (
            <input
              key={field}
              name={field}
              placeholder={
                field === "skills"
                  ? "Skills (comma separated, e.g. React, Node.js)"
                  : field.charAt(0).toUpperCase() + field.slice(1)
              }
              value={form[field]}
              onChange={handleChange}
              style={{
                display: "block",
                width: "100%",
                padding: "9px",
                marginBottom: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
          ))}

          <textarea
            name="description"
            placeholder="Job description (optional)"
            value={form.description}
            onChange={handleChange}
            rows={3}
            style={{
              display: "block",
              width: "100%",
              padding: "9px",
              marginBottom: "12px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              resize: "vertical",
            }}
          />

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={saveJob}
              style={{
                padding: "10px 20px",
                background: editId ? "#f0a500" : "green",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {editId ? "Update Job" : "Post Job"}
            </button>
            <button
              onClick={resetForm}
              style={{
                padding: "10px 20px",
                background: "#aaa",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Job List */}
      {jobs.length === 0 && <p>No jobs posted yet.</p>}

      {jobs.map((job) => (
        <div
          key={job.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "16px",
            marginBottom: "14px",
            background: "#fff",
          }}
        >
          <h2 style={{ marginBottom: "4px" }}>{job.title}</h2>
          <p style={{ color: "#555", marginBottom: "4px" }}>
            {job.company} &mdash; {job.location}
          </p>
          <p style={{ marginBottom: "10px" }}>
            <strong>Skills:</strong> {job.skills}
          </p>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() => editJob(job)}
              style={{
                padding: "8px 16px",
                background: "#f0a500",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Edit
            </button>
            <button
              onClick={() => deleteJob(job.id)}
              style={{
                padding: "8px 16px",
                background: "red",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

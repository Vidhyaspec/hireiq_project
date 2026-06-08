import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/jobs.css";
import API_URL from "../config";

export default function ViewJobs() {

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [resumeSkills, setResumeSkills] = useState({});
  const [resumeFiles, setResumeFiles] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const [editData, setEditData] = useState({
    title: "",
    description: "",
    skills: "",
    company: "",
    location: ""
  });

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchJobs();
  }, []);

  // FETCH JOBS
  const fetchJobs = () => {
    setLoading(true);

    axios.get(
`${API_URL}/get_jobs.php`
)
      .then((res) => {
        setJobs(res.data || []);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  // DELETE JOB
  const deleteJob = (id) => {
    axios
      .get(`${API_URL}/delete_job.php?id=${id}`)
      .then((res) => {
        toast.success(res.data.message);
        fetchJobs();
      });
  };

  // UPDATE JOB
  const updateJob = () => {
    axios.post(
  `${API_URL}/update_job.php`,
      {
        id: editingId,
        ...editData
      }
    ).then((res) => {
      toast.success(res.data.message);
      setEditingId(null);
      fetchJobs();
    });
  };

  // APPLY JOB (FIXED - SINGLE CLEAN FUNCTION)
  const applyJob = async (jobId, requiredSkills) => {

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const candidateSkills = resumeSkills[jobId];
    const file = resumeFiles[jobId];

    // VALIDATION
    if (!candidateSkills && !file) {
      toast.error("Skills and Resume required");
      return;
    }

    if (!candidateSkills) {
      toast.error("Skills required");
      return;
    }

    if (!file) {
      toast.error("Resume required");
      return;
    }
    const jobSkillsArray = requiredSkills
  ? requiredSkills.split(",").map(s => s.trim().toLowerCase())
  : [];

const candidateArray = candidateSkills
  ? candidateSkills.split(",").map(s => s.trim().toLowerCase())
  : [];

let matched = 0;

jobSkillsArray.forEach(skill => {
  if (candidateArray.includes(skill)) {
    matched++;
  }
});

const score =
  jobSkillsArray.length > 0
    ? Math.round((matched / jobSkillsArray.length) * 100)
    : 0;

    const formData = new FormData();
    formData.append("user_id", user.id);
    formData.append("job_id", jobId);
    formData.append("resume", file);
    formData.append("resume_skills", candidateSkills);
    formData.append("score", score);

    try {
      const res = await axios.post(
  `${API_URL}/apply_job.php`,
  formData
);
      toast.success(
  `${res.data.message || "Applied Successfully"} | AI Score: ${score}%`
);

    } catch (err) {
      console.log(err);
      toast.error("Application Failed");
    }
  };

  // SEARCH FILTER
  const filteredJobs = jobs.filter((job) => {
    const searchText = search.toLowerCase();

    return (
      job.title?.toLowerCase().includes(searchText) ||
      job.company?.toLowerCase().includes(searchText) ||
      job.location?.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="jobs-container">

      <h1 className="jobs-title">Available Jobs</h1>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search Jobs/Company/Location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          marginBottom: "20px",
          borderRadius: "8px",
          border: "1px solid #ccc"
        }}
      />

      {/* LOADING */}
      {loading && (
        <div className="empty-state">
          <div className="loader"></div>
          <h2>Loading Jobs...</h2>
        </div>
      )}

      {/* NO JOBS */}
      {!loading && jobs.length === 0 && (
        <div className="empty-state">
          <h2>No Jobs Available</h2>
        </div>
      )}

      {/* JOB LIST */}
      {!loading && filteredJobs.map((job) => (
        <div className="job-card" key={job.id}>

          <div className="job-title">{job.title}</div>

          <div className="job-info"><b>Company:</b> {job.company}</div>
          <div className="job-info"><b>Location:</b> {job.location}</div>
          <div className="job-info">{job.description}</div>

          <div className="skills-box">
            <b>Skills Required:</b><br />
            {job.skills}
          </div>

          {/* HR EDIT */}
          {user?.role === "hr" && editingId === job.id && (
            <div className="edit-section">

              <input
                value={editData.company}
                onChange={(e) =>
                  setEditData({ ...editData, company: e.target.value })
                }
              />

              <input
                value={editData.location}
                onChange={(e) =>
                  setEditData({ ...editData, location: e.target.value })
                }
              />

              <input
                value={editData.title}
                onChange={(e) =>
                  setEditData({ ...editData, title: e.target.value })
                }
              />

              <textarea
                value={editData.description}
                onChange={(e) =>
                  setEditData({ ...editData, description: e.target.value })
                }
              />

              <input
                value={editData.skills}
                onChange={(e) =>
                  setEditData({ ...editData, skills: e.target.value })
                }
              />
               <button className="update-btn" onClick={updateJob}>
  Update Job
</button>
            </div>
          )}

          {/* CANDIDATE APPLY */}
          {user?.role === "candidate" && (
            <div className="apply-section">

              <textarea
                placeholder="Enter Your Skills"
                onChange={(e) =>
                  setResumeSkills({
                    ...resumeSkills,
                    [job.id]: e.target.value
                  })
                }
              />

              <input
                type="file"
                onChange={(e) =>
                  setResumeFiles({
                    ...resumeFiles,
                    [job.id]: e.target.files[0]
                  })
                }
              />
<button className="apply-btn" onClick={() => applyJob(job.id, job.skills)}>
  Apply Job
</button>
              
            </div>
          )}

          {/* HR BUTTONS */}
          {user?.role === "hr" && (
            <div className="job-actions">
        
        <button className="edit-btn" onClick={() => {
  setEditingId(job.id);
  setEditData(job);
}}>
  Edit
</button>
              
              <button className="delete-btn" onClick={() => deleteJob(job.id)}>
  Delete
</button>

            </div>
          )}

        </div>
      ))}

    </div>
  );
}
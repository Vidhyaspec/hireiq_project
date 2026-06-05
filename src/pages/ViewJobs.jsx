import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import "../styles/jobs.css";

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

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  useEffect(() => {
    fetchJobs();
  }, []);

  // FETCH JOBS
  const fetchJobs = () => {

    setLoading(true);

    axios
      .get(
        "http://localhost/hireiq-project/backend/api/get_jobs.php"
      )

      .then((res) => {
 
        console.log("JOBS FROM BACKEND:", JSON.stringify(res.data, null, 2)); 
        setJobs(res.data || []);

      })

      .catch((err) => {

        console.log(err);

      })

      .finally(() => {

        setLoading(false);

      });
  };

  // DELETE JOB
  const deleteJob = (id) => {

    axios
      .get(
        `http://localhost/hireiq-project/backend/api/delete_job.php?id=${id}`
      )

      .then((res) => {

       toast.success(res.data.message);

        fetchJobs();

      });
  };

  // UPDATE JOB
  const updateJob = () => {

    axios.post(

      "http://localhost/hireiq-project/backend/api/update_job.php",

      {
        id: editingId,
        ...editData
      }

    )

    .then((res) => {

     toast.success(res.data.message);

      setEditingId(null);

      fetchJobs();

    });
  };

  // APPLY JOB
  const applyJob = async (
    jobId,
    requiredSkills
  ) => {

    if (!user?.id) {

      toast.error("Please login first");      

      return;
    }

    const candidateSkills =
      resumeSkills[jobId];

    const file =
      resumeFiles[jobId];

    if (!candidateSkills || !file) {

      toast.warning(
  "Please enter skills and upload resume"
);

      return;
    }

    const jobSkillsArray =
      (requiredSkills || "")

      .toLowerCase()
      .split(",")

      .map((s) => s.trim());

    const candidateSkillsArray =
      candidateSkills

      .toLowerCase()
      .split(",")

      .map((s) => s.trim());

    let matched = 0;

    jobSkillsArray.forEach((skill) => {

      if (
        candidateSkillsArray.includes(skill)
      ) {

        matched++;

      }

    });

    const score =
      jobSkillsArray.length > 0

      ? Math.round(
          (matched /
            jobSkillsArray.length) *
            100
        )

      : 0;

    const formData = new FormData();

    formData.append(
      "user_id",
      user.id
    );

    formData.append(
      "job_id",
      jobId
    );

    formData.append(
      "resume",
      file
    );

    formData.append(
      "resume_skills",
      candidateSkills
    );

    formData.append(
      "score",
      score
    );

    try {

      const res = await axios.post(

        "http://localhost/hireiq-project/backend/api/apply_job.php",

        formData

      );

      toast.success(
  `Applied Successfully | AI Score: ${score}%`
);

    } catch (err) {

      console.log(err);

    toast.error("Application Failed");

    }
  };

const filteredJobs = jobs.filter((job) => {

  const searchText = search.toLowerCase();

  return (
    job.title.toLowerCase().includes(searchText) ||
    job.company.toLowerCase().includes(searchText) ||
    job.location.toLowerCase().includes(searchText)
  );
});  

  return (

    <div className="jobs-container">

      <h1 className="jobs-title">
        Available Jobs
      </h1>

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

      {/* EMPTY */}
      {!loading && jobs.length === 0 && (

        <div className="empty-state">

          <img
            src="https://cdn-icons-png.flaticon.com/512/7486/7486740.png"
            alt=""
          />

          <h2>No Jobs Available</h2>

          <p>
            HR has not posted any jobs yet.
          </p>

        </div>

      )}

      {/* JOBS */}
      {!loading &&
        filteredJobs.map((job) => (

        <div
          className="job-card"
          key={job.id}
        >

          <div className="job-title">
            {job.title}
          </div>

          <div className="job-info">
            <strong>Company:</strong>
            {" "}
            {job.company}
          </div>

          <div className="job-info">
            <strong>Location:</strong>
            {" "}
            {job.location}
          </div>

          <div className="job-info">
            {job.description}
          </div>

          <div className="skills-box">

            <strong>
              Skills Required:
            </strong>

            <br />

            {job.skills}

          </div>

          {/* HR EDIT */}
          {user?.role === "hr" &&
           editingId === job.id && (

            <div className="edit-section">

              <input
                value={editData.company}
                placeholder="Company"

                onChange={(e) =>
                  setEditData({
                    ...editData,
                    company: e.target.value
                  })
                }
              />

              <input
                value={editData.location}
                placeholder="Location"

                onChange={(e) =>
                  setEditData({
                    ...editData,
                    location: e.target.value
                  })
                }
              />

              <input
                value={editData.title}
                placeholder="Title"

                onChange={(e) =>
                  setEditData({
                    ...editData,
                    title: e.target.value
                  })
                }
              />

              <textarea
                rows="4"

                value={editData.description}

                placeholder="Description"

                onChange={(e) =>
                  setEditData({
                    ...editData,
                    description: e.target.value
                  })
                }
              />

              <input
                value={editData.skills}
                placeholder="Skills"

                onChange={(e) =>
                  setEditData({
                    ...editData,
                    skills: e.target.value
                  })
                }
              />

              <button
                className="update-btn"
                onClick={updateJob}
              >
                Update Job
              </button>

            </div>

          )}

          {/* CANDIDATE APPLY */}
          {user?.role === "candidate" && (

            <div className="apply-section">

              <textarea
                rows="4"

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
                    [job.id]:
                    e.target.files[0]
                  })
                }
              />

              <button
                className="apply-btn"

                onClick={() =>
                  applyJob(
                    job.id,
                    job.skills
                  )
                }
              >
                Apply Job
              </button>

            </div>

          )}

          {/* HR BUTTONS */}
          {user?.role === "hr" && (

            <div className="job-actions">

              <button
                className="edit-btn"

                onClick={() => {

                  setEditingId(job.id);

                  setEditData({
                    title: job.title,
                    description: job.description,
                    skills: job.skills,
                    company: job.company,
                    location: job.location
                  });

                }}
              >
                Edit
              </button>

              <button
                className="delete-btn"

                onClick={() =>
                  deleteJob(job.id)
                }
              >
                Delete
              </button>

            </div>

          )}

        </div>

      ))}

    </div>
  );
}
import { useState } from "react";

import axios from "axios";

import { toast } from "react-toastify";

import "../styles/addjob.css";

import API_URL from "../config";

export default function AddJob() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [skills, setSkills] =
    useState("");

  const [company, setCompany] =
    useState("");

  const [location, setLocation] =
    useState("");

  const addJob = () => {

    // USER CHECK
    if (!user || !user.id) {

      toast.error(
        "Please login again"
      );

      return;

    }

    // VALIDATION
    if (
      !title ||
      !description ||
      !skills ||
      !company ||
      !location
    ) {

      toast.warning(
        "Please fill all fields"
      );

      return;

    }

    // FORM DATA
    const formData =
      new FormData();

    formData.append(
      "title",
      title
    );

    formData.append(
      "description",
      description
    );

    formData.append(
      "skills",
      skills
    );

    formData.append(
      "company",
      company
    );

    formData.append(
      "location",
      location
    );

    formData.append(
      "posted_by",
      user.id
    );

    axios.post(
      `${API_URL}/add_job.php`,
      formData
    )

    .then((res) => {

      toast.success(
        res.data?.message ||
        "Job posted successfully 🚀"
      );

      // RESET
      setTitle("");
      setDescription("");
      setSkills("");
      setCompany("");
      setLocation("");

    })

    .catch(() => {

      toast.error(
        "Job posting failed"
      );

    });

  };

  return (

    <div className="addjob-container">

      <div className="addjob-card">

        <div className="addjob-title">
          Post New Job
        </div>

        <div className="addjob-form">

          <input
            type="text"
            placeholder="Company Name"
            value={company}
            onChange={(e) =>
              setCompany(
                e.target.value
              )
            }
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) =>
              setLocation(
                e.target.value
              )
            }
          />

          <input
            type="text"
            placeholder="Job Title"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
          />

          <textarea
            rows="5"
            placeholder="Job Description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
          />

          <input
            type="text"
            placeholder="Skills (Java, React, SQL)"
            value={skills}
            onChange={(e) =>
              setSkills(
                e.target.value
              )
            }
          />

          <button
            className="post-btn"
            onClick={addJob}
          >
            Post Job
          </button>

        </div>

      </div>

    </div>

  );

}
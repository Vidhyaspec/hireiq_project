import "../styles/addjob.css";

import { useState,useEffect } from "react";

import axios from "axios";

import { useParams,useNavigate } from "react-router-dom";

import API_URL from "../config";

function EditJob() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [title,setTitle] = useState("");
  const [company,setCompany] = useState("");
  const [location,setLocation] = useState("");
  const [salary,setSalary] = useState("");
  const [description,setDescription] = useState("");

  useEffect(() => {

    fetchJob();

  }, []);

  const fetchJob = async () => {

    const response = await axios.get(
      `${API_URL}/get_single_job.php?id=${id}`
    );

    setTitle(response.data.title);
    setCompany(response.data.company);
    setLocation(response.data.location);
    setSalary(response.data.salary);
    setDescription(response.data.description);

  };

  const updateJob = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("id",id);
    formData.append("title",title);
    formData.append("company",company);
    formData.append("location",location);
    formData.append("salary",salary);
    formData.append("description",description);

    const response = await axios.post(
      `${API_URL}/update_job.php`,
      formData
    );

    alert(response.data);

    navigate("/view-jobs");

  };

  return (

    <div className="job-container">

      <h1>Edit Job</h1>

      <form onSubmit={updateJob}>

        <input
          type="text"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />

        <input
          type="text"
          value={company}
          onChange={(e)=>setCompany(e.target.value)}
        />

        <input
          type="text"
          value={location}
          onChange={(e)=>setLocation(e.target.value)}
        />

        <input
          type="text"
          value={salary}
          onChange={(e)=>setSalary(e.target.value)}
        />

        <textarea
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
        >
        </textarea>

        <button>Update Job</button>

      </form>

    </div>
  );
}

export default EditJob;
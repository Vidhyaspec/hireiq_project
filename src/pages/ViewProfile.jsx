import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/viewprofile.css";

export default function ViewProfile() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [profile, setProfile] = useState({});

  // LOAD PROFILE
  useEffect(() => {

    if (!user?.id) return;

    axios.get(
      `http://localhost/hireiq-project/backend/api/get_profile.php?user_id=${user.id}`
    )
    .then((res) => {
      setProfile(res.data);
    })
    .catch((err) => {
      console.log("PROFILE LOAD ERROR:", err);
    });

  }, []);

  return (
    <div className="view-profile-container">

      <div className="view-profile-card">

        {profile.profile_pic && (

  <img
    src={`http://localhost/hireiq-project/backend/uploads/${profile.profile_pic}`}
    alt="Profile"

    style={{
      width: "140px",
      height: "140px",
      borderRadius: "50%",
      objectFit: "cover",
      marginBottom: "20px",
      border: "4px solid #3b82f6"
    }}
  />

)}

        <h2>Your Profile</h2>

        <p><b>Name:</b> {profile.name}</p>
        <p><b>Email:</b> {profile.email}</p>

        <p><b>Bio:</b> {profile.bio || "Not added"}</p>
        <p><b>Skills:</b> {profile.skills || "Not added"}</p>
        <p><b>Education:</b> {profile.education || "Not added"}</p>
        <p><b>Experience:</b> {profile.experience || "Not added"}</p>

        {/* Optional fields (kept same feature logic) */}
        {profile.github && (
          <p><b>GitHub:</b> {profile.github}</p>
        )}

        {profile.linkedin && (
          <p><b>LinkedIn:</b> {profile.linkedin}</p>
        )}

      </div>

    </div>
  );
}
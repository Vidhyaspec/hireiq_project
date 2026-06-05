import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/editprofile.css";

export default function EditProfile() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [profile, setProfile] = useState({
    bio: "",
    skills: "",
    education: "",
    experience: "",
    github: "",
    linkedin: ""
  });

  const [image, setImage] = useState(null);

  // LOAD PROFILE
  useEffect(() => {

    if (!user?.id) return;

    axios.get(
      `http://localhost/hireiq-project/backend/api/get_profile.php?user_id=${user.id}`
    )
    .then((res) => {
      setProfile({
        bio: res.data.bio || "",
        skills: res.data.skills || "",
        education: res.data.education || "",
        experience: res.data.experience || "",
        github: res.data.github || "",
        linkedin: res.data.linkedin || ""
      });
    })
    .catch((err) => {
      console.log("LOAD ERROR:", err);
    });

  }, []);

  // UPDATE PROFILE (OPTION B LOGIC)
  const updateProfile = () => {

    if (!image) {
    alert("Please select a profile image before updating!");
    return;
  }

    // ✅ ONLY REQUIRED FIELDS CHECK
    if (!profile.bio || !profile.skills) {
      alert("Bio and Skills are required!");
      return;
    }

    const formData = new FormData();

    formData.append("user_id", user.id);
    formData.append("bio", profile.bio);
    formData.append("skills", profile.skills);

    // ✅ OPTIONAL FIELDS (safe fallback)
    formData.append("education", profile.education || "");
    formData.append("experience", profile.experience || "");
    formData.append("github", profile.github || "");
    formData.append("linkedin", profile.linkedin || "");

      formData.append("profile_pic", image);
    

    axios.post(
      "http://localhost/hireiq-project/backend/api/update_profile.php",
      formData
    )
    .then((res) => {
      alert(res.data.message);
    })
    .catch((err) => {
      console.log("UPDATE ERROR:", err);
    });

  };

  return (

    <div className="edit-profile-container">

      <div className="edit-profile-card">

        <h1>Edit Profile</h1>

        <textarea
          rows="4"
          placeholder="Bio *"
          value={profile.bio}
          onChange={(e) =>
            setProfile({ ...profile, bio: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Skills *"
          value={profile.skills}
          onChange={(e) =>
            setProfile({ ...profile, skills: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Education (Optional)"
          value={profile.education}
          onChange={(e) =>
            setProfile({ ...profile, education: e.target.value })
          }
        />

        <textarea
          rows="4"
          placeholder="Experience (Optional)"
          value={profile.experience}
          onChange={(e) =>
            setProfile({ ...profile, experience: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="GitHub Link (Optional)"
          value={profile.github}
          onChange={(e) =>
            setProfile({ ...profile, github: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="LinkedIn Link (Optional)"
          value={profile.linkedin}
          onChange={(e) =>
            setProfile({ ...profile, linkedin: e.target.value })
          }
        />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button onClick={updateProfile}>
          Save Profile
        </button>

      </div>

    </div>

  );

}
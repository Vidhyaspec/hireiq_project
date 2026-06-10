import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/editprofile.css";
import API_URL from "../config";

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
      `${API_URL}/get_profile.php?user_id=${user.id}`
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
      toast.error("Failed to load profile!");
    });

  }, [user?.id]);

  // UPDATE PROFILE
  const updateProfile = () => {

  if (!profile.bio && !profile.skills) {
    toast.error("Bio and Skills are required!");
    return;
  }

  if (!profile.bio) {
    toast.error("Bio is required!");
    return;
  }

  if (!profile.skills) {
    toast.error("Skills are required!");
    return;
  }

  if (!image) {
    toast.error("Profile picture is required!");
    return;
  }

  const formData = new FormData();

  formData.append("user_id", user.id);
  formData.append("bio", profile.bio);
  formData.append("skills", profile.skills);
  formData.append("education", profile.education || "");
  formData.append("experience", profile.experience || "");
  formData.append("github", profile.github || "");
  formData.append("linkedin", profile.linkedin || "");
  formData.append("profile_pic", image);

  axios.post(
    `${API_URL}/update_profile.php`,
    formData
  )
  .then((res) => {

    toast.success(res.data.message);

    // 🔥 IMPORTANT FIX: reload updated profile from DB
    return axios.get(
      `${API_URL}/get_profile.php?user_id=${user.id}`
    );

  })
  .then((res) => {

    // 🔥 update UI with latest DB values
    setProfile({
      bio: res.data.bio || "",
      skills: res.data.skills || "",
      education: res.data.education || "",
      experience: res.data.experience || "",
      github: res.data.github || "",
      linkedin: res.data.linkedin || ""
    });

    setImage(null); // reset image input

  })
  .catch((err) => {
    console.log(err);
    toast.error("Profile update failed");
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
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button onClick={updateProfile}>
          Save Profile
        </button>

      </div>

    </div>
  );
}
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../styles/auth.css";
import API_URL from "../config";

export default function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("candidate");

  const navigate = useNavigate();

  const registerUser = () => {

  axios.post(
  `${API_URL}/register.php`,
  {
    name,
    email,
    password,
    role
  },
  {
    headers: {
      "Content-Type": "application/json"
    }
  }
)
.then((res) => {
  console.log(res.data);
  toast.success(res.data.message);
})
.catch((err) => {
  console.log(err);
  toast.error("Server error");
});
  
};

return (
  <div className="auth-container">

    <div className="auth-card">

      <div className="brand-logo">
        HIREIQ
      </div>

      <div className="brand-text">
        AI Hiring Platform
      </div>


      <h2>Create Account</h2>

      <input
        type="text"
        placeholder="Full Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email Address"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <select onChange={(e) => setRole(e.target.value)}>

        <option value="candidate">
          Candidate
        </option>

        <option value="hr">
          HR
        </option>

      </select>

      <button onClick={registerUser}>
        Create Account
      </button>

    </div>

  </div>
);

}
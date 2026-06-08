import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import "../styles/auth.css";
import API_URL from "../config";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const loginUser = () => {

    if (!email || !password) {
      toast.warning("Please fill all fields");
      return;
    }

    // ✅ FORM DATA (MOST STABLE WITH PHP)
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    axios.post(
      `${API_URL}/login.php`,
      {
    email: email,
    password: password
  },
  {
    headers: {
      "Content-Type": "application/json"
    }
  }
    )
    .then((res) => {

      if (res.data.status === "success") {

        localStorage.setItem("user", JSON.stringify(res.data.user));

        if (login) login(res.data.user);

        toast.success("Login successful");

        navigate("/view-jobs");

      } else {
        toast.error(res.data.message);
      }

    })
    .catch((err) => {
      console.log(err);
      toast.error("Server error");
    });
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={loginUser}>
          Login
        </button>

      </div>

    </div>
  );
}
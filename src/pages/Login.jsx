import { useState, useContext } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { AuthContext } from "../context/AuthContext";

import "../styles/auth.css";

export default function Login() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const navigate = useNavigate();

  const { login } =
    useContext(AuthContext);

  const loginUser = () => {

    // VALIDATION
    if (!email || !password) {

      toast.warning(
        "Please fill all fields"
      );

      return;

    }

    axios.post(

      "http://localhost/hireiq-project/backend/api/login.php",

      {
        email,
        password
      }

    )

    .then((res) => {

      if (
        res.data.status === "success"
      ) {

        // SUCCESS TOAST
        toast.success(
          "Login Successful ✅"
        );

        login(res.data.user);

        navigate("/dashboard");

      } else {

        toast.error(
          res.data.message
        );

      }

    })

    .catch(() => {

      toast.error(
        "Server Error"
      );

    });

  };

  return (

    <div className="auth-container">

      <div className="auth-card">

        <h2>
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button onClick={loginUser}>
          Login
        </button>

      </div>

    </div>

  );

}
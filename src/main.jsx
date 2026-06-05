import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./styles/global.css";
import "./styles/toast.css";

/* 🔥 TOASTIFY */
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <ToastContainer
      position="top-right"
      autoClose={2500}
      theme="dark"
    />

    <App />

  
  </React.StrictMode>

);
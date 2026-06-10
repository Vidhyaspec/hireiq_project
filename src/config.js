const API_URL =
  import.meta.env.VITE_API_URL ||
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:8080/hireiq-project/backend/api"
    : "https://hireiq-project-deploy.onrender.com/backend/api");

export default API_URL;

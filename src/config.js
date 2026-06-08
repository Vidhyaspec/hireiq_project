const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8080/hireiq-project/backend/api"
    : "https://hireiq.infinityfreeapp.com/backend/api";

export default API_URL;
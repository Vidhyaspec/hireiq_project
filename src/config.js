const API_URL =
  window.location.hostname === "localhost"
    ? "http://127.0.0.1:8080/hireiq-project/backend/api"
    : "https://hireiq.infinityfreeapp.com/backend/api";

export default API_URL;
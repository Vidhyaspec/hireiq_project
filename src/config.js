let rawUrl = import.meta.env.VITE_API_URL;

// Safeguard: If the environment variable lacks http:// or https://, prepend https:// to avoid relative path routing.
if (rawUrl) {
  rawUrl = rawUrl.trim();
  if (!rawUrl.startsWith("http://") && !rawUrl.startsWith("https://")) {
    rawUrl = "https://" + rawUrl;
  }
}

const API_URL = rawUrl ||
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:8080/hireiq-project/backend/api"
    : "https://hireiq.infinityfreeapp.com/backend/api");

export default API_URL;

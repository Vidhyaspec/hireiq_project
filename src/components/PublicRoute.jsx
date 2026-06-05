import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {

  const user = localStorage.getItem("user");

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}
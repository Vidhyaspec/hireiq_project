import { Navigate } from "react-router-dom";

import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({
  children
}) {

  const {
    user,
    loading
  } = useContext(AuthContext);

  // WAIT UNTIL USER LOADS
  if (loading) {

    return <div>Loading...</div>;

  }

  // NO USER
  if (!user) {

    return (
      <Navigate
        to="/"
        replace
      />
    );

  }

  return children;

}
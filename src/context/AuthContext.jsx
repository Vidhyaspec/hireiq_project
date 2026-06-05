import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  // ✅ ADD THIS
  const [loading, setLoading] = useState(true);

  // LOAD USER FROM LOCALSTORAGE
  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false); // ✅ IMPORTANT FIX

  }, []);

  // LOGIN
  const login = (userData) => {

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    setUser(userData);
  };

  // LOGOUT
  const logout = () => {

    localStorage.removeItem("user");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading // ✅ ADD THIS
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
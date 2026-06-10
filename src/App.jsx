import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/toast.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

import AddJob from "./pages/AddJob";
import ViewJobs from "./pages/ViewJobs";
import Applicants from "./pages/Applicants";
import MyApplications from "./pages/MyApplications";

import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import ViewProfile from "./pages/ViewProfile";
import MockInterview from "./pages/MockInterview";

import AuthProvider from "./context/AuthContext";

function AppLayout() {

  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Auto-close sidebar on route change (for mobile navigation)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const showSidebar = !["/", "/register"].includes(location.pathname);

  return (
    <div className={`app-wrapper ${sidebarOpen ? "sidebar-active" : ""}`}>
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} showHamburger={showSidebar} />

      <div className="app-container">

        {/* SIDEBAR DYNAMIC */}
        {showSidebar && (
          <>
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            {sidebarOpen && (
              <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
            )}
          </>
        )}

        <div className="content-container">

          <Routes>

            {/* LOGIN */}
            <Route
              path="/"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />

            {/* REGISTER */}
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />

            {/* DASHBOARD */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* JOBS */}
            <Route
              path="/add-job"
              element={
                <ProtectedRoute>
                  <AddJob />
                </ProtectedRoute>
              }
            />

            <Route
              path="/jobs"
              element={
                <ProtectedRoute>
                  <ViewJobs />
                </ProtectedRoute>
              }
            />

            {/* HR APPLICANTS */}
            <Route
              path="/applicants"
              element={
                <ProtectedRoute>
                  <Applicants />
                </ProtectedRoute>
              }
            />

            {/* CANDIDATE APPLICATIONS */}
            <Route
              path="/my-applications"
              element={
                <ProtectedRoute>
                  <MyApplications />
                </ProtectedRoute>
              }
            />

            {/* PROFILE */}
            <Route
              path="/profile-old"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ViewProfile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/edit-profile"
              element={
                <ProtectedRoute>
                  <EditProfile />
                </ProtectedRoute>
              }
            />

            {/* MOCK INTERVIEW */}
            <Route
              path="/mock-interview"
              element={
                <ProtectedRoute>
                  <MockInterview />
                </ProtectedRoute>
              }
            />

            {/* FALLBACK */}
            <Route path="*" element={<Navigate to="/" />} />

          </Routes>

        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />

        <AppLayout />

      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
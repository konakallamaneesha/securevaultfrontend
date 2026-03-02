import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Sidebar({ user }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const menuItem = (path, label, icon) => {
    const active = location.pathname === path;

    return (
      <div
        onClick={() => navigate(path)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "12px 16px",
          borderRadius: "10px",
          cursor: "pointer",
          marginBottom: "10px",
          background: active
            ? "linear-gradient(90deg,#06b6d4,#22c55e)"
            : "transparent",
          color: active ? "white" : "#94a3b8",
          fontWeight: "500",
        }}
      >
        <span>{icon}</span>
        <span>{label}</span>
      </div>
    );
  };

  // Open modal
  const logout = () => {
    setShowLogoutModal(true);
  };

  // Confirm logout
  const confirmLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      <div
        style={{
          width: "250px",
          height: "100vh",
          background: "#020617",
          borderRight: "1px solid rgba(255,255,255,0.1)",
          position: "fixed",
          top: 0,
          left: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "20px",
          zIndex: 1000,
        }}
      >
        {/* Top Section */}
        <div>
          <h2 className="gradient-text">🔐 SecureVault</h2>

          <div style={{ margin: "20px 0", color: "#94a3b8" }}>
            Welcome back,
            <br />
            <strong style={{ color: "white", fontSize: "16px" }}>
              {user?.name || "User"}
            </strong>
          </div>

          {menuItem("/dashboard", "View Passwords", "📋")}
          {menuItem("/add", "Add Password", "➕")}
        </div>

        {/* Logout */}
        <div
          onClick={logout}
          style={{
            color: "#ef4444",
            cursor: "pointer",
            padding: "10px",
            fontWeight: "500",
          }}
        >
          🚪 Logout
        </div>
      </div>

      {/* ✅ Custom Logout Modal */}
      {showLogoutModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000,
          }}
        >
          <div
            className="card"
            style={{
              width: "380px",
              textAlign: "center",
            }}
          >
            <h3>⚠ Confirm Logout</h3>

            <p style={{ marginTop: "10px", color: "#94a3b8" }}>
              Are you sure you want to logout?
            </p>

            <div
              style={{
                display: "flex",
                gap: "15px",
                marginTop: "20px",
                justifyContent: "center",
              }}
            >
              <button
                onClick={confirmLogout}
                style={{ background: "#ef4444" }}
              >
                Yes Logout
              </button>

              <button
                onClick={() => setShowLogoutModal(false)}
                style={{
                  background: "transparent",
                  border: "1px solid #22c55e",
                  color: "#22c55e",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
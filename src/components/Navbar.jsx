import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
 <div
  style={{
    position: "fixed",        // ⭐ important
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 1000,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 40px",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(2,6,23,0.7)",   // semi transparent
    backdropFilter: "blur(10px)",
  }}
>
      <h2 style={{ color: "#22c55e" }}>🔐 SecureVault</h2>

      <button onClick={logout}>Logout</button>
    </div>
  );
}
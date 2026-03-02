import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      
      {/* Navbar */}
      <div
        style={{
          position: "fixed",   // ⭐ added
          top: 0,              // ⭐ added
          left: 0,             // ⭐ added
          width: "100%",       // ⭐ added
          zIndex: 1000,        // ⭐ added
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 40px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          background: "#020617",   // ⭐ added (so text visible while scroll)
        }}
      >
        <h2 className="gradient-text">🔐 SecureVault</h2>

        <button
          onClick={() => navigate("/login")}
          style={{
            background: "transparent",
            border: "1px solid #22c55e",
            padding: "10px 18px",
          }}
        >
          Login
        </button>
      </div>

      {/* Hero Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "80px 20px",
          marginTop: "80px",   // ⭐ small space so content not hidden
        }}
      >
        {/* Glow */}
        <div className="hero-glow"></div>

        <h1
          style={{
            fontSize: "64px",
            fontWeight: "800",
            lineHeight: "1.2",
          }}
        >
          <span style={{ color: "#cbd5f5" }}>Secure Password</span>
          <br />
          <span className="gradient-text">Management System</span>
        </h1>

        <p
          style={{
            color: "#94a3b8",
            maxWidth: "600px",
            marginTop: "20px",
            fontSize: "18px",
          }}
        >
          Store, encrypt, and manage your passwords securely using AES-256
          encryption and modern cybersecurity standards.
        </p>

        <div style={{ display: "flex", gap: "20px", marginTop: "30px" }}>
          <button
            onClick={() => navigate("/register")}
            style={{
              padding: "14px 28px",
              fontSize: "16px",
            }}
          >
            Get Started
          </button>

          <button
            onClick={() => navigate("/login")}
            style={{
              padding: "14px 28px",
              fontSize: "16px",
              background: "transparent",
              border: "1px solid #22c55e",
            }}
          >
            Login
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          padding: "40px 20px 80px",
          flexWrap: "wrap",
        }}
      >
        <div className="card" style={{ width: "260px", textAlign: "center" }}>
          <h3>🔐 AES Encryption</h3>
          <p style={{ color: "#94a3b8", marginTop: "10px" }}>
            Industry-standard AES-256 encryption ensures your passwords remain
            secure and protected.
          </p>
        </div>

        <div className="card" style={{ width: "260px", textAlign: "center" }}>
          <h3>🛡 Secure Storage</h3>
          <p style={{ color: "#94a3b8", marginTop: "10px" }}>
            All credentials are encrypted before storing in the database,
            preventing unauthorized access.
          </p>
        </div>

        <div className="card" style={{ width: "260px", textAlign: "center" }}>
          <h3>⚡ Fast Access</h3>
          <p style={{ color: "#94a3b8", marginTop: "10px" }}>
            Quickly retrieve and manage passwords with a modern and responsive
            user interface.
          </p>
        </div>
      </div>
    </div>
  );
}
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleLogin = () => {
    setError("");

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      setError("No user found. Please register first ");
      return;
    }

    if (
      form.email === storedUser.email &&
      form.password === storedUser.password
    ) {
      // ✅ Login success → go to master verify page
      navigate("/master");
    } else {
      setError("Invalid email or password ");
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", justifyContent: "center", alignItems: "center" }}>
      <div className="card" style={{ width: "420px" }}>
        <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
          🔐 SecureVault Login
        </h2>

        <input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {error && (
          <p style={{ color: "#ef4444", marginTop: "8px" }}>
            {error}
          </p>
        )}

        <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
          <button onClick={handleLogin} style={{ flex: 1 }}>
            Login
          </button>

          <button
            onClick={() => navigate("/")}
            style={{
              flex: 1,
              background: "transparent",
              border: "1px solid #22c55e",
              color: "#22c55e",
            }}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    masterPassword: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async () => {
    const { name, email, password, masterPassword } = form;

    if (!name || !email || !password || !masterPassword || !confirmPassword) {
      setError(true);
      setMessage("Please fill all fields ❌");
      return;
    }

    if (!isValidEmail(email)) {
      setError(true);
      setMessage("Invalid email format ❌");
      return;
    }

    if (password !== confirmPassword) {
      setError(true);
      setMessage("Passwords do not match ❌");
      return;
    }

    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
        masterPassword,
      });

      setError(false);
      setMessage("Registered Successfully ✅");

      // Clear form
      setForm({
        name: "",
        email: "",
        password: "",
        masterPassword: "",
      });
      setConfirmPassword("");

      setTimeout(() => {
        setMessage("");
      }, 2000);

    } catch (err) {
      setError(true);
      setMessage(err.response?.data?.message || "Registration failed ❌");
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", justifyContent: "center", alignItems: "center" }}>
      <div className="card" style={{ width: "420px" }}>
        <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
          🔐 Create Account
        </h2>

        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "15px",
              top: "18px",
              cursor: "pointer",
              color: "#22c55e",
              fontSize: "14px",
            }}
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Master Password (Vault Key)"
          value={form.masterPassword}
          onChange={(e) =>
            setForm({ ...form, masterPassword: e.target.value })
          }
        />

        <div style={{ display: "flex", gap: "15px", marginTop: "15px" }}>
          <button onClick={handleSubmit} style={{ flex: 1 }}>
            Register
          </button>

          <button
            onClick={() => navigate("/login")}
            style={{
              flex: 1,
              background: "transparent",
              border: "1px solid #22c55e",
              color: "#22c55e",
            }}
          >
            Go to Login
          </button>
        </div>

        {message && (
          <div
            style={{
              marginTop: "12px",
              padding: "10px",
              borderRadius: "6px",
              background: error
                ? "rgba(239,68,68,0.15)"
                : "rgba(34,197,94,0.15)",
              color: error ? "#ef4444" : "#22c55e",
              textAlign: "center",
              fontSize: "14px",
            }}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
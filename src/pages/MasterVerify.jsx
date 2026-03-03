import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function MasterVerify() {
  const navigate = useNavigate();

  const [master, setMaster] = useState("");
  const [error, setError] = useState("");

  const verifyMaster = async () => {
    setError("");

    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/auth/verify-master",
        { masterPassword: master },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      navigate("/dashboard");

    } catch (err) {
      setError("Invalid Master Password ❌");
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", justifyContent: "center", alignItems: "center" }}>
      <div className="card" style={{ width: "420px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          🔑 Enter Master Password
        </h2>

        <input
          type="password"
          placeholder="Master Password"
          value={master}
          onChange={(e) => setMaster(e.target.value)}
        />

        {error && (
          <p style={{ color: "#ef4444", marginTop: "8px" }}>
            {error}
          </p>
        )}

        <button
          onClick={verifyMaster}
          style={{ width: "100%", marginTop: "15px" }}
        >
          Unlock Vault
        </button>
      </div>
    </div>
  );
}
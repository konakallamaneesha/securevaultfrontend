import { useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import { FaGlobe, FaUser, FaLock } from "react-icons/fa";

export default function AddPassword() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    website: "",
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setMessage("");
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const savePassword = async () => {
    const { website, username, password } = form;

    if (!website || !username || !password) {
      setError(true);
      setMessage("Please fill all fields ❌");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const master = localStorage.getItem("master");

      await API.post(
        "/passwords",
        { ...form, masterPassword: master },  // ✅ send master
        {
          headers: {
            Authorization: `Bearer ${token}`,  // ✅ Bearer fixed
          },
        }
      );

      setError(false);
      setMessage("Password Saved Successfully ✅");

      setForm({
        website: "",
        username: "",
        password: "",
      });

      setTimeout(() => {
        setMessage("");
      }, 3000);

    } catch (err) {
      setError(true);
      setMessage("Failed to save password ❌");
    }
  };

  const inputBox = (icon, name, placeholder) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        background: "#020617",
        border: "1px solid #1e293b",
        borderRadius: "8px",
        padding: "0 12px",
        marginBottom: "15px",
      }}
    >
      <div style={{ color: "#22c55e", marginRight: "10px" }}>
        {icon}
      </div>

      <input
        name={name}
        placeholder={placeholder}
        value={form[name]}
        onChange={handleChange}
        autoComplete="off"
        style={{
          border: "none",
          background: "transparent",
          flex: 1,
          padding: "12px",
          color: "white",
        }}
      />
    </div>
  );

  return (
    <div style={{ display: "flex" }}>
      <Sidebar user={user} />

      <div
        style={{
          flex: 1,
          marginLeft: "250px",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <div style={{ width: "100%", maxWidth: "500px" }}>
          <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
            Add New Password
          </h2>

          <div className="card">
            {inputBox(<FaGlobe />, "website", "Website")}
            {inputBox(<FaUser />, "username", "Username")}
            {inputBox(<FaLock />, "password", "Password")}

            <button
              onClick={savePassword}
              style={{
                width: "100%",
                marginTop: "10px",
              }}
            >
              Save Password
            </button>

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
                }}
              >
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
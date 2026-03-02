import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

export default function ViewPasswords() {
  const [passwords, setPasswords] = useState([]);

  useEffect(() => {
    const data =
      JSON.parse(localStorage.getItem("passwords")) || [];
    setPasswords(data);
  }, []);

  const deletePassword = (id) => {
    const updated = passwords.filter((p) => p.id !== id);
    setPasswords(updated);
    localStorage.setItem("passwords", JSON.stringify(updated));
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar user={{ name: "Maneesha" }} />

      <div style={{ flex: 1, padding: "40px" }}>
        <h2>Stored Passwords</h2>

        {passwords.length === 0 ? (
          <p style={{ color: "#94a3b8" }}>
            No passwords saved yet
          </p>
        ) : (
          passwords.map((item) => (
            <div
              key={item.id}
              className="card"
              style={{
                marginTop: "15px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h4>{item.website}</h4>
                <p>Username: {item.username}</p>
                <p>Password: {item.password}</p>
              </div>

              <button
                onClick={() => deletePassword(item.id)}
                style={{
                  background: "#ef4444",
                }}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
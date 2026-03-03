import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

export default function ViewPasswords() {
  const [passwords, setPasswords] = useState([]);

  useEffect(() => {
    fetchPasswords();
  }, []);

  const fetchPasswords = async () => {
    try {
      const res = await API.get("/passwords");
      setPasswords(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deletePassword = async (id) => {
    try {
      await API.delete(`/passwords/${id}`);
      setPasswords(passwords.filter((p) => p._id !== id));
    } catch (err) {
      console.log(err);
    }
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
              key={item._id}
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
                onClick={() => deletePassword(item._id)}
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
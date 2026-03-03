import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../api";

export default function Dashboard() {
  const [passwords, setPasswords] = useState([]);
  const [search, setSearch] = useState("");
  const [showPassword, setShowPassword] = useState({});
  const [deleteId, setDeleteId] = useState(null);
  const [copyMsg, setCopyMsg] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

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

  const togglePassword = (id) => {
    setShowPassword({
      ...showPassword,
      [id]: !showPassword[id],
    });
  };

  const copyPassword = (password) => {
    navigator.clipboard.writeText(password);
    setCopyMsg("Password copied successfully");

    setTimeout(() => {
      setCopyMsg("");
    }, 2000);
  };

  const confirmDelete = async () => {
    try {
      await API.delete(`/passwords/${deleteId}`);
      setPasswords(passwords.filter((item) => item._id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      console.log(err);
    }
  };

  const filtered = passwords.filter(
    (item) =>
      item.website.toLowerCase().includes(search.toLowerCase()) ||
      item.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: "flex" }}>
      <Sidebar user={user} />

      <div style={{ flex: 1, padding: "40px", marginLeft: "250px" }}>

        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            background: "#020617",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "25px",
            paddingBottom: "10px",
          }}
        >
          <h2>Stored Passwords</h2>

          <input
            placeholder="🔎 Search passwords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "260px" }}
          />
        </div>

        {copyMsg && (
          <div
            style={{
              marginBottom: "15px",
              padding: "10px",
              borderRadius: "6px",
              background: "rgba(34,197,94,0.15)",
              color: "#22c55e",
              textAlign: "center",
            }}
          >
            {copyMsg}
          </div>
        )}

        {filtered.length === 0 && (
          <p>🔐 No passwords yet — Add your first password</p>
        )}

        {filtered.map((item) => (
          <div key={item._id} className="card" style={{ marginBottom: "15px" }}>
            <p><strong>Website:</strong> {item.website}</p>
            <p><strong>Username:</strong> {item.username}</p>

            <p>
              <strong>Password:</strong>{" "}
              {showPassword[item._id] ? item.password : "••••••••"}
            </p>

            <div style={{ marginTop: "10px" }}>
              <button
                onClick={() => togglePassword(item._id)}
                style={{
                  marginRight: "10px",
                  background: "transparent",
                  border: "1px solid #22c55e",
                  color: "#22c55e",
                }}
              >
                {showPassword[item._id] ? "Hide" : "Show"}
              </button>

              <button
                onClick={() => copyPassword(item.password)}
                style={{
                  marginRight: "10px",
                  background: "transparent",
                  border: "1px solid #06b6d4",
                  color: "#06b6d4",
                }}
              >
                Copy
              </button>

              <button
                onClick={() => setDeleteId(item._id)}
                style={{
                  background: "transparent",
                  border: "1px solid red",
                  color: "red",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {deleteId && (
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
              zIndex: 1000,
            }}
          >
            <div className="card" style={{ width: "400px", textAlign: "center" }}>
              <h3>⚠ Confirm Delete</h3>
              <p style={{ marginTop: "10px", color: "#94a3b8" }}>
                Are you sure you want to delete this password?
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "15px",
                  marginTop: "20px",
                  justifyContent: "center",
                }}
              >
                <button onClick={confirmDelete} style={{ background: "red" }}>
                  Yes Delete
                </button>

                <button
                  onClick={() => setDeleteId(null)}
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

      </div>
    </div>
  );
}
// src/pages/TDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"; // ensure src/api.js exists
// NOTE: Not using ThemeContext here to avoid import errors if you don't have it.

const sidebarItems = [
  { icon: "fa-home", label: "Dashboard", route: "/tdashboard" },
  { icon: "fa-users", label: "View groups", route: "/tcheckgroup" },
  { icon: "fa-folder-open", label: "Resources", route: "/teacher-resources" },
  { icon: "fa-home", label: "Assign project", route: "/assign-project" },
  { icon: "fa-users", label: "View Students", route: "/view-students" },
  { icon: "fa-envelope", label: "Messages", route: "/teachers-messages" },
  { icon: "fa-user", label: "Profile", route: "/tprofile" },
  { icon: "fa-undo", label: "Correction", route: "/corrections" },
  { icon: "fa-sign-out-alt", label: "Logout", route: "/login" }
];

const ProgressBar = ({ value = 0 }) => (
  <div style={{ height: 20, borderRadius: 9, background: "#e5e5e5", width: 180, overflow: "hidden" }}>
    <div
      style={{
        height: "100%",
        width: `${value}%`,
        background: value === 100 ? "#22c55e" : value > 30 ? "#ffc72c" : "#dc2626",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        color: "#232b32",
      }}
    >
      {value}%
    </div>
  </div>
);

const TDashboard = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Inject Font Awesome once
    if (!document.getElementById("fa-cdn")) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css";
      link.id = "fa-cdn";
      document.head.appendChild(link);
    }
  }, []);

  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = async () => {
    setLoading(true);
    try {
      const res = await api.get("/groups");
      // normalize fallback if API returns different shape
      const normalized = (res.data || []).map((g) => ({
        id: g.id ?? g.group ?? Math.random().toString(36).slice(2),
        group: g.group ?? g.name ?? g.id,
        project: g.project ?? g.projectName ?? "",
        status: g.status ?? "In Progress",
        progress: typeof g.progress === "number" ? g.progress : Number(g.progress) || 0,
        grade: g.grade ?? "",
        submissions: g.submissions ?? [],
      }));
      setGroups(normalized);
    } catch (err) {
      console.error("Failed to load groups:", err);
      // fallback to some demo data so UI isn't blank
      setGroups([
        { id: "g1", group: "Group 1", project: "AI Chatbot", status: "Completed", progress: 100, grade: "A+", submissions: [] },
        { id: "g2", group: "Group 2", project: "Web Portal", status: "In Progress", progress: 60, grade: "", submissions: [] }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleGradeChangeLocal = (id, newGrade) => {
    setGroups((prev) => prev.map((g) => (g.id === id ? { ...g, grade: newGrade } : g)));
  };

  const handleGradeSave = async (id, grade) => {
    try {
      await api.post(`/groups/${id}/grade`, { grade });
      await loadGroups();
      alert("Grade saved");
    } catch (err) {
      console.error(err);
      alert("Failed to save grade");
    }
  };

  const handleFileUpload = async (id, file) => {
    if (!file) return;
    const fd = new FormData();
    fd.append("file", file);
    try {
      await api.post(`/groups/${id}/upload`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      await loadGroups();
      alert("File uploaded");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  const getStatusStyle = (status) =>
    status === "Completed"
      ? { color: "#22c55e", fontWeight: 600 }
      : status === "In Progress"
      ? { color: "#eab308", fontWeight: 600 }
      : { color: "#dc2626", fontWeight: 600 };

  if (loading) {
    return <div style={{ padding: 28, fontFamily: "Poppins, sans-serif" }}>Loading dashboard…</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <span style={{ color: "#ffc72c" }}>Teacher Panel</span>
        </div>

        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            active={item.route === "/tdashboard"}
            onClick={() => navigate(item.route)}
          />
        ))}
      </div>

      <div style={styles.content}>
        <div style={styles.topBar}>
          <h1 style={styles.title}>Teacher Dashboard</h1>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button style={styles.logoutBtn} onClick={() => navigate("/login")}>Logout</button>
          </div>
        </div>

        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>Recent Group Projects</h2>

          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Group</th>
                <th style={styles.th}>Project</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Progress</th>
                <th style={styles.th}>Grade</th>
                <th style={styles.th}>Upload</th>
                <th style={styles.th}>Files</th>
              </tr>
            </thead>

            <tbody>
              {groups.map((g) => (
                <tr key={g.id}>
                  <td style={{ ...styles.td, color: "#18202a" }}>{g.group}</td>
                  <td style={{ ...styles.td, color: "#18202a" }}>{g.project}</td>
                  <td style={{ ...styles.td, ...getStatusStyle(g.status) }}>{g.status}</td>
                  <td style={styles.td}><ProgressBar value={g.progress} /></td>

                  <td style={styles.td}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <input
                        type="text"
                        value={g.grade ?? ""}
                        onChange={(e) => handleGradeChangeLocal(g.id, e.target.value)}
                        style={styles.gradeInput}
                        placeholder="-"
                      />
                      <button style={styles.smallBtn} onClick={() => handleGradeSave(g.id, g.grade ?? "")}>
                        Save
                      </button>
                    </div>
                  </td>

                  <td style={styles.td}>
                    <input type="file" onChange={(e) => handleFileUpload(g.id, e.target.files[0])} />
                  </td>

                  <td style={styles.td}>
                    {g.submissions?.length === 0 ? "No files" : g.submissions.map((s, i) => (
                      <div key={i}>{s.originalName ?? s.filename ?? s.name}</div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> {/* card */}
      </div> {/* content */}
    </div>
  );
};

const SidebarItem = ({ icon, label, active, onClick }) => (
  <div onClick={onClick} style={{
    ...styles.sidebarItem,
    background: active ? "#ffc72c" : "transparent",
    color: active ? "#18202a" : "#fff",
  }}>
    <i className={`fas ${icon}`} style={styles.sidebarIcon} />
    <span>{label}</span>
  </div>
);

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    width: "100vw",
    fontFamily: "Poppins, sans-serif",
    background: "#f6f7f9"
  },

  sidebar: {
    width: "320px",
    background: "#18202a",
    paddingTop: "28px",
    display: "flex",
    flexDirection: "column"
  },

  sidebarHeader: {
    fontWeight: "bold",
    fontSize: "28px",
    color: "#ffc72c",
    paddingLeft: "28px",
    marginBottom: "28px"
  },

  sidebarItem: {
    cursor: "pointer",
    padding: "15px 32px",
    display: "flex",
    gap: "18px",
    alignItems: "center",
    fontSize: "18px",
    userSelect: "none"
  },

  sidebarIcon: {
    fontSize: "20px",
    width: "24px",
    minWidth: "24px",
    color: "inherit"
  },

  content: {
    flex: 1,
    padding: "38px 34px 30px 40px"
  },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  title: {
    fontWeight: 700,
    fontSize: "36px",
    color: "#18202a",
    margin: 0
  },

  logoutBtn: {
    background: "#ffc72c",
    color: "#222",
    border: "none",
    borderRadius: "10px",
    padding: "10px 20px",
    fontWeight: 600,
    fontSize: "16px",
    cursor: "pointer"
  },

  card: {
    background: "#fff",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(17,38,146,.06)",
    padding: "18px",
    marginTop: "26px"
  },

  sectionTitle: {
    fontSize: "20px",
    fontWeight: 700,
    marginBottom: 12,
    color: "#18202a"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse"
  },

  th: {
    background: "#ffc72c",
    color: "#232b32",
    fontWeight: "700",
    fontSize: "16px",
    padding: "12px 14px",
    textAlign: "left"
  },

  td: {
    padding: "14px",
    backgroundColor: "#fff",
    borderTop: "1px solid #f0f0f0",
    fontSize: "15px",
    verticalAlign: "middle"
  },

  gradeInput: {
    padding: "6px",
    fontSize: "14px",
    width: "70px",
    borderRadius: "6px",
    border: "1px solid #d8d9db",
    outline: "none"
  },

  smallBtn: {
    background: "#18202a",
    color: "#ffc72c",
    border: "none",
    padding: "6px 10px",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: 700
  }
};

export default TDashboard;

import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const sidebarItems = [
  { icon: "fa-home", label: "Dashboard", route: "/tdashboard" },
  { icon: "fa-users", label: "View groups", route: "/tcheckgroup" },
  { icon: "fa-folder-open", label: "Resources", route: "/teacher-resources" },
  { icon: "fa-home", label: "Assign project", route: "/assign-project" },
  { icon: "fa-users", label: "View Students", route: "/view-students" },
  { icon: "fa-envelope", label: "Messages", route: "/teachers-messages" },
  { icon: "fa-user", label: "Profile", route: "/tprofile" },
  { icon: "fa-undo", label: "Correction", route: "/corrections" },
  { icon: "fa-sign-out-alt", label: "Logout", route: "/login" },
];

const initialGroups = [
  { group: "Group 1", project: "AI Chatbot", status: "Completed", progress: 100 },
  { group: "Group 2", project: "Web Portal", status: "In Progress", progress: 60 },
  { group: "Group 3", project: "Data Analysis", status: "Overdue", progress: 30 },
];

const AssignProject = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [groups] = useState(initialGroups);

  const [form, setForm] = useState({
    title: "",
    description: "",
    deadline: "",
    assignGroups: [],
  });

  useEffect(() => {
    if (!document.getElementById("fa-cdn")) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css";
      link.id = "fa-cdn";
      document.head.appendChild(link);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, options, type } = e.target;
    if (type === "select-multiple") {
      const values = Array.from(options).filter((o) => o.selected).map((o) => o.value);
      setForm((prev) => ({ ...prev, [name]: values }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Assigned project "${form.title}" to: ${form.assignGroups.join(", ")}`);
    setForm({ title: "", description: "", deadline: "", assignGroups: [] });
  };

  const getStatusStyle = (status) =>
    status === "Completed"
      ? { color: "#22c55e", fontWeight: 600 }
      : status === "In Progress"
      ? { color: "#eab308", fontWeight: 600 }
      : { color: "#dc2626", fontWeight: 600 };

  const ProgressBar = ({ value }) => (
    <div
      style={{
        height: 20,
        borderRadius: 9,
        background: "#e5e5e5",
        width: 150,
        display: "inline-block",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: 20,
          borderRadius: 9,
          background: value === 100 ? "#22c55e" : value > 30 ? "#ffc72c" : "#dc2626",
          width: `${value}%`,
          color: "#232b32",
          fontWeight: 700,
          fontSize: 14,
          textAlign: "center",
          lineHeight: "20px",
          transition: "width 0.5s ease",
        }}
      >
        {value}%
      </div>
    </div>
  );

  return (
    <div style={{ ...styles.container, height: "100vh", width: "100vw" }}>
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>Teacher Panel</div>
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.route}
            {...item}
            active={location.pathname === item.route}
            onClick={() => navigate(item.route)}
          />
        ))}
      </div>
      <div style={styles.contentArea}>
        <div style={styles.topBar}>
          <h1 style={{ ...styles.title, color: "#18202a" }}>Group Projects</h1>
          <button style={{ ...styles.logoutBtn, color: "#222" }} onClick={() => navigate("/login")}>
            Logout
          </button>
        </div>
        <div style={styles.card}>
          <form onSubmit={handleSubmit}>
            <h2 style={{ ...styles.formTitle, color: "#18202a" }}>Assign New Project</h2>
            <div style={styles.formGroup}>
              <label style={{ ...styles.label, color: "#18202a" }}>Project Title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                style={{ ...styles.input, color: "#18202a", backgroundColor: "#fff" }}
                onChange={handleChange}
                placeholder="Enter project title"
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={{ ...styles.label, color: "#18202a" }}>Project Description</label>
              <textarea
                name="description"
                rows={3}
                value={form.description}
                style={{ ...styles.input, resize: "vertical", color: "#18202a", backgroundColor: "#fff" }}
                onChange={handleChange}
                placeholder="Enter project description"
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={{ ...styles.label, color: "#18202a" }}>Deadline</label>
              <input
                type="text"
                name="deadline"
                value={form.deadline}
                style={{ ...styles.input, color: "#18202a", backgroundColor: "#fff" }}
                onChange={handleChange}
                placeholder="dd - mm - yyyy"
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={{ ...styles.label, color: "#18202a" }}>Assign to Group</label>
              <select
                name="assignGroups"
                value={form.assignGroups}
                multiple
                style={{ ...styles.input, height: 90, color: "#18202a", backgroundColor: "#fff" }}
                onChange={handleChange}
                required
              >
                <option value="Group 1">Group 1</option>
                <option value="Group 2">Group 2</option>
                <option value="Group 3">Group 3</option>
              </select>
              <div style={{ ...styles.note, color: "#393939" }}>
                Hold Ctrl (or Cmd) to select multiple groups
              </div>
            </div>
            <button type="submit" style={styles.submitBtn}>
              Assign Project
            </button>
          </form>
        </div>
        <div style={styles.existingProjects}>
          <h2 style={{ ...styles.existingTitle, color: "#18202a" }}>Existing Group Projects</h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Group</th>
                <th style={styles.th}>Project</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Progress</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((g) => (
                <tr key={g.group}>
                  <td style={{ ...styles.td, color: "#18202a" }}>{g.group}</td>
                  <td style={{ ...styles.td, color: "#18202a" }}>{g.project}</td>
                  <td style={{ ...styles.td, ...getStatusStyle(g.status) }}>{g.status}</td>
                  <td style={styles.td}>
                    <ProgressBar value={g.progress} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, active, onClick }) => (
  <div
    onClick={onClick}
    style={{
      ...styles.sidebarItem,
      backgroundColor: active ? "#ffc72c" : "transparent",
      color: active ? "#18202a" : "#fff",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: 18,
      padding: "15px 32px",
      fontSize: 18,
      userSelect: "none",
      transition: "background-color 0.3s, color 0.3s",
    }}
    role="button"
    tabIndex={0}
    onKeyPress={(e) => {
      if (e.key === "Enter" || e.key === " ") onClick();
    }}
  >
    <i className={`fas ${icon}`} style={styles.sidebarIcon} aria-hidden="true"></i>
    <span>{label}</span>
  </div>
);

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    width: "100vw",
    fontFamily: "Poppins, sans-serif",
    background: "#f6f7f9",
  },
  sidebar: {
    width: 320,
    background: "#18202a",
    paddingTop: 28,
    display: "flex",
    flexDirection: "column",
  },
  sidebarHeader: {
    fontWeight: "bold",
    fontSize: 28,
    color: "#ffc72c",
    paddingLeft: 28,
    marginBottom: 28,
  },
  sidebarItem: {
    fontSize: 18,
    padding: "15px 32px",
    display: "flex",
    alignItems: "center",
    gap: 18,
    userSelect: "none",
  },
  sidebarIcon: {
    fontSize: 20,
    width: 24,
    minWidth: 24,
  },
  contentArea: {
    flexGrow: 1,
    padding: "36px 50px",
    overflowY: "auto",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontWeight: 700,
    fontSize: 40,
    color: "#18202a",
  },
  logoutBtn: {
    background: "#ffc72c",
    color: "#222",
    border: "none",
    borderRadius: "10px",
    padding: "10px 28px",
    fontWeight: 600,
    fontSize: 18,
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  card: {
    background: "#fff",
    borderRadius: 16,
    boxShadow: "0 8px 24px rgba(17,38,146,.08)",
    padding: "32px 36px",
    marginTop: 24,
    marginBottom: 35,
    maxWidth: 1000,
  },
  formTitle: {
    fontWeight: 700,
    fontSize: 30,
    marginBottom: 24,
    marginTop: 0,
  },
  formGroup: {
    marginBottom: 22,
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontWeight: 600,
    marginBottom: 8,
    fontSize: 17,
    color: "#18202a",
  },
  input: {
    border: "1px solid #ccc",
    borderRadius: 7,
    padding: "13px 16px",
    fontSize: 17,
    outline: "none",
    color: "#18202a",
    backgroundColor: "#fff",
  },
  note: {
    fontSize: 14,
    marginTop: 6,
    color: "#393939",
  },
  submitBtn: {
    marginTop: 14,
    background: "#ffc72c",
    color: "#151616",
    border: "none",
    borderRadius: 9,
    fontSize: 19,
    fontWeight: 700,
    padding: "14px 30px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  existingProjects: {
    background: "#fff",
    borderRadius: 16,
    boxShadow: "0 8px 24px rgba(17,38,146,.08)",
    padding: "22px 24px",
    marginBottom: 34,
    marginTop: 45,
    maxWidth: 1000,
  },
  existingTitle: {
    fontWeight: 700,
    fontSize: 26,
    marginBottom: 14,
    color: "#18202a",
  },
  table: {
    width: "100%",
    borderCollapse: "separate",
  },
  th: {
    backgroundColor: "#171e2b",
    color: "#fff",
    fontWeight: 700,
    fontSize: 19,
    padding: "12px 16px",
    textAlign: "left",
  },
  td: {
    padding: "14px 16px",
    background: "#fff",
    fontSize: 17,
    borderTop: "1px solid #f0f0f0",
    color: "#18202a",
  },
};

export default AssignProject;

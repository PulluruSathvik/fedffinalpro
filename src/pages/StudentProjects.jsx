import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const sidebarItems = [
  { icon: "fa-home", label: "Dashboard", route: "/student-dashboard" },
  { icon: "fa-users", label: "My Group", route: "/student-group" },
  { icon: "fa-folder", label: "My Projects", route: "/student-projects" },
  { icon: "fa-list-check", label: "Assignments", route: "/student-assignments" },
  { icon: "fa-flag", label: "Milestones", route: "/student-milestones" },
  { icon: "fa-file-alt", label: "Progress Report", route: "/student-report" },
  { icon: "fa-folder-open", label: "Resources", route: "/student-resources" },
  { icon: "fa-cog", label: "Settings", route: "/student-settings" },
  { icon: "fa-sign-out-alt", label: "Logout", route: "/login" }
];

const projects = [
  { title: "AI Chatbot", description: "Create an AI chatbot using Python", group: "Group 1", status: "Completed" },
  { title: "Web Portal", description: "Develop a student project portal", group: "Group 2", status: "Pending" },
  { title: "Data Analysis", description: "Analyze sales data using Excel", group: "Group 1", status: "Completed" },
  { title: "Mobile App", description: "Create a simple Android app", group: "Group 3", status: "Pending" }
];

export default function StudentProjects() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!document.getElementById("fa-cdn")) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css";
      link.id = "fa-cdn";
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <span style={{ color: "#ffc72c" }}>Student Panel</span>
        </div>
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            active={item.route === "/student-projects"}
            onClick={() => navigate(item.route)}
          />
        ))}
      </div>
      <div style={styles.contentArea}>
        <div style={styles.topRow}>
          <h1 style={styles.title}>Welcome, Student!</h1>
          <button style={styles.logoutBtn} onClick={() => navigate("/login")}>
            Logout
          </button>
        </div>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>My Projects</h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Project Title</th>
                <th style={styles.th}>Description</th>
                <th style={styles.th}>Group</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((pr) => (
                <tr key={pr.title}>
                  <td style={styles.td}>{pr.title}</td>
                  <td style={styles.td}>{pr.description}</td>
                  <td style={styles.td}>{pr.group}</td>
                  <td style={styles.td}>
                    <span
                      style={{
                        color: pr.status === "Completed" ? "#22c55e" : "#eab308",
                        fontWeight: 600
                      }}
                    >
                      {pr.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const SidebarItem = ({ icon, label, active, onClick }) => (
  <div
    onClick={onClick}
    style={{
      ...styles.sidebarItem,
      background: active ? "#ffc72c" : "transparent",
      color: active ? "#18202a" : "#fff"
    }}
  >
    <i className={`fas ${icon}`} style={styles.sidebarIcon}></i>
    <span>{label}</span>
  </div>
);

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    width: "100vw",
    backgroundColor: "#f6f7f9",
    fontFamily: "Poppins, sans-serif"
  },
  sidebar: {
    width: "320px",
    backgroundColor: "#18202a", // keep sidebar background dark
    paddingTop: "28px",
    display: "flex",
    flexDirection: "column"
  },
  sidebarHeader: {
    fontWeight: "bold",
    fontSize: "28px",
    color: "#ffc72c", // unchanged for good contrast
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
    userSelect: "none",
    color: "#fff", // default sidebar text stays white for contrast
    background: "transparent"
  },
  sidebarIcon: {
    fontSize: "20px",
    width: "24px",
    minWidth: "24px"
  },
  contentArea: {
    flexGrow: 1,
    padding: "36px 50px",
    overflowY: "auto"
  },
  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "14px"
  },
  title: {
    fontWeight: 700,
    fontSize: "40px",
    color: "#18202a", // dark title for clear visibility
    margin: 0
  },
  logoutBtn: {
    background: "#ffc72c",
    color: "#18202a",
    border: "none",
    borderRadius: "10px",
    padding: "10px 28px",
    fontWeight: 600,
    fontSize: "18px",
    cursor: "pointer"
  },
  card: {
    background: "#fff",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(17,38,146,.08)",
    padding: "36px 32px 24px 32px",
    marginTop: "18px"
  },
  cardTitle: {
    fontSize: "2rem",
    fontWeight: 700,
    color: "#18202a", // dark for easy reading
    marginBottom: "24px",
    marginTop: 0
  },
  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0 0.5rem"
  },
  th: {
    backgroundColor: "#171e2b",
    color: "#fff", // white on dark blue background
    fontWeight: 700,
    fontSize: "18px",
    padding: "13px 16px",
    textAlign: "left"
  },
  td: {
    padding: "14px 16px",
    backgroundColor: "#fff",
    borderTop: "1px solid #f0f0f0",
    fontSize: "17px",
    color: "#18202a" // dark text on light cell background
  }
};

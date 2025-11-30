import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const sidebarItems = [
  { icon: "fa-home", label: "Dashboard", route: "/student-dashboard" },
  { icon: "fa-bolt", label: "Streaks", route: "/student-streaks" },   // NEW
  { icon: "fa-users", label: "My Group", route: "/student-group" },
  { icon: "fa-folder", label: "My Projects", route: "/student-projects" },
  { icon: "fa-flag", label: "Milestones", route: "/student-milestones" },
  { icon: "fa-file-alt", label: "Progress Report", route: "/student-report" },
  { icon: "fa-folder-open", label: "Resources", route: "/student-resources" },
  { icon: "fa-cog", label: "Settings", route: "/student-settings" },
  { icon: "fa-sign-out-alt", label: "Logout", route: "/login" }
];


const resources = [
  {
    title: "Lecture Notes: HTML & CSS",
    desc: "PDF file covering the basics of web development.",
    download: "/downloads/html_css_notes.pdf",
    view: "/view/html_css_notes",
  },
  {
    title: "Sample Project Code",
    desc: "ZIP file containing example project code for reference.",
    download: "/downloads/sample_project_code.zip",
    view: "/view/sample_project_code",
  },
  {
    title: "Tutorial Video: JavaScript Basics",
    desc: "Video tutorial on JS fundamentals for project work.",
    download: "/downloads/js_basics_video.mp4",
    view: "/view/js_basics_video",
  },
];

const StudentResources = () => {
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
            {...item}
            active={item.route === "/student-resources"}
            onClick={() => navigate(item.route)}
          />
        ))}
      </div>
      <div style={styles.contentArea}>
        <div style={styles.topBar}>
          <h1 style={styles.title}>Course Materials</h1>
          <button style={styles.logoutBtn} onClick={() => navigate("/login")}>
            Logout
          </button>
        </div>
        {resources.map((res, i) => (
          <div style={styles.card} key={i}>
            <div style={styles.resourceTitle}>{res.title}</div>
            <div style={styles.desc}>{res.desc}</div>
            <div style={styles.buttonRow}>
              <a
                style={styles.iconBtn}
                href={res.download}
                download
                aria-label={`Download ${res.title}`}
              >
                <i className="fas fa-download" style={{ marginRight: 6 }} />
                Download
              </a>
              <a
                style={styles.iconBtn}
                href={res.view}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${res.title}`}
              >
                <i className="fas fa-eye" style={{ marginRight: 6 }} />
                View
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, active, onClick }) => (
  <div
    onClick={onClick}
    style={{
      ...styles.sidebarItem,
      background: active ? "#ffc72c" : "transparent",
      color: active ? "#18202a" : "#fff",
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
    background: "#f6f7f9",
    fontFamily: "Poppins, sans-serif",
  },
  sidebar: {
    width: "320px",
    background: "#18202a",
    paddingTop: "28px",
    display: "flex",
    flexDirection: "column",
  },
  sidebarHeader: {
    fontWeight: "bold",
    fontSize: "28px",
    color: "#ffc72c",
    paddingLeft: "28px",
    marginBottom: "28px",
  },
  sidebarItem: {
    cursor: "pointer",
    padding: "15px 32px",
    display: "flex",
    gap: "18px",
    alignItems: "center",
    fontSize: "18px",
    userSelect: "none",
  },
  sidebarIcon: {
    fontSize: "20px",
    width: "24px",
    minWidth: "24px",
  },
  contentArea: {
    flexGrow: 1,
    padding: "36px 50px",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  title: {
    fontWeight: 700,
    fontSize: "40px",
    color: "#18202a",
  },
  logoutBtn: {
    background: "#ffc72c",
    color: "#222",
    border: "none",
    borderRadius: "10px",
    padding: "10px 28px",
    fontWeight: 600,
    fontSize: "18px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  card: {
    background: "#fff",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(17,38,146,.08)",
    padding: "18px 32px",
    display: "flex",
    flexDirection: "column",
    marginBottom: "18px",
  },
  resourceTitle: {
    fontWeight: 700,
    fontSize: "22px",
    marginBottom: "5px",
  },
  desc: {
    color: "#373e4a",
    fontSize: "17px",
    marginBottom: "14px",
  },
  buttonRow: {
    display: "flex",
    gap: "16px",
    marginTop: "9px",
  },
  iconBtn: {
    background: "#ffc72c",
    color: "#232b32",
    fontWeight: 600,
    fontSize: "17px",
    borderRadius: "8px",
    padding: "7px 22px",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    cursor: "pointer",
    border: "none",
    transition: "background-color 0.3s",
  },
};

export default StudentResources;

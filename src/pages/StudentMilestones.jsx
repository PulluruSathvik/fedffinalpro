import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Sidebar config for student pages
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

// Demo milestone data
const milestoneData = [
  {
    title: "Design Document",
    status: "Completed",
    statusColor: "#22c55e",
    project: "AI Chatbot",
    due: "2025-09-28",
    rating: 5
  },
  {
    title: "Prototype",
    status: "Pending",
    statusColor: "#ffc72c",
    project: "Web Portal",
    due: "2025-10-05",
    rating: 0
  },
  {
    title: "Data Analysis Report",
    status: "Overdue",
    statusColor: "#ef4444",
    project: "Data Analysis",
    due: "2025-10-08",
    rating: 2
  },
  {
    title: "App Testing",
    status: "Pending",
    statusColor: "#ffc72c",
    project: "Mobile App",
    due: "2025-10-15",
    rating: 0
  }
];

// Renders FontAwesome rated stars
function RatingStars({ rating = 0 }) {
  const stars = [];
  for (let i = 1; i <= 5; ++i) {
    stars.push(
      <i
        key={i}
        className={`fa-star${i <= rating ? " fas" : " far"}`}
        style={{ color: "#ffc72c", fontSize: 19, marginRight: 2 }}
      />
    );
  }
  return <span>{stars}</span>;
}

export default function StudentMilestones() {
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
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <span style={{ color: "#ffc72c" }}>Student Panel</span>
        </div>
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            active={item.route === "/student-milestones"}
            onClick={() => navigate(item.route)}
          />
        ))}
      </div>
      <div style={styles.contentArea}>
        <div style={styles.topRow}>
          <h1 style={styles.title}>My Milestones</h1>
          <button style={styles.logoutBtn} onClick={() => navigate("/login")}>Logout</button>
        </div>
        <div style={styles.cardsGrid}>
          {milestoneData.map((m) => (
            <div key={m.title} style={styles.milestoneCard}>
              <div style={styles.cardTop}>
                <span style={styles.cardTitle}>{m.title}</span>
                <span
                  style={{
                    ...styles.statusBadge,
                    background: m.statusColor,
                    color: m.status === "Completed" ? "#fff" : "#333"
                  }}
                >
                  {m.status}
                </span>
              </div>
              <div style={styles.cardContent}>
                <div>
                  Project:&nbsp;<span style={{ fontWeight: 600 }}>{m.project}</span>
                </div>
                <div>Due: {m.due}</div>
                <div style={{ marginTop: 6 }}>
                  Rating: <RatingStars rating={m.rating} />
                </div>
              </div>
            </div>
          ))}
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
    backgroundColor: "#18202a",
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
    color: "#18202a",
    margin: 0
  },
  logoutBtn: {
    background: "#ffc72c",
    color: "#222",
    border: "none",
    borderRadius: "10px",
    padding: "10px 28px",
    fontWeight: 600,
    fontSize: "18px",
    cursor: "pointer"
  },
  cardsGrid: {
    display: "flex",
    gap: "36px",
    marginTop: "32px",
    flexWrap: "wrap"
  },
  milestoneCard: {
    background: "#fff",
    borderRadius: "18px",
    boxShadow: "0 8px 24px rgba(17,38,146,.10)",
    padding: "28px 28px 20px 28px",
    minWidth: "290px",
    maxWidth: "315px",
    display: "flex",
    flexDirection: "column",
    gap: "13px"
  },
  cardTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  cardTitle: {
    fontSize: "22px",
    fontWeight: 700,
    color: "#18202a"
  },
  statusBadge: {
    padding: "6px 22px",
    borderRadius: "16px",
    fontWeight: 700,
    fontSize: "15px",
    alignSelf: "flex-start"
  },
  cardContent: {
    marginTop: "7px",
    fontSize: "17px",
    color: "#333"
  }
};

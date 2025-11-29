import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const sidebarItems = [
  { icon: "fa-home", label: "Dashboard", route: "/tdashboard" },
  { icon: "fa-users", label: "View groups", route: "/tcheckgroup" },
  { icon: "fa-folder-open", label: "Resources", route: "/teacher-resources" },
  { icon: "fa-tasks", label: "Assign project", route: "/assign-project" },
  { icon: "fa-user-graduate", label: "View Students", route: "/view-students" },
  { icon: "fa-envelope", label: "Messages", route: "/teachers-messages" },
  { icon: "fa-user", label: "Profile", route: "/tprofile" },
  { icon: "fa-undo", label: "Correction", route: "/corrections" },
  { icon: "fa-sign-out-alt", label: "Logout", route: "/login" }
];

const dashboardStats = [
  { icon: "fa-graduation-cap", value: 120, label: "Total Students" },
  { icon: "fa-book", value: 15, label: "Active Projects" },
  { icon: "fa-list-check", value: 5, label: "Pending Tasks" },
  { icon: "fa-envelope", value: 8, label: "Unread Messages" }
];

const initialGroups = [
  { group: "Group 1", project: "AI Chatbot", status: "Completed", progress: 100, grade: "A+" },
  { group: "Group 2", project: "Web Portal", status: "In Progress", progress: 60, grade: "" },
  { group: "Group 3", project: "Data Analysis", status: "Overdue", progress: 30, grade: "" }
];

const TDashboard = () => {
  const navigate = useNavigate();
  const [groups] = useState(initialGroups);

  // Animate stats count-up effect
  const [animatedStats, setAnimatedStats] = useState(dashboardStats.map(() => 0));
  useEffect(() => {
    let animationFrame;
    let start = null;
    const duration = 1200;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const newStats = dashboardStats.map((stat, i) =>
        Math.min(Math.floor((progress / duration) * stat.value), stat.value)
      );
      setAnimatedStats(newStats);
      if (progress < duration) animationFrame = requestAnimationFrame(step);
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  useEffect(() => {
    if (!document.getElementById("fa-cdn")) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css";
      link.id = "fa-cdn";
      document.head.appendChild(link);
    }
  }, []);

  // Add slide-in animation on mount
  const [contentVisible, setContentVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setContentVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  function ProgressBar({ value }) {
    return (
      <div
        style={{
          height: 20,
          borderRadius: 12,
          background: "#e5e5e5",
          width: 180,
          overflow: "hidden",
          boxShadow: "inset 0 1px 3px rgb(0 0 0 / 0.2)",
        }}
        aria-label={`Progress: ${value}%`}
      >
        <div
          style={{
            height: "100%",
            borderRadius: 12,
            background:
              value === 100 ? "linear-gradient(90deg, #22c55e, #16a34a)" :
              value > 30 ? "linear-gradient(90deg, #ffc72c, #d97706)" :
              "linear-gradient(90deg, #dc2626, #991b1b)",
            width: `${value}%`,
            color: "#232b32",
            fontWeight: 700,
            fontSize: 15,
            textAlign: "center",
            lineHeight: "20px",
            transition: "width 1.2s ease",
            boxShadow: value === 100 ? "0 0 8px #22c55e" : "none",
            userSelect: "none",
            textShadow: "0 0 4px rgba(255 255 255 / 0.7)"
          }}
        >
          {value}%
        </div>
      </div>
    );
  }

  const getStatusStyle = status =>
    status === "Completed"
      ? { color: "#22c55e", fontWeight: 600 }
      : status === "In Progress"
        ? { color: "#eab308", fontWeight: 600 }
        : { color: "#dc2626", fontWeight: 600 };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>Teacher Panel</div>
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

      <div
        style={{
          ...styles.contentArea,
          opacity: contentVisible ? 1 : 0,
          transform: contentVisible ? "translateX(0)" : "translateX(40px)",
          transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div style={styles.topBar}>
          <h1 style={styles.title}>Teacher Dashboard</h1>
          <button style={styles.logoutBtn} onClick={() => navigate("/login")}>
            Logout
            <i className="fas fa-right-from-bracket" style={{ marginLeft: 8 }}></i>
          </button>
        </div>

        <div style={styles.statsRow}>
          {dashboardStats.map((stat, i) => (
            <div key={stat.label} style={styles.statCard}>
              <i
                className={`fas ${stat.icon}`}
                style={{ ...styles.statIcon, filter: "drop-shadow(0 0 2px #ffc72c)" }}
                aria-hidden="true"
              ></i>
              <div>
                <div
                  style={{
                    ...styles.statValue,
                    color: "#18202a",
                    transition: "color 0.3s ease",
                    userSelect: "none",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {animatedStats[i]}
                </div>
                <div style={styles.statLabel}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={styles.cardSection}>
          <div
            style={{
              fontWeight: 700,
              fontSize: "28px",
              marginBottom: 14,
              color: "#18202a",
              textShadow: "0 1px 1px rgba(0,0,0,0.1)"
            }}
          >
            Recent Group Projects
          </div>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Group</th>
                <th style={styles.th}>Project</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Progress</th>
                <th style={styles.th}>Grade</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((g) => (
                <tr key={g.group} style={{ transition: "background-color 0.3s", cursor: "default" }} tabIndex={0}>
                  <td style={{ ...styles.td, color: "#18202a", fontWeight: 600 }}>{g.group}</td>
                  <td style={{ ...styles.td, color: "#18202a" }}>{g.project}</td>
                  <td style={{ ...styles.td, ...getStatusStyle(g.status) }}>{g.status}</td>
                  <td style={styles.td}>
                    <ProgressBar value={g.progress} />
                  </td>
                  <td style={styles.td}>
                    <input
                      type="text"
                      value={g.grade}
                      placeholder="-"
                      readOnly
                      style={styles.gradeInput}
                      aria-label={`${g.group} grade`}
                    />
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
  // Add hover glow effect and smooth transition on active
  <div
    onClick={onClick}
    title={label}
    role="button"
    tabIndex={0}
    onKeyPress={e => { if (e.key === "Enter") onClick(); }}
    style={{
      ...styles.sidebarItem,
      backgroundColor: active ? "#ffc72c" : "transparent",
      color: active ? "#18202a" : "#fff",
      boxShadow: active ? "0 0 10px #ffc72c" : "none",
      transition: "all 0.3s ease",
    }}
  >
    <i
      className={`fas ${icon}`}
      style={{
        ...styles.sidebarIcon,
        filter: active ? "drop-shadow(0 0 5px #ffc72c)" : "none",
        transition: "filter 0.3s ease",
      }}
      aria-hidden="true"
    ></i>
    <span>{label}</span>
  </div>
);

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    width: "100vw",
    background: "linear-gradient(135deg, #f0f2f5, #d9e2ec)",
    fontFamily: "Poppins, sans-serif",
    overflowX: "hidden",
  },
  sidebar: {
    width: "320px",
    background: "linear-gradient(180deg, #171e2b 0%, #25303c 100%)",
    paddingTop: "28px",
    display: "flex",
    flexDirection: "column",
    boxShadow: "4px 0 15px rgba(0,0,0,0.15)",
    userSelect: "none",
  },
  sidebarHeader: {
    fontWeight: "bold",
    fontSize: "32px",
    color: "#ffc72c",
    paddingLeft: "28px",
    marginBottom: "28px",
    textShadow: "0 0 10px #ffc72c",
    userSelect: "none",
  },
  sidebarItem: {
    cursor: "pointer",
    padding: "15px 32px",
    display: "flex",
    gap: "18px",
    alignItems: "center",
    fontSize: "18px",
    userSelect: "none",
    borderRadius: "8px",
    margin: "6px 14px",
  },
  sidebarIcon: {
    fontSize: "20px",
    width: "24px",
    minWidth: "24px",
  },
  contentArea: {
    flexGrow: 1,
    padding: "36px 50px",
    overflowY: "auto",
    boxShadow: "0 0 25px rgba(0,0,0,0.05)",
    borderRadius: "18px",
    backgroundColor: "#fff",
    margin: "30px",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "36px",
  },
  title: {
    fontWeight: 800,
    fontSize: "42px",
    color: "#18202a",
    margin: 0,
    letterSpacing: "0.1em",
    textShadow: "1px 1px 2px rgba(0,0,0,0.12)",
  },
  logoutBtn: {
    background: "linear-gradient(90deg, #ffc72c, #d29e00)",
    color: "#222",
    border: "none",
    borderRadius: "14px",
    padding: "12px 30px",
    fontWeight: 700,
    fontSize: "18px",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(255, 199, 44,0.7)",
    transition: "background-color 0.3s ease",
  },
  statsRow: {
    display: "flex",
    gap: "34px",
    marginBottom: "28px",
  },
  statCard: {
    flex: 1,
    background: "#fff",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    boxShadow: "0 8px 24px rgba(17, 38, 146, .15)",
    gap: "22px",
    padding: "28px 30px",
    cursor: "default",
    userSelect: "none",
    transition: "transform 0.3s ease",
  },
  statIcon: {
    fontSize: "42px",
    color: "#ffc72c",
  },
  statValue: {
    fontWeight: 900,
    fontSize: "30px",
  },
  statLabel: {
    color: "#7a7a7a",
    fontWeight: 500,
    fontSize: "18px",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  },
  cardSection: {
    marginTop: 26,
    background: "#fff",
    borderRadius: "18px",
    boxShadow: "0 10px 25px rgba(17, 38, 146, 0.12)",
    padding: "20px 26px 26px 26px",
  },
  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0 6px",
  },
  th: {
    backgroundColor: "#171e2b",
    color: "#fff",
    fontWeight: 700,
    fontSize: "19px",
    padding: "14px 18px",
    textAlign: "left",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    letterSpacing: "0.07em",
  },
  td: {
    padding: "16px 18px",
    background: "#fff",
    fontSize: "18px",
    borderTop: "1px solid #f0f0f0",
    verticalAlign: "middle",
  },
  gradeInput: {
    padding: "6px",
    fontSize: "16px",
    width: "70px",
    borderRadius: "8px",
    border: "1px solid #d8d9db",
    outline: "none",
    color: "#18202a",
    textAlign: "center",
    userSelect: "none",
  }
};

export default TDashboard;

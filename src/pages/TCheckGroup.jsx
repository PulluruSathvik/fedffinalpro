import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

const initialGroups = [
  {
    name: "Group 1",
    members: "John, Jane",
    status: "Completed",
    progress: 100,
    grade: "A+"
  },
  {
    name: "Group 2",
    members: "Michael, Emily",
    status: "In Progress",
    progress: 60,
    grade: ""
  },
  {
    name: "Group 3",
    members: "David, Sara",
    status: "Overdue",
    progress: 30,
    grade: ""
  }
];

const TCheckGroup = () => {
  const [groups, setGroups] = useState(initialGroups);
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

  const handleGradeChange = (i, val) => {
    setGroups(gs => gs.map((g, idx) => idx === i ? { ...g, grade: val } : g));
  };

  const handleAssign = (i) => {
    alert(`Task assigned/updated for ${groups[i].name} with Grade: ${groups[i].grade || "-"}`);
  };

  function ProgressBar({ value }) {
    return (
      <div style={{ height: 20, borderRadius: 9, background: "#e5e5e5", width: 180, display: "inline-block", overflow: "hidden" }}>
        <div style={{
          height: 20,
          borderRadius: 9,
          background: value === 100 ? "#22c55e" : value > 30 ? "#ffc72c" : "#dc2626",
          width: `${value}%`,
          color: "#232b32",
          fontWeight: 700,
          fontSize: 15,
          textAlign: "center",
          lineHeight: "20px"
        }}>{value}%</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <span style={{ color: "#ffc72c" }}>Teacher Panel</span>
        </div>
        {sidebarItems.map(item => (
          <SidebarItem
            key={item.label}
            {...item}
            active={item.route === "/tcheckgroup"}
            onClick={() => navigate(item.route)}
          />
        ))}
      </div>
      <div style={styles.content}>
        <div style={styles.topBar}>
          <h1 style={{ ...styles.title, color: "#18202a" }}>Group Projects</h1>
          <button style={{ ...styles.logoutBtn, color: "#222" }} onClick={() => navigate("/login")}>Logout</button>
        </div>
        <div style={styles.card}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Group Name</th>
                <th style={styles.th}>Members</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Progress</th>
                <th style={styles.th}>Grade</th>
                <th style={styles.th}>Assign/Update Task</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((g, i) => (
                <tr key={g.name}>
                  <td style={{ ...styles.td, color: "#18202a" }}>{g.name}</td>
                  <td style={{ ...styles.td, color: "#18202a" }}>{g.members}</td>
                  <td style={{
                    ...styles.td,
                    color: g.status === "Completed" ? "#22c55e" : g.status === "In Progress" ? "#eab308" : "#dc2626",
                    fontWeight: 600
                  }}>{g.status}</td>
                  <td style={styles.td}><ProgressBar value={g.progress} /></td>
                  <td style={styles.td}>
                    <input
                      type="text"
                      value={g.grade}
                      placeholder="-"
                      onChange={e => handleGradeChange(i, e.target.value)}
                      style={{ ...styles.gradeInput, color: "#18202a" }}
                    />
                  </td>
                  <td style={styles.td}>
                    <button style={styles.assignBtn} onClick={() => handleAssign(i)}>
                      Assign
                    </button>
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
      background: active ? "#ffc72c" : "transparent",
      color: active ? "#18202a" : "#fff",
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
    background: "#f6f7f9",
    fontFamily: "Poppins, sans-serif"
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
    minWidth: "24px"
  },
  content: {
    flex: 1,
    padding: "38px 34px 0 0"
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
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
  card: {
    background: "#fff",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(17,38,146,.08)",
    padding: "12px 21px 12px 21px",
    marginTop: "32px"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse"
  },
  th: {
    background: "#ffc72c",
    color: "#232b32",
    fontWeight: "bold",
    fontSize: "20px",
    padding: "16px 18px",
    textAlign: "left"
  },
  td: {
    padding: "17px 14px",
    backgroundColor: "#fff",
    borderTop: "1px solid #f0f0f0",
    fontSize: "17px",
    verticalAlign: "middle"
  },
  gradeInput: {
    padding: "6px",
    fontSize: "16px",
    width: "70px",
    borderRadius: "6px",
    border: "1px solid #d8d9db",
    outline: "none"
  },
  assignBtn: {
    background: "#ffc72c",
    color: "#232b32",
    fontWeight: 600,
    fontSize: "17px",
    border: "none",
    borderRadius: "8px",
    padding: "7px 22px",
    cursor: "pointer"
  }
};

export default TCheckGroup;

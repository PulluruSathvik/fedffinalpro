import React, { useEffect } from "react";
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


const messages = [
  {
    name: "John Doe",
    email: "john@example.com",
    message: "Hi, can you check my project submission?"
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    message: "I need help with the project group."
  },
  {
    name: "Mike Johnson",
    email: "mike@example.com",
    message: "Project deadline extension request."
  }
];

const TeacherMessages = () => {
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

  const handleReply = name => alert(`Reply to ${name}`);
  const handleRead = name => alert(`Marked read: ${name}`);

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
            active={item.route === "/teachermessages"}
            onClick={() => navigate(item.route)}
          />
        ))}
      </div>
      <div style={styles.contentArea}>
        <div style={styles.topBar}>
          <h1 style={styles.title}>Messages</h1>
          <button style={styles.logoutBtn} onClick={() => navigate("/login")}>
            Logout
          </button>
        </div>
        <div style={styles.card}>
          {messages.map((m, idx) => (
            <div key={m.name} style={styles.msgRow}>
              <div>
                <div style={styles.msgName}>{m.name}</div>
                <div style={styles.msgEmail}>{m.email}</div>
                <div style={styles.msgMessage}>{m.message}</div>
              </div>
              <div style={styles.buttonRow}>
                <button style={styles.btn} onClick={() => handleReply(m.name)}>Reply</button>
                <button style={styles.btn} onClick={() => handleRead(m.name)}>Mark Read</button>
              </div>
            </div>
          ))}
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
    fontFamily: "Poppins,sans-serif"
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
  contentArea: {
    flexGrow: 1,
    padding: "36px 50px"
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "18px"
  },
  title: {
    fontWeight: 700,
    fontSize: "40px",
    color: "#18202a"
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
    borderRadius: "18px",
    boxShadow: "0 8px 24px rgba(17,38,146,.08)",
    width: "100%",
    marginTop: 0
  },
  msgRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "26px 34px",
    borderBottom: "1px solid #eee"
  },
  msgName: {
    fontWeight: 700,
    fontSize: "21px",
    color: "#151633"
  },
  msgEmail: {
    color: "#353a45",
    fontWeight: 400,
    fontSize: "17px"
  },
  msgMessage: {
    color: "#292b2d",
    marginTop: 4,
    fontSize: "18px"
  },
  buttonRow: {
    display: "flex",
    flexDirection: "row",
    gap: "14px",
    alignItems: "center"
  },
  btn: {
    background: "#ffc72c",
    color: "#232b32",
    fontWeight: 600,
    borderRadius: "8px",
    fontSize: "17px",
    border: "none",
    padding: "9px 16px",
    cursor: "pointer"
  }
};

export default TeacherMessages;

import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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

const groupMembers = [
  { name: "John Doe", role: "Leader" },
  { name: "Jane Smith", role: "Member" },
  { name: "Michael Lee", role: "Member" },
  { name: "Emily Davis", role: "Member" }
];

const initialMessages = [
  { sender: "John", text: "Let's finalize the design today." },
  { sender: "Jane", text: "I uploaded the draft document." }
];

const tasks = [
  { task: "Design Document", assigned: "John", status: "Completed" },
  { task: "Prototype", assigned: "Jane", status: "In Progress" },
  { task: "Testing", assigned: "Michael", status: "Pending" }
];

const statusColor = (status) =>
  status === "Completed"
    ? { color: "#ffc72c", fontWeight: "bold" } // Bright yellow
    : status === "In Progress"
    ? { color: "#FCCF21", fontWeight: "bold" } // Slightly darker yellow
    : { color: "#FF5C5C", fontWeight: "bold" }; // Red

const StudentGroup = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [messages, setMessages] = useState(initialMessages);
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (!document.getElementById("fa-cdn")) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css";
      link.id = "fa-cdn";
      document.head.appendChild(link);
    }
  }, []);

  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, { sender: "You", text: message }]);
      setMessage("");
      inputRef.current?.focus();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <span style={{ color: "#ffc72c" }}>Student Panel</span>
        </div>
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
          <h1 style={styles.title}>Group Collaboration</h1>
          <button style={styles.logoutBtn} onClick={() => navigate("/login")}>
            Logout
          </button>
        </div>

        <div style={styles.membersRow}>
          {groupMembers.map((m) => (
            <div style={styles.memberCard} key={m.name}>
              <i
                className="fas fa-user-alt"
                style={{ color: "#ffc72c", fontSize: 56, marginBottom: 12 }}
              />
              <div style={{ fontWeight: "bold", fontSize: 22, color: "#222" }}>
                {m.name}
              </div>
              <div style={{ color: "#999", fontSize: 18, marginTop: 2 }}>
                {m.role}
              </div>
            </div>
          ))}
        </div>

        <div style={styles.chatBox}>
          <h2 style={styles.centerHeader}>Project Discussion</h2>
          <div style={styles.chatDiscussion}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ marginBottom: 8, color: "#222" }}>
                <span style={{ fontWeight: "bold", color: "#ffc72c" }}>
                  {msg.sender}:
                </span>{" "}
                <span>{msg.text}</span>
              </div>
            ))}
          </div>
          <div style={styles.chatInputRow}>
            <input
              ref={inputRef}
              style={styles.chatInput}
              placeholder="Type your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button style={styles.sendBtn} onClick={handleSend}>
              Send
            </button>
          </div>
        </div>

        <div style={styles.tasksSection}>
          <h2 style={styles.centerHeader}>Project Tasks</h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={{ ...styles.th, backgroundColor: "#ffc72c", color: "#222" }}>
                  Task
                </th>
                <th style={{ ...styles.th, backgroundColor: "#ffc72c", color: "#222" }}>
                  Assigned To
                </th>
                <th style={{ ...styles.th, backgroundColor: "#ffc72c", color: "#222" }}>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((t, i) => (
                <tr key={i}>
                  <td style={{ ...styles.td, color: "#222" }}>{t.task}</td>
                  <td style={{ ...styles.td, color: "#222" }}>{t.assigned}</td>
                  <td style={{ ...styles.td, ...statusColor(t.status) }}>{t.status}</td>
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
    backgroundColor: "#f6f7f9",
    fontFamily: "Poppins, sans-serif",
  },
  sidebar: {
    width: 320,
    backgroundColor: "#18202a",
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
    padding: "15px 32px",
    display: "flex",
    alignItems: "center",
    gap: 18,
    fontSize: 18,
    userSelect: "none",
  },
  sidebarIcon: {
    fontSize: 20,
    minWidth: 24,
    color: "#fff"
  },
  contentArea: {
    flexGrow: 1,
    padding: "36px 50px",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontWeight: 700,
    fontSize: 38,
    color: "#18202a",
  },
  logoutBtn: {
    backgroundColor: "#ffc72c",
    color: "#222",
    border: "none",
    borderRadius: 10,
    padding: "10px 28px",
    fontWeight: 600,
    fontSize: 18,
    cursor: "pointer",
  },
  membersRow: {
    marginTop: 22,
    marginBottom: 26,
    display: "flex",
    gap: 42,
    width: "100%",
    justifyContent: "space-between",
  },
  memberCard: {
    backgroundColor: "#fff",
    minWidth: 200,
    flex: 1,
    margin: "0 8px",
    borderRadius: 18,
    boxShadow: "0 8px 24px rgba(17,38,146,.09)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "38px 8px 24px 8px",
    gap: 5,
  },
  chatBox: {
    backgroundColor: "#fff",
    borderRadius: 18,
    boxShadow: "0 8px 24px rgba(17,38,146,.10)",
    padding: "26px 40px 24px 40px",
    marginBottom: 36,
  },
  centerHeader: {
    fontWeight: 700,
    fontSize: 25,
    textAlign: "center",
    marginBottom: 16,
  },
  chatDiscussion: {
    minHeight: 55,
    padding: "16px 10px 8px 10px",
    fontSize: 17,
    backgroundColor: "#fafbfc",
    borderRadius: 12,
  },
  chatInputRow: {
    marginTop: 18,
    display: "flex",
    gap: 16,
  },
  chatInput: {
    border: "1px solid #ccc",
    borderRadius: 6,
    fontSize: 17,
    padding: "12px 16px",
    flex: 1,
  },
  sendBtn: {
    backgroundColor: "#ffc72c",
    color: "#222",
    fontWeight: 700,
    border: "none",
    borderRadius: 9,
    fontSize: 17,
    padding: "10px 24px",
    cursor: "pointer",
  },
  tasksSection: {
    backgroundColor: "#fff",
    borderRadius: 18,
    boxShadow: "0 8px 24px rgba(17,38,146,.10)",
    padding: "30px 24px 32px 24px",
    marginBottom: 30,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    backgroundColor: "#ffc72c",
    color: "#222",
    fontWeight: "bold",
    fontSize: 19,
    padding: "12px 14px",
    textAlign: "left",
  },
  td: {
    padding: "13px 14px",
    fontSize: 17,
    backgroundColor: "#fff",
    borderTop: "1px solid #ececec",
  }
};

export default StudentGroup;

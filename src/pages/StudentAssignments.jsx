import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const assignmentsMock = [
  {
    assignment: "Design Document",
    project: "AI Chatbot",
    dueDate: "2025-09-28",
    status: "Submitted",
    marks: "95 / 100",
    submitted: true,
  },
  {
    assignment: "Prototype",
    project: "Web Portal",
    dueDate: "2025-10-05",
    status: "Pending",
    marks: "-",
    submitted: false,
  },
  {
    assignment: "Data Analysis Report",
    project: "Data Analysis",
    dueDate: "2025-10-08",
    status: "Overdue",
    marks: "-",
    submitted: false,
  },
  {
    assignment: "App Testing",
    project: "Mobile App",
    dueDate: "2025-10-15",
    status: "Pending",
    marks: "-",
    submitted: false,
  },
];

const statusColor = {
  Submitted: "#11a23b",
  Pending: "#eab308",
  Overdue: "#dc2626",
};

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


export default function StudentAssignments() {
  const [files, setFiles] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!document.getElementById("fa-cdn")) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href =
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css";
      link.id = "fa-cdn";
      document.head.appendChild(link);
    }
  }, []);

  const handleFileChange = (idx, event) => {
    setFiles({ ...files, [idx]: event.target.files[0] });
  };

  const handleSubmit = (idx) => {
    alert("Submitted: " + assignmentsMock[idx].assignment);
  };

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
            active={item.route === "/student-assignments"}
            onClick={() => navigate(item.route)}
          />
        ))}
      </div>

      <div style={styles.contentArea}>
        <div style={styles.topRow}>
          <h1 style={styles.title}>My Assignments</h1>
          <button
            style={styles.logoutBtn}
            onClick={() => navigate("/login")}
          >
            Logout
          </button>
        </div>

        <div style={styles.card}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Assignment</th>
                <th style={styles.th}>Project</th>
                <th style={styles.th}>Due Date</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Graded Marks</th>
                <th style={styles.th}>Submit</th>
              </tr>
            </thead>
            <tbody>
              {assignmentsMock.map((a, i) => (
                <tr key={a.assignment}>
                  <td style={styles.td}>{a.assignment}</td>
                  <td style={styles.td}>{a.project}</td>
                  <td style={styles.td}>{a.dueDate}</td>
                  <td
                    style={{
                      ...styles.td,
                      color: statusColor[a.status],
                      fontWeight: 600,
                    }}
                  >
                    {a.status}
                  </td>
                  <td style={styles.td}>{a.marks}</td>
                  <td style={styles.td}>
                    <input
                      type="file"
                      style={styles.fileInput}
                      disabled={a.submitted}
                      onChange={(e) => handleFileChange(i, e)}
                    />
                    <button
                      style={styles.submitBtn}
                      disabled={a.submitted}
                      onClick={() => handleSubmit(i)}
                    >
                      Submit
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
}

const SidebarItem = ({ icon, label, active, onClick }) => (
  <div
    onClick={onClick}
    style={{
      ...styles.sidebarItem,
      backgroundColor: active ? "#ffc72c" : "transparent",
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
    backgroundColor: "#f6f7f9",
    fontFamily: "Poppins, sans-serif",
  },
  sidebar: {
    width: "320px",
    backgroundColor: "#18202a", // unchanged
    paddingTop: "28px",
    display: "flex",
    flexDirection: "column",
  },
  sidebarHeader: {
    fontWeight: "bold",
    fontSize: "28px",
    color: "#ffc72c", // unchanged
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
    // color handled in component for active/inactive
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
  },
  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "18px",
  },
  title: {
    fontWeight: 700,
    fontSize: "40px",
    color: "#18202a", // dark for visibility
    margin: 0,
  },
  logoutBtn: {
    backgroundColor: "#ffc72c",
    color: "#18202a", // changed to dark color for visibility
    border: "none",
    borderRadius: "10px",
    padding: "10px 28px",
    fontWeight: 600,
    fontSize: "18px",
    cursor: "pointer",
  },
  card: {
    borderRadius: "18px",
    backgroundColor: "#fff",
    boxShadow: "0 8px 24px rgba(17,38,146,.08)",
    padding: "36px 32px 24px 32px",
    width: "100%",
  },
  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0 0.5rem",
    fontSize: "18px",
  },
  th: {
    backgroundColor: "#171e2b",
    color: "white", // unchanged, visible on dark
    padding: "12px 16px",
    textAlign: "left",
    fontWeight: "700",
    fontSize: "19px",
    borderTopLeftRadius: "7px",
    borderTopRightRadius: "7px",
  },
  td: {
    padding: "14px 16px",
    backgroundColor: "white",
    borderTop: "1px solid #f0f0f0",
    color: "#18202a", // dark for visibility on light cell
  },
  fileInput: {
    marginRight: "10px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    fontSize: "15px",
    padding: "5px",
    color: "#18202a" // dark text in file input
  },
  submitBtn: {
    backgroundColor: "#ffc72c",
    color: "#18202a", // dark for visibility
    border: "none",
    fontWeight: "600",
    borderRadius: "8px",
    padding: "10px 22px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Sidebar configuration
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

// Mock corrections data
const mockCorrections = [
  {
    student: "John Doe",
    assignment: "Math Project 1",
    viewUrl: "#",
    marks: 0,
  },
  {
    student: "Jane Smith",
    assignment: "Science Project 1",
    viewUrl: "#",
    marks: 0,
  },
  {
    student: "Mike Johnson",
    assignment: "History Essay",
    viewUrl: "#",
    marks: 0,
  },
];

export default function Corrections() {
  const [corrections, setCorrections] = useState(mockCorrections);
  const navigate = useNavigate();

  useEffect(() => {
    // Inject FontAwesome for icons
    if (!document.getElementById("fa-cdn")) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href =
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css";
      link.id = "fa-cdn";
      document.head.appendChild(link);
    }
  }, []);

  const handleMarksChange = (index, value) => {
    setCorrections((prev) =>
      prev.map((item, idx) =>
        idx === index ? { ...item, marks: value.replace(/[^0-9]/g, "") } : item
      )
    );
  };

  const handleSave = (index) => {
    alert(
      `Marks for ${corrections[index].student} (${corrections[index].assignment}): ${corrections[index].marks}`
    );
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <span style={{ color: "#ffc72c" }}>Teacher Panel</span>
        </div>
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            active={item.route === "/corrections"}
            onClick={() => navigate(item.route)}
          />
        ))}
      </div>

      {/* Content */}
      <div style={styles.contentArea}>
        <div style={styles.topRow}>
          <h1 style={{ ...styles.title, color: "#18202a" }}>Correct Assignments</h1>
          <button
            style={{ ...styles.logoutBtn, color: "#222" }}
            onClick={() => navigate("/login")}
          >
            Logout
          </button>
        </div>
        <div style={styles.card}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Student Name</th>
                <th style={styles.th}>Assignment</th>
                <th style={styles.th}>Submitted Answer</th>
                <th style={styles.th}>Marks</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {corrections.map((row, idx) => (
                <tr key={row.student + row.assignment}>
                  <td style={{ ...styles.td, color: "#18202a" }}>{row.student}</td>
                  <td style={{ ...styles.td, color: "#18202a" }}>{row.assignment}</td>
                  <td style={styles.td}>
                    <span
                      style={{
                        color: "#fbbf24",
                        fontWeight: 600,
                        cursor: "pointer",
                        textDecoration: "underline"
                      }}
                      onClick={() => alert("Show answer details")}
                    >
                      View Answer
                    </span>
                  </td>
                  <td style={styles.td}>
                    <input
                      style={{ ...styles.inputField, color: "#18202a" }}
                      type="text"
                      value={row.marks}
                      onChange={(e) =>
                        handleMarksChange(idx, e.target.value)
                      }
                    />
                  </td>
                  <td style={styles.td}>
                    <button
                      style={styles.saveBtn}
                      onClick={() => handleSave(idx)}
                    >
                      Save
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
      cursor: "pointer"
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
    color: "#18202a",
    margin: 0,
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
  },
  card: {
    borderRadius: "18px",
    backgroundColor: "#fff",
    boxShadow: "0 8px 24px rgba(17,38,146,.08)",
    padding: "36px 32px 24px 32px",
    width: "100%",
    marginTop: "32px",
  },
  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0 0.5rem",
    fontSize: "18px",
  },
  th: {
    backgroundColor: "#171e2b",
    color: "white",
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
    fontSize: "17px",
    verticalAlign: "middle",
  },
  inputField: {
    width: "60px",
    padding: "7px",
    borderRadius: "7px",
    border: "1px solid #d3d3d3",
    fontSize: "15px",
    textAlign: "center",
  },
  saveBtn: {
    backgroundColor: "#ffc72c",
    color: "#222",
    border: "none",
    fontWeight: "600",
    borderRadius: "8px",
    padding: "10px 22px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

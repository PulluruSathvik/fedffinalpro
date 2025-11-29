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

const students = [
  { name: "John Doe", email: "john@example.com", group: "Group 1", status: "Active" },
  { name: "Jane Smith", email: "jane@example.com", group: "Group 2", status: "Active" },
  { name: "Mike Johnson", email: "mike@example.com", group: "Group 1", status: "Inactive" },
  { name: "Emily Davis", email: "emily@example.com", group: "Group 3", status: "Active" }
];

const ViewStudents = () => {
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
        <div style={styles.sidebarHeader}>Teacher Panel</div>
        {sidebarItems.map(item => (
          <SidebarItem
            key={item.label}
            {...item}
            active={item.route === "/view-students"}
            onClick={() => navigate(item.route)}
          />
        ))}
      </div>
      <main style={styles.contentArea}>
        <div style={styles.topBar}>
          <h1 style={styles.title}>View Students</h1>
          <button style={styles.logoutBtn} onClick={() => navigate("/login")}>Logout</button>
        </div>
        <div style={styles.card}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Full Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Group</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => (
                <tr key={i}>
                  <td style={{ ...styles.td, color: "#18202a" }}>{s.name}</td>
                  <td style={{ ...styles.td, color: "#18202a" }}>{s.email}</td>
                  <td style={{ ...styles.td, color: "#18202a" }}>{s.group}</td>
                  <td
                    style={{
                      ...styles.td,
                      color: s.status === "Active" ? "#22c55e" : "#dc2626",
                      fontWeight: 600
                    }}
                  >
                    {s.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
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
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: 18,
      padding: "15px 32px",
      fontSize: 18,
      userSelect: "none"
    }}
  >
    <i className={`fas ${icon}`} style={styles.sidebarIcon}></i>
    {label}
  </div>
);

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    width: "100vw",
    fontFamily: "Poppins, sans-serif",
    backgroundColor: "#f6f7f9"
  },
  sidebar: {
    width: 320,
    backgroundColor: "#18202a",
    paddingTop: 28,
    display: "flex",
    flexDirection: "column"
  },
  sidebarHeader: {
    fontWeight: "bold",
    fontSize: 28,
    color: "#ffc72c",
    paddingLeft: 28,
    marginBottom: 28
  },
  sidebarItem: {
    fontSize: 18,
    padding: "15px 32px",
    display: "flex",
    alignItems: "center",
    gap: 18,
    userSelect: "none"
  },
  sidebarIcon: {
    fontSize: 20,
    width: 24,
    minWidth: 24
  },
  contentArea: {
    flexGrow: 1,
    padding: "36px 50px"
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },
  title: {
    fontWeight: 700,
    fontSize: 40,
    color: "#18202a"
  },
  logoutBtn: {
    backgroundColor: "#ffc72c",
    color: "#222",
    borderRadius: 10,
    border: "none",
    fontWeight: 600,
    fontSize: 18,
    padding: "10px 28px",
    cursor: "pointer"
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    boxShadow: "0 8px 24px rgba(17,38,146,.08)",
    padding: "36px 32px 24px 32px",
    width: "100%",
    marginTop: 32
  },
  table: {
    width: "100%",
    borderCollapse: "separate"
  },
  th: {
    backgroundColor: "#171e2b",
    color: "#fff",
    fontWeight: 700,
    fontSize: 19,
    padding: "12px 16px",
    textAlign: "left"
  },
  td: {
    padding: "14px 16px",
    backgroundColor: "#fff",
    fontSize: 17,
    borderTop: "1px solid #f0f0f0"
  }
};

export default ViewStudents;

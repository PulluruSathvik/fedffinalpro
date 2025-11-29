import React, { useEffect, useState } from "react";
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

const StudentSettings = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "John Doe",
    email: "john@example.com",
    role: "student",
    newPassword: "",
    confirmPassword: "",
    notifEmail: true,
    notifSMS: false
  });

  useEffect(() => {
    // Load FontAwesome if needed
    if (!document.getElementById("fa-cdn")) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href =
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css";
      link.id = "fa-cdn";
      document.head.appendChild(link);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation and backend save logic here
    alert("Settings saved!");
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
            {...item}
            active={item.route === "/student-settings"}
            onClick={() => navigate(item.route)}
          />
        ))}
      </div>
      <div style={styles.content}>
        <div style={styles.topBar}>
          <h1 style={styles.title}>Settings</h1>
          <button style={styles.logoutBtn} onClick={() => navigate("/login")}>
            Logout
          </button>
        </div>
        <form style={styles.card} onSubmit={handleSubmit}>
          <h2 style={styles.heading}>Profile Settings</h2>
          <div style={styles.formGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              style={styles.input}
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              style={styles.input}
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Role</label>
            <select
              style={styles.input}
              name="role"
              value={form.role}
              onChange={handleChange}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>New Password</label>
            <input
              style={styles.input}
              type="password"
              name="newPassword"
              value={form.newPassword}
              placeholder="Enter new password"
              onChange={handleChange}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Confirm Password</label>
            <input
              style={styles.input}
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              placeholder="Confirm new password"
              onChange={handleChange}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Notifications</label>
            <div style={styles.checkboxRow}>
              <input
                type="checkbox"
                name="notifEmail"
                checked={form.notifEmail}
                onChange={handleChange}
              />
              <span style={styles.checkboxLabel}>Email Notifications</span>
              <input
                type="checkbox"
                name="notifSMS"
                checked={form.notifSMS}
                onChange={handleChange}
                style={{ marginLeft: 40 }}
              />
              <span style={styles.checkboxLabel}>SMS Notifications</span>
            </div>
          </div>
          <button type="submit" style={styles.button}>
            Save Changes
          </button>
        </form>
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
    padding: "36px 0 0 0",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  topBar: {
    width: "77%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px"
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
    boxShadow: "0 8px 24px rgba(17,38,146,.10)",
    padding: "44px 40px 36px 40px",
    width: "55vw",
    minWidth: "350px",
    maxWidth: "800px",
    display: "flex",
    flexDirection: "column",
    margin: "auto"
  },
  heading: {
    color: "#ffc72c",
    fontSize: "2rem",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 36,
    marginTop: 0
  },
  formGroup: {
    marginBottom: 23,
    display: "flex",
    flexDirection: "column"
  },
  label: {
    fontWeight: "700",
    fontSize: "1.15rem",
    marginBottom: 8
  },
  input: {
    border: "1px solid #ccc",
    borderRadius: 7,
    padding: "13px 16px",
    fontSize: 17,
    marginBottom: 0,
    outline: "none"
  },
  checkboxRow: {
    display: "flex",
    alignItems: "center",
    marginTop: 7
  },
  checkboxLabel: {
    fontSize: "1.06rem",
    marginLeft: 9,
    marginRight: 14,
    color: "#222"
  },
  button: {
    marginTop: 24,
    padding: "15px 0",
    background: "#ffc72c",
    color: "#131b2b",
    fontWeight: 700,
    fontSize: "22px",
    borderRadius: "9px",
    border: "none",
    width: "100%",
    cursor: "pointer"
  }
};

export default StudentSettings;

import React, { useState, useEffect } from "react";
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



const TProfile = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "John Doe",
    email: "john@example.com",
    department: "Computer Science",
    phone: "+91 9876543210"
  });

  useEffect(() => {
    // load FontAwesome
    if (!document.getElementById("fa-cdn")) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css";
      link.id = "fa-cdn";
      document.head.appendChild(link);
    }
  }, []);

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev, [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated!");
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}><span style={{ color: "#ffc72c" }}>Teacher Panel</span></div>
        {sidebarItems.map(item => (
          <SidebarItem
            key={item.label}
            {...item}
            active={item.route === "/tprofile"}
            onClick={() => navigate(item.route)}
          />
        ))}
      </div>
      <div style={styles.contentArea}>
        <div style={styles.topBar}>
          <h1 style={styles.title}>Profile</h1>
          <button style={styles.logoutBtn} onClick={() => navigate("/login")}>Logout</button>
        </div>
        <form style={styles.profileCard} onSubmit={handleSubmit}>
          <h2 style={styles.profileHeading}>Teacher Profile</h2>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              style={styles.input}
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              style={styles.input}
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Department</label>
            <input
              style={styles.input}
              type="text"
              name="department"
              value={form.department}
              onChange={handleChange}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Phone Number</label>
            <input
              style={styles.input}
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </div>
          <button type="submit" style={styles.updateBtn}>Update Profile</button>
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
    background: "#f6f7f9",
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
    fontWeight: 700,
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
    padding: "36px 0 0 0",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  topBar: {
    width: "77%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "14px"
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
  profileCard: {
    background: "#fff",
    borderRadius: "18px",
    width: "520px",
    padding: "42px 32px 32px 32px",
    boxShadow: "0 8px 24px rgba(17,38,146,.10)",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch"
  },
  profileHeading: {
    fontWeight: 700,
    fontSize: "2rem",
    color: "#172133",
    margin: "0 0 36px 0",
    textAlign: "center"
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 23
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
    outline: "none"
  },
  updateBtn: {
    background: "#ffc72c",
    color: "#171e2b",
    border: "none",
    borderRadius: "10px",
    fontWeight: 700,
    fontSize: "22px",
    padding: "14px",
    marginTop: "22px",
    cursor: "pointer"
  }
};

export default TProfile;

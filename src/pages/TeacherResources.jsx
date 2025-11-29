import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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

const TeacherResources = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [resources, setResources] = useState([
    { title: "Lecture Notes: HTML & CSS" },
    { title: "Sample Project Code" },
    { title: "Tutorial Video: JavaScript Basics" }
  ]);
  const [formData, setFormData] = useState({ title: "", description: "", file: null });
  const [uploadedFilename, setUploadedFilename] = useState("");

  useEffect(() => {
    if (!document.getElementById("fa-cdn")) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css";
      link.id = "fa-cdn";
      document.head.appendChild(link);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      const file = files[0];
      setFormData(prev => ({ ...prev, file }));
      setUploadedFilename(file ? file.name : "");
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert("Please provide a resource title.");
      return;
    }
    if (!formData.file) {
      alert("Please select a file to upload.");
      return;
    }
    // Simulate upload process
    alert(`Uploading "${formData.title}" ...`);
    setTimeout(() => {
      setResources(prev => [...prev, { title: formData.title }]);
      setFormData({ title: "", description: "", file: null });
      setUploadedFilename("");
      alert("Resource uploaded successfully!");
    }, 1000);
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>Teacher Panel</div>
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.route}
            {...item}
            active={location.pathname === item.route}
            onClick={() => navigate(item.route)}
          />
        ))}
      </div>

      {/* Main Content */}
      <main style={styles.mainContent}>
        <header style={styles.header}>
          <h1 style={{ ...styles.pageTitle, color: "#18202a" }}>Upload Course Materials</h1>
          <button style={styles.logoutBtn} onClick={() => navigate("/login")}>Logout</button>
        </header>

        {/* Upload Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={{ ...styles.formTitle, color: "#18202a" }}>Add New Resource</h2>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Resource Title"
            style={styles.input}
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            rows={3}
            style={styles.textarea}
          />
          <div style={{ marginTop: 20, marginBottom: 20 }}>
            <input
              type="file"
              name="file"
              onChange={handleChange}
              required
              style={styles.fileInput}
            />
            {uploadedFilename && (
              <div style={{ marginTop: 8, fontSize: 14, color: "#555" }}>Selected file: {uploadedFilename}</div>
            )}
          </div>
          <button type="submit" style={styles.uploadBtn}>Upload Resource</button>
        </form>

        {/* Uploaded Resources List */}
        <section style={styles.uploadedSection}>
          <h3 style={{ ...styles.uploadedTitle, color: "#18202a" }}>Uploaded Resources</h3>
          {resources.length === 0 ? (
            <p style={{ color: "#555" }}>No resources uploaded yet.</p>
          ) : (
            resources.map((res, idx) => (
              <div key={idx} style={styles.resourceItem}>
                <div>
                  <div style={{ ...styles.resourceTitle, color: "#18202a" }}>{res.title}</div>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <a
                    href="#"
                    style={styles.downloadLink}
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="fas fa-download" style={{ marginRight: 8 }} /> Download
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.downloadLink}
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="fas fa-eye" style={{ marginRight: 8 }} /> View
                  </a>
                </div>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
};

const SidebarItem = ({ label, icon, active, onClick }) => (
  <div
    onClick={onClick}
    style={{
      ...styles.sidebarItem,
      backgroundColor: active ? "#ffc72c" : "transparent",
      color: active ? "#18202a" : "#fff",
      transition: "background-color 0.3s, color 0.3s",
    }}
    role="button"
    tabIndex={0}
    onKeyPress={(e) => {
      if (e.key === "Enter" || e.key === " ") onClick();
    }}
  >
    <i className={`fas ${icon}`} style={styles.sidebarIcon} aria-hidden="true"></i>
    <span>{label}</span>
  </div>
);

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    fontFamily: "'Poppins', sans-serif",
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
    cursor: "pointer",
    userSelect: "none"
  },
  sidebarIcon: {
    fontSize: 20,
    width: 24,
    minWidth: 24
  },
  mainContent: {
    padding: "36px 50px",
    flexGrow: 1,
    overflowY: "auto"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },
  pageTitle: {
    fontWeight: 700,
    fontSize: 40,
  },
  logoutBtn: {
    backgroundColor: "#ffc72c",
    padding: "10px 28px",
    borderRadius: 10,
    fontSize: 18,
    fontWeight: 600,
    border: "none",
    cursor: "pointer",
  },
  form: {
    backgroundColor: "#fff",
    borderRadius: 18,
    boxShadow: "0 8px 24px rgba(17,38,146,.10)",
    padding: 40,
    maxWidth: 640,
    display: "flex",
    flexDirection: "column",
    marginBottom: 34
  },
  formTitle: {
    fontSize: 22,
    fontWeight: 600,
    marginBottom: 24
  },
  input: {
    padding: "12px 16px",
    borderRadius: 7,
    border: "1px solid #ccc",
    fontSize: 16,
    marginBottom: 20,
    outline: "none",
    color: "#18202a",
    backgroundColor: "#fff",
  },
  textarea: {
    padding: "12px 16px",
    borderRadius: 7,
    border: "1px solid #ccc",
    fontSize: 16,
    marginBottom: 20,
    outline: "none",
    color: "#18202a",
    backgroundColor: "#fff",
    resize: "vertical",
  },
  fileInput: {
    fontSize: 16,
    color: "#18202a",
  },
  uploadBtn: {
    width: 160,
    padding: "10px 12px",
    borderRadius: 8,
    fontWeight: 700,
    fontSize: 18,
    border: "none",
    backgroundColor: "#ffc72c",
    cursor: "pointer",
    alignSelf: "flex-start"
  },
  uploadedSection: {
    maxWidth: 640
  },
  uploadedTitle: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 20
  },
  resourceItem: {
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    padding: "12px 20px",
    marginBottom: 16,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  resourceTitle: {
    fontWeight: 600,
    fontSize: 18,
  },
  downloadLink: {
    color: "#3b82f6",
    fontWeight: 700,
    textDecoration: "none",
    fontSize: 16,
    display: "flex",
    alignItems: "center",
    gap: 8,
    cursor: "pointer"
  }
};

export default TeacherResources;

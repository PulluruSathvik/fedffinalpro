import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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

const userInfo = {
  name: "John Doe",
  email: "john@example.com",
  course: "Computer Science",
  date: "21 September 2025"
};

const projectsData = [
  { name: "AI Chatbot", group: "Group 1", status: "Completed", progress: 100 },
  { name: "Web Portal", group: "Group 2", status: "In Progress", progress: 60 }
];

const assignmentsData = [
  { name: "Design Document", project: "AI Chatbot", due: "2025-09-28", status: "Submitted", marks: "95 / 100", progress: 100 },
  { name: "Prototype", project: "Web Portal", due: "2025-10-05", status: "Pending", marks: "-", progress: 40 }
];

const milestonesData = [
  { name: "Design Document", project: "AI Chatbot", due: "2025-09-28", status: "Completed" },
  { name: "Prototype", project: "Web Portal", due: "2025-10-05", status: "Pending" }
];

const StudentReport = () => {
  const navigate = useNavigate();
  const reportRef = useRef();

  useEffect(() => {
    if (!document.getElementById("fa-cdn")) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css";
      link.id = "fa-cdn";
      document.head.appendChild(link);
    }
  }, []);

  const ProgressBar = ({ value }) => (
    <div style={styles.progressBarBackground}>
      <div style={{
        ...styles.progressBarFill,
        width: `${value}%`,
        backgroundColor: value === 100 ? "#22c55e" : "#ffc72c"
      }}>
        {value}%
      </div>
      <div style={{ ...styles.progressBarEmpty, width: `${100 - value}%` }}></div>
    </div>
  );

  const downloadReport = () => {
    if (!reportRef.current) return;
    html2canvas(reportRef.current, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("progress_report.pdf");
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <span style={{ color: "#ffc72c" }}>Student Panel</span>
        </div>
        {sidebarItems.map(item => (
          <SidebarItem
            key={item.route}
            icon={item.icon}
            label={item.label}
            active={item.route === "/student-report"}
            onClick={() => navigate(item.route)}
          />
        ))}
      </div>
      <div style={styles.contentArea}>
        <div style={styles.topBar}>
          <h1 style={styles.title}>Progress Report</h1>
          <button style={styles.logoutBtn} onClick={() => navigate("/login")}>Logout</button>
        </div>
        <div style={styles.reportCard} ref={reportRef}>
          <div style={styles.userInfo}>
            <div><strong>Email:</strong> <span style={{ color: "#18202a" }}>{userInfo.email}</span></div>
            <div><strong>Course:</strong> <span style={{ color: "#18202a" }}>{userInfo.course}</span></div>
            <div><strong>Date:</strong> <span style={{ color: "#18202a" }}>{userInfo.date}</span></div>
          </div>
          <h2 style={styles.sectionTitle}>{userInfo.name}</h2>
          <Section title="Projects" data={projectsData} columns={["name", "group", "status", "progress"]}
            renderRow={project => (
              <>
                <td style={styles.td}>{project.name}</td>
                <td style={styles.td}>{project.group}</td>
                <td style={{ ...styles.td, color: project.status === "Completed" ? "#22c55e" : "#eab308", fontWeight: "bold" }}>{project.status}</td>
                <td style={styles.td}><ProgressBar value={project.progress} /></td>
              </>
            )}
          />
          <Section title="Assignments" data={assignmentsData} columns={["name", "project", "due", "status", "marks", "progress"]}
            renderRow={assignment => (
              <>
                <td style={styles.td}>{assignment.name}</td>
                <td style={styles.td}>{assignment.project}</td>
                <td style={styles.td}>{assignment.due}</td>
                <td style={{ ...styles.td, color: assignment.status === "Submitted" ? "#22c55e" : "#eab308", fontWeight: "bold" }}>{assignment.status}</td>
                <td style={styles.td}>{assignment.marks}</td>
                <td style={styles.td}><ProgressBar value={assignment.progress} /></td>
              </>
            )}
          />
          <Section title="Milestones" data={milestonesData} columns={["name", "project", "due", "status"]}
            renderRow={milestone => (
              <>
                <td style={styles.td}>{milestone.name}</td>
                <td style={styles.td}>{milestone.project}</td>
                <td style={styles.td}>{milestone.due}</td>
                <td style={{ ...styles.td, color: milestone.status === "Completed" ? "#22c55e" : "#eab308", fontWeight: "bold" }}>{milestone.status}</td>
              </>
            )}
          />
        </div>
        <div style={{ textAlign: "center", marginTop: 32 }}>
          <button style={styles.printBtn} onClick={downloadReport}>Download Report</button>
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, data, columns, renderRow }) => (
  <>
    <h3 style={styles.subSectionTitle}>{title}</h3>
    <table style={styles.table}>
      <thead>
        <tr>{columns.map(col => <th key={col} style={styles.th}>{col.charAt(0).toUpperCase()+col.slice(1)}</th>)}</tr>
      </thead>
      <tbody>{data.map(item => <tr key={item.name}>{renderRow(item)}</tr>)}</tbody>
    </table>
  </>
);

const SidebarItem = ({ icon, label, active, onClick }) => (
  <div
    onClick={onClick}
    style={{
      backgroundColor: active ? "#ffc72c" : "transparent",
      color: active ? "#18202a" : "#fff",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: 18,
      padding: "15px 32px",
      fontSize: 18,
      userSelect: "none",
    }}
  >
    <i className={`fas ${icon}`} style={{ fontSize: 20, width: 24, minWidth: 24 }} />
    <span>{label}</span>
  </div>
);

const styles = {
  container: { display: "flex", minHeight: "100vh", width: "100vw", fontFamily: "Poppins, sans-serif", backgroundColor: "#f6f7f9" },
  sidebar: { width: 320, backgroundColor: "#18202a", paddingTop: 28, display: "flex", flexDirection: "column" },
  sidebarHeader: { fontWeight: "bold", fontSize: 28, color: "#ffc72c", paddingLeft: 28, marginBottom: 28 },
  contentArea: { flexGrow: 1, padding: "36px 50px", overflowY: "auto" },
  topBar: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 },
  title: { fontWeight: 700, fontSize: 40, color: "#18202a", margin: 0 },
  logoutBtn: { backgroundColor: "#ffc72c", color: "#222", border: "none", borderRadius: 10, padding: "10px 28px", fontWeight: 600, fontSize: 18, cursor: "pointer" },
  reportCard: { backgroundColor: "#fff", borderRadius: 16, boxShadow: "0 8px 24px rgba(17,38,146,.08)", padding: 36, marginTop: 18 },
  userInfo: { marginBottom: 18, fontSize: 17, lineHeight: 1.4, color: "#18202a" },
  sectionTitle: { fontSize: 32, fontWeight: "bold", textAlign: "center", marginBottom: 32, marginTop: 0, color: "#ffc72c" },
  subSectionTitle: { fontSize: 24, fontWeight: 700, textAlign: "center", margin: "34px 0 16px 0", color: "#ffc72c" },
  table: { width: "100%", borderCollapse: "separate", borderSpacing: "0 0.5rem", marginBottom: 12 },
  th: { backgroundColor: "#171e2b", color: "#fff", fontWeight: 700, fontSize: 18, padding: "13px 16px", textAlign: "left" },
  td: { backgroundColor: "#fff", padding: "14px 16px", fontSize: 17, borderTop: "1px solid #f0f0f0", color: "#18202a" },
  printBtn: { backgroundColor: "#ffc72c", color: "#131b2b", fontWeight: 700, fontSize: 22, borderRadius: 11, border: "none", padding: "16px 54px", cursor: "pointer", marginTop: 10, display: "block", marginLeft: "auto", marginRight: "auto" },
  progressBarBackground: { height: 20, width: 160, borderRadius: 10, backgroundColor: "#ececec", overflow: "hidden", display: "flex" },
  progressBarFill: { height: 20, borderRadius: 10, fontWeight: 700, fontSize: 15, paddingLeft: 5, paddingRight: 5, display: "flex", alignItems: "center", color: "white" },
  progressBarEmpty: { height: 20, borderRadius: 10, color: "transparent", fontWeight: 700, fontSize: 15 },
};

export default StudentReport;

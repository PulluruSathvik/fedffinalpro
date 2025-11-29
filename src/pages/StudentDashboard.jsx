import React from "react";
import { useNavigate } from "react-router-dom";

// Background gradient blobs for soft visual interest
function GradientBlobs() {
  return (
    <>
      <div style={{
        position: "fixed",
        top: -180, left: -110, width: 420, height: 420,
        borderRadius: "50%",
        background: "radial-gradient(circle, #ffc72c66 60%, #ffdd60 100%)",
        filter: "blur(90px)",
        zIndex: 0, opacity: 0.68, pointerEvents: "none"
      }} />
      <div style={{
        position: "fixed",
        bottom: -140, right: -100,
        width: 340, height: 360,
        borderRadius: "48% 52% 50% 50% / 60% 60% 40% 40%",
        background: "radial-gradient(circle, #077fff44 45%, #18202aaa 90%)",
        filter: "blur(60px)",
        zIndex: 0, opacity: 0.53, pointerEvents: "none"
      }} />
    </>
  );
}

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

const cards = [
  {
    icon: "fa-folder", title: "My Projects",
    content: "Check your assigned projects and manage submissions.",
    buttonLabel: "View Projects", link: "/student-projects"
  },
  {
    icon: "fa-list-check", title: "Assignments",
    content: "Submit assignments and track deadlines easily.",
    buttonLabel: "View Assignments", link: "/student-assignments"
  },
  {
    icon: "fa-flag", title: "Milestones",
    content: "Track progress milestones for your ongoing projects.",
    buttonLabel: "Track Milestones", link: "/student-milestones"
  },
  {
    icon: "fa-file-alt", title: "Progress Report",
    content: "Download and review your performance reports.",
    buttonLabel: "View Report", link: "/student-report"
  },
  {
    icon: "fa-folder-open", title: "Resources",
    content: "Access study materials, references, and resources.",
    buttonLabel: "Open Resources", link: "/student-resources"
  },
  {
    icon: "fa-cog", title: "Settings",
    content: "Update your profile, password, and preferences.",
    buttonLabel: "Update Settings", link: "/student-settings"
  }
];

const glassBg = "rgba(255,255,255,0.68)";
const blurEffect = "blur(14px)";

const StudentDashboard = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    // FontAwesome
    if (!document.getElementById("fa-cdn")) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css";
      link.id = "fa-cdn";
      document.head.appendChild(link);
    }
    // Global page styling
    document.documentElement.style.height = "100%";
    document.body.style.height = "100%";
    document.body.style.margin = "0";
    document.body.style.minHeight = "100vh";
    document.body.style.fontFamily = "Poppins, sans-serif";
    document.body.style.backgroundColor = "#f6f7f9";
    return () => {
      document.documentElement.style.height = "";
      document.body.style.height = "";
      document.body.style.margin = "";
      document.body.style.minHeight = "";
      document.body.style.fontFamily = "";
      document.body.style.backgroundColor = "";
    };
  }, []);

  const [activeRoute, setActiveRoute] = React.useState("/student-dashboard");

  return (
    <div style={styles.container}>
      <GradientBlobs />
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <i className="fas fa-user-graduate" style={{ color: "#ffc72c", marginRight: 11, fontSize: 28 }}/>
          <span style={{ color: "#ffc72c" }}>Student Panel</span>
        </div>
        {sidebarItems.map(({ icon, label, route }) => (
          <SidebarItem
            key={label}
            icon={icon}
            label={label}
            active={route === activeRoute}
            onClick={() => {
              setActiveRoute(route);
              navigate(route);
            }}
          />
        ))}
      </div>
      {/* Main Content */}
      <div style={styles.main}>
        <div style={styles.topBar}>
          <h1 style={styles.title}>Student Dashboard</h1>
          <button
            style={styles.logoutBtn}
            onClick={() => {
              setActiveRoute("/login");
              navigate("/login");
            }}>
            <i className="fas fa-sign-out-alt" style={{ marginRight: 11 }} />
            Logout
          </button>
        </div>
        <div style={styles.cardGrid}>
          {cards.map((card) => (
            <DashboardCard key={card.title} {...card} onClick={() => { setActiveRoute(card.link); navigate(card.link); }} />
          ))}
        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, onClick, active }) => (
  <div
    style={{
      ...styles.sidebarItem,
      background: active
        ? "linear-gradient(90deg, #ffe4b4 70%, #ffc72c 100%)"
        : "transparent",
      color: active ? "#18202a" : "#fff",
      boxShadow: active ? "0 0 7px #ffc72c" : "none",
      fontWeight: active ? 700 : 400,
      letterSpacing: ".04em",
      transition: "all .15s cubic-bezier(.31,.8,.4,.97)"
    }}
    onClick={onClick}
    tabIndex={0}
    title={label}
    aria-label={label}
  >
    <i className={`fas ${icon}`}
      style={{
        ...styles.sidebarIcon,
        color: active ? "#ffc72c" : "#fff",
        filter: active ? "drop-shadow(0 0 8px #ffe066cc)" : "none"
      }}
    />
    <span>{label}</span>
  </div>
);

const DashboardCard = ({ icon, title, content, buttonLabel, onClick }) => (
  <div
    style={{
      ...styles.card,
      boxShadow: "0 10px 32px #93c5fd22",
      border: "1.3px solid #e3e4e4cc",
      transition: "transform .23s, box-shadow .19s",
    }}
    onMouseOver={e => {
      e.currentTarget.style.transform = "translateY(-8px) scale(1.04)";
      e.currentTarget.style.boxShadow = "0 17px 38px #ffc3442a";
    }}
    onMouseOut={e => {
      e.currentTarget.style.transform = "";
      e.currentTarget.style.boxShadow = "0 10px 32px #93c5fd22";
    }}
    tabIndex={0}
  >
    <div style={styles.cardHeader}>
      <i className={`fas ${icon}`} style={styles.cardIcon}></i>
      <span style={styles.cardTitle}>{title}</span>
    </div>
    <div style={styles.cardContent}>{content}</div>
    <button style={styles.cardButton} onClick={onClick}>
      <i className="fas fa-arrow-right" style={{ marginRight: 11 }} />
      {buttonLabel}
    </button>
  </div>
);

const styles = {
  container: {
    display: "flex",
    width: "100vw",
    height: "100vh",
    background: "linear-gradient(117deg,#f6f7f9 80%,#fcf8ed 100%)",
    fontFamily: "Poppins, sans-serif",
    overflow: "hidden"
  },
  sidebar: {
    width: "320px",
    background: "linear-gradient(180deg, #171e2b 0%, #25303c 100%)",
    display: "flex",
    flexDirection: "column",
    paddingTop: 28,
    boxShadow: "4px 0 12px #232b3259",
    zIndex: 2
  },
  sidebarHeader: {
    fontWeight: "bold",
    fontSize: 27,
    marginBottom: 28,
    color: "#ffc72c",
    paddingLeft: 28,
    paddingBottom: 12,
    display: "flex",
    alignItems: "center",
    letterSpacing: ".04em"
  },
  sidebarItem: {
    display: "flex",
    alignItems: "center",
    padding: "15px 28px",
    color: "#fff",
    fontSize: "18px",
    cursor: "pointer",
    gap: "20px",
    userSelect: "none",
    borderRadius: "8px",
    margin: "7px 15px 7px 15px",
  },
  sidebarIcon: {
    color: "#fff",
    fontSize: "21px",
    minWidth: "24px",
    textShadow: "0 2px 4px #ffc72c23",
    transition: "color .22s"
  },
  main: {
    flex: 1,
    padding: "36px 54px 30px 54px",
    overflowY: "auto",
    minHeight: 0,
    minWidth: 320,
    position: "relative"
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 36
  },
  title: {
    fontSize: "40px",
    fontWeight: 800,
    margin: 0,
    letterSpacing: ".07em",
    color: "#18202a",
    textShadow: "0 2px 5px #e5e7eb66"
  },
  logoutBtn: {
    padding: "11px 32px",
    background: "linear-gradient(90deg,#ffd951 10%,#fcc72c 100%)",
    border: "none",
    borderRadius: "12px",
    fontWeight: 700,
    color: "#222",
    fontSize: "18px",
    cursor: "pointer",
    boxShadow: "0 4px 10px #ffc72c70",
    transition: "background-color .16s"
  },
  cardGrid: {
    marginTop: "30px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
    gap: "32px"
  },
  card: {
    background: glassBg,
    borderRadius: "18px",
    padding: "35px 28px 20px 28px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    minWidth: "290px",
    boxShadow: "0 8px 32px #93c5fd22",
    backdropFilter: blurEffect
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    fontSize: "24px",
    fontWeight: 700
  },
  cardIcon: {
    color: "#ffc72c",
    fontSize: "27px",
    filter: "drop-shadow(0 0 12px #ffc72c80)"
  },
  cardTitle: {
    color: "#18202a"
  },
  cardContent: {
    fontSize: "16.5px",
    color: "#5f6368"
  },
  cardButton: {
    marginTop: "14px",
    padding: "12px 0",
    width: "64%",
    alignSelf: "flex-start",
    background: "linear-gradient(90deg,#ffc72c,#ffe8a3)",
    color: "#222",
    fontWeight: 700,
    border: "none",
    borderRadius: "9px",
    fontSize: "17px",
    cursor: "pointer",
    boxShadow: "0 2px 10px #ffd75c33",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    letterSpacing: ".04em",
    transition: "background .16s"
  }
};

export default StudentDashboard;

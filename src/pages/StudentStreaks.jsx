// src/pages/StudentStreaks.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateDailyStreak, getStreakData } from "../utils/streakUtils";

// sidebar with Streaks
const sidebarItems = [
  { icon: "fa-home", label: "Dashboard", route: "/student-dashboard" },
  { icon: "fa-bolt", label: "Streaks", route: "/student-streaks" },
  { icon: "fa-users", label: "My Group", route: "/student-group" },
  { icon: "fa-folder", label: "My Projects", route: "/student-projects" },
  { icon: "fa-list-check", label: "Assignments", route: "/student-assignments" },
  { icon: "fa-flag", label: "Milestones", route: "/student-milestones" },
  { icon: "fa-file-alt", label: "Progress Report", route: "/student-report" },
  { icon: "fa-folder-open", label: "Resources", route: "/student-resources" },
  { icon: "fa-cog", label: "Settings", route: "/student-settings" },
  { icon: "fa-sign-out-alt", label: "Logout", route: "/login" }
];

// badge definitions with required streak days
const BADGE_TIERS = [
  { days: 3,  name: "3-Day Starter" },
  { days: 7,  name: "1-Week Hero" },
  { days: 14, name: "2-Week Grinder" },
  { days: 30, name: "30-Day Legend" }
];

export default function StudentStreaks() {
  const navigate = useNavigate();
  const studentId = "demo-student-1"; // later replace with real logged-in id

  const [streakData, setStreakData] = useState(() => getStreakData(studentId));

  useEffect(() => {
    if (!document.getElementById("fa-cdn")) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css";
      link.id = "fa-cdn";
      document.head.appendChild(link);
    }
    const updated = updateDailyStreak(studentId);
    setStreakData(updated);
  }, [studentId]);

  const handleWorkedToday = () => {
    const updated = updateDailyStreak(studentId);
    setStreakData(updated);
  };

  // find next badge and progress toward it
  const current = streakData.currentStreak || 0;
  const nextBadge = BADGE_TIERS.find(b => current < b.days);
  const progressPercent = nextBadge
    ? Math.min(100, Math.round((current / nextBadge.days) * 100))
    : 100;

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <span style={{ color: "#ffc72c" }}>Student Panel</span>
        </div>
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            active={item.route === "/student-streaks"}
            onClick={() => navigate(item.route)}
          />
        ))}
      </div>

      {/* Content */}
      <div style={styles.contentArea}>
        <div style={styles.topRow}>
          <h1 style={styles.title}>Daily Streaks</h1>
          <button style={styles.logoutBtn} onClick={() => navigate("/login")}>
            Logout
          </button>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Your Work Streak</h2>

          {/* stats row */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "28px", marginBottom: "18px" }}>
            <StatBox
              label="Current streak"
              value={`${current} day${current === 1 ? "" : "s"}`}
              color="#16a34a"
              icon="fa-fire"
            />
            <StatBox
              label="Best streak"
              value={`${streakData.bestStreak || 0} days`}
              color="#0ea5e9"
              icon="fa-trophy"
            />
            <StatBox
              label="Last active"
              value={streakData.lastActiveDate || "No activity yet"}
              color="#f97316"
              icon="fa-calendar-day"
            />
          </div>

          {/* worked today button */}
          <button
            style={{ ...styles.primaryBtn, marginBottom: "20px" }}
            onClick={handleWorkedToday}
          >
            <i className="fas fa-check" style={{ marginRight: 10 }} />
            I worked on my project today
          </button>

          {/* progress to next badge */}
          <div style={{ marginBottom: "26px" }}>
            {nextBadge ? (
              <>
                <p style={{ fontSize: 16, color: "#4b5563", marginBottom: 6 }}>
                  Only <strong>{nextBadge.days - current}</strong> more day
                  {nextBadge.days - current === 1 ? "" : "s"} to unlock{" "}
                  <strong>{nextBadge.name}</strong> badge!
                </p>
                <div style={styles.progressOuter}>
                  <div
                    style={{
                      ...styles.progressInner,
                      width: `${progressPercent}%`
                    }}
                  />
                </div>
              </>
            ) : (
              <p style={{ fontSize: 16, color: "#4b5563" }}>
                You have unlocked all available streak badges. Keep the streak alive!
              </p>
            )}
          </div>

          {/* unlocked badges chips */}
          <h3 style={{ fontSize: "22px", marginBottom: "10px", color: "#18202a" }}>
            Badges unlocked
          </h3>
          {streakData.badges && streakData.badges.length > 0 ? (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "24px" }}>
              {streakData.badges.map((badge) => (
                <span
                  key={badge}
                  style={styles.badgeChip}
                >
                  <i className="fas fa-medal" />
                  {badge}
                </span>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: 15, color: "#6b7280", marginBottom: "24px" }}>
              No badges yet. Reach 3, 7, 14 and 30 day streaks to unlock all streak badges.
            </p>
          )}

          {/* badge table explaining requirements */}
          <h3 style={{ fontSize: "22px", marginBottom: "14px", color: "#18202a" }}>
            Streak badge levels
          </h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Badge</th>
                <th style={styles.th}>Required streak (days)</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {BADGE_TIERS.map((b) => {
                const unlocked = current >= b.days;
                return (
                  <tr key={b.days}>
                    <td style={styles.td}>{b.name}</td>
                    <td style={styles.td}>{b.days}</td>
                    <td style={styles.td}>
                      <span
                        style={{
                          padding: "4px 10px",
                          borderRadius: "999px",
                          backgroundColor: unlocked ? "#dcfce7" : "#fef3c7",
                          color: unlocked ? "#166534" : "#92400e",
                          fontWeight: 600,
                          fontSize: 14
                        }}
                      >
                        {unlocked ? "Unlocked" : "Locked"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// small stat card
function StatBox({ label, value, color, icon }) {
  return (
    <div
      style={{
        minWidth: 180,
        padding: "12px 16px",
        borderRadius: 14,
        background: "#f9fafb",
        border: "1px solid #e5e7eb",
        display: "flex",
        alignItems: "center",
        gap: 14
      }}
    >
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: "999px",
          backgroundColor: "#111827",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color
        }}
      >
        <i className={`fas ${icon}`} />
      </div>
      <div>
        <div style={{ fontSize: 13, color: "#6b7280" }}>{label}</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: "#111827" }}>{value}</div>
      </div>
    </div>
  );
}

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
    fontFamily: "Poppins, sans-serif"
  },
  sidebar: {
    width: "320px",
    backgroundColor: "#18202a",
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
    userSelect: "none",
    color: "#fff",
    background: "transparent"
  },
  sidebarIcon: {
    fontSize: "20px",
    width: "24px",
    minWidth: "24px"
  },
  contentArea: {
    flexGrow: 1,
    padding: "36px 50px",
    overflowY: "auto"
  },
  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "14px"
  },
  title: {
    fontWeight: 700,
    fontSize: "40px",
    color: "#18202a",
    margin: 0
  },
  logoutBtn: {
    background: "#ffc72c",
    color: "#18202a",
    border: "none",
    borderRadius: "10px",
    padding: "10px 28px",
    fontWeight: 600,
    fontSize: "18px",
    cursor: "pointer"
  },
  primaryBtn: {
    background: "#22c55e",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "10px 26px",
    fontWeight: 600,
    fontSize: "17px",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center"
  },
  card: {
    background: "#fff",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(17,38,146,.08)",
    padding: "36px 32px 24px 32px",
    marginTop: "18px"
  },
  cardTitle: {
    fontSize: "2rem",
    fontWeight: 700,
    color: "#18202a",
    marginBottom: "18px",
    marginTop: 0
  },
  progressOuter: {
    width: "100%",
    height: 14,
    borderRadius: 999,
    backgroundColor: "#e5e7eb",
    overflow: "hidden"
  },
  progressInner: {
    height: "100%",
    background: "linear-gradient(90deg,#22c55e,#4ade80)",
    borderRadius: 999,
    transition: "width .3s ease"
  },
  badgeChip: {
    padding: "6px 14px",
    borderRadius: "999px",
    background: "#e0f2fe",
    color: "#0369a1",
    fontWeight: 600,
    fontSize: "14px",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px"
  },
  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0 0.5rem"
  },
  th: {
    backgroundColor: "#171e2b",
    color: "#fff",
    fontWeight: 700,
    fontSize: "18px",
    padding: "13px 16px",
    textAlign: "left"
  },
  td: {
    padding: "14px 16px",
    backgroundColor: "#fff",
    borderTop: "1px solid #f0f0f0",
    fontSize: "17px",
    color: "#18202a"
  }
};

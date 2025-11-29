import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const studentBg = "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1350&q=80";
const teacherBg = "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1350&q=80";

const Login = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState("roleSelection");
  const [selectedRole, setSelectedRole] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.documentElement.style.height = "100%";
    document.body.style.height = "100%";
    document.body.style.margin = "0";
    return () => {
      document.documentElement.style.height = "";
      document.body.style.height = "";
      document.body.style.margin = "";
    };
  }, []);

  const selectRole = (role) => {
    setSelectedRole(role);
    setStep("loginForm");
    setEmail("");
    setPassword("");
  };

  const backToRoleSelect = () => {
    setSelectedRole(null);
    setStep("roleSelection");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      (selectedRole === "student" && email === "student@test.com" && password === "1234") ||
      (selectedRole === "teacher" && email === "teacher@test.com" && password === "1234")
    ) {
      alert("Login successful!");
      selectedRole === "student" ? navigate("/student-dashboard") : navigate("/tdashboard");
    } else {
      alert("Invalid credentials.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftSide}>
        <h2 style={styles.roleSelectTitle}>Select Your Role</h2>
        <div style={styles.roleCards}>
          <div
            style={{
              ...styles.card,
              backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${studentBg})`,
              boxShadow: selectedRole === "student" ? "0 0 20px #ffc72c" : "none",
            }}
            role="button"
            tabIndex={0}
            onClick={() => selectRole("student")}
            onKeyDown={(e) => e.key === "Enter" && selectRole("student")}
            aria-label="Select Student role"
          >
            <i className="fas fa-user-graduate" style={styles.icon}></i>
            <span style={styles.cardLabel}>Student</span>
          </div>
          <div
            style={{
              ...styles.card,
              backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${teacherBg})`,
              boxShadow: selectedRole === "teacher" ? "0 0 20px #ffc72c" : "none",
            }}
            role="button"
            tabIndex={0}
            onClick={() => selectRole("teacher")}
            onKeyDown={(e) => e.key === "Enter" && selectRole("teacher")}
            aria-label="Select Teacher role"
          >
            <i className="fas fa-chalkboard-teacher" style={styles.icon}></i>
            <span style={styles.cardLabel}>Teacher</span>
          </div>
        </div>
      </div>
      <div
        style={{
          ...styles.rightSide,
          backgroundImage:
            selectedRole === "student"
              ? `linear-gradient(rgba(255, 199, 44, 0.85), rgba(255, 199, 44, 0.85)), url(${studentBg})`
              : selectedRole === "teacher"
              ? `linear-gradient(rgba(40, 47, 63, 0.85), rgba(40, 47, 63, 0.85)), url(${teacherBg})`
              : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "background-image 0.6s ease",
          color: selectedRole === "teacher" ? "#fff" : "#222",
        }}
      >
        {selectedRole ? (
          <form style={styles.form} onSubmit={handleSubmit} noValidate>
            <h2 style={{ ...styles.formTitle, color: selectedRole === "teacher" ? "#ffc72c" : "#222" }}>
              {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} Login
            </h2>
            <input
              style={styles.input}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
              required
            />
            <input
              style={styles.input}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button style={styles.loginBtn} type="submit">
              Login
            </button>
            <button style={styles.backBtn} type="button" onClick={backToRoleSelect}>
              ← Change Role
            </button>
            <p style={{ marginTop: "1.5rem", color: selectedRole === "teacher" ? "#ffc72c" : "#222" }}>
              Don’t have an account?{" "}
              <span
                style={styles.registerLink}
                onClick={() => navigate("/register")}
              >
                Register here
              </span>
            </p>
          </form>
        ) : (
          <h2 style={{ ...styles.welcomeText, color: "#222" }}>Welcome! Please select your role to continue</h2>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    fontFamily: "Poppins, sans-serif",
  },
  leftSide: {
    flex: 1,
    backgroundColor: "#18202a",
    color: "#ffc72c",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "3rem",
    gap: "2rem",
  },
  roleSelectTitle: {
    fontSize: "3rem",
    fontWeight: "700",
  },
  roleCards: {
    display: "flex",
    gap: "3rem",
  },
  card: {
    width: 200,
    height: 240,
    borderRadius: 20,
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: "2rem",
    backgroundSize: "cover",
    backgroundPosition: "center",
    transition: "box-shadow 0.3s ease",
  },
  icon: {
    fontSize: 64,
    marginBottom: 12,
    color: "#ffc72c",
    textShadow: "1px 1px 4px rgba(0,0,0,0.6)",
  },
  cardLabel: {
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "#ffc72c",
    textShadow: "1px 1px 6px rgba(0,0,0,0.8)",
  },
  rightSide: {
    flex: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "3rem",
    position: "relative",
  },
  welcomeText: {
    fontSize: "2rem",
    fontWeight: "600",
    userSelect: "none",
  },
  form: {
    width: "100%",
    maxWidth: 460,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: "48px 40px",
    borderRadius: 16,
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    userSelect: "none",
  },
  formTitle: {
    fontWeight: 700,
    fontSize: "2.2rem",
  },
  input: {
    padding: "16px 18px",
    borderRadius: 12,
    border: "1.5px solid #d1d5db",
    fontSize: "1.1rem",
    outline: "none",
    color: "#18202a",
    caretColor: "#ffc72c",
    backgroundColor: "#fff", // Ensures text is always visible!
  },
  loginBtn: {
    padding: "16px 0",
    borderRadius: 12,
    border: "none",
    backgroundColor: "#ffc72c",
    color: "#222",
    fontWeight: 700,
    fontSize: "1.3rem",
    cursor: "pointer",
    boxShadow: "0 5px 15px rgba(255, 199, 44, 0.6)",
  },
  backBtn: {
    marginTop: 8,
    background: "none",
    border: "none",
    color: "#777",
    cursor: "pointer",
    fontWeight: 600,
    textDecoration: "underline",
    fontSize: "1rem",
  },
  registerLink: {
    color: "#ffc72c",
    cursor: "pointer",
    fontWeight: 700,
  },
};

export default Login;

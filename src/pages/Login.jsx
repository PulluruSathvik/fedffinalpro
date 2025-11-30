import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const studentBg = "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1350&q=80";
const teacherBg = "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1350&q=80";

const Login = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState("roleSelection");
  const [selectedRole, setSelectedRole] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaText, setCaptchaText] = useState("");
  const [userCaptcha, setUserCaptcha] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    document.documentElement.style.height = "100%";
    document.body.style.height = "100%";
    document.body.style.margin = "0";
    generateCaptcha();
    return () => {
      document.documentElement.style.height = "";
      document.body.style.height = "";
      document.body.style.margin = "";
    };
  }, []);

  const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
    drawCaptcha(result);
  };

  const drawCaptcha = (text) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#f8f9fa";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add noise lines
      ctx.strokeStyle = "#dee2e6";
      ctx.lineWidth = 1;
      for (let i = 0; i < 50; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.stroke();
      }

      // Draw text with distortion
      ctx.font = "bold 24px Poppins, sans-serif";
      ctx.fillStyle = "#495057";
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      
      const chars = text.split("");
      chars.forEach((char, index) => {
        ctx.save();
        ctx.translate(30 + index * 25, 30);
        ctx.rotate((Math.random() - 0.5) * 0.3);
        ctx.fillText(char, 0, 0);
        ctx.restore();
      });
    }
  };

  const validateCaptcha = () => {
    if (userCaptcha.toUpperCase() === captchaText) {
      setCaptchaError("");
      setIsCaptchaValid(true);
    } else {
      setCaptchaError("Invalid captcha. Try again.");
      setUserCaptcha("");
      setIsCaptchaValid(false);
      generateCaptcha();
    }
  };

  const selectRole = (role) => {
    setSelectedRole(role);
    setStep("loginForm");
    setEmail("");
    setPassword("");
    setUserCaptcha("");
    setCaptchaError("");
    setIsCaptchaValid(false);
    generateCaptcha();
  };

  const backToRoleSelect = () => {
    setSelectedRole(null);
    setStep("roleSelection");
    setEmail("");
    setPassword("");
    setUserCaptcha("");
    setCaptchaError("");
    setIsCaptchaValid(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isCaptchaValid) {
      setCaptchaError("Please verify you're not a robot.");
      return;
    }

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

            {/* Captcha Section - FIXED */}
            <div style={styles.captchaContainer}>
              <div style={styles.captchaWrapper}>
                <canvas
                  ref={canvasRef}
                  width={160}
                  height={60}
                  style={styles.captchaCanvas}
                  role="img"
                  aria-label="Captcha image"
                  onClick={generateCaptcha}
                />
                <button
                  type="button"
                  style={styles.refreshBtn}
                  onClick={generateCaptcha}
                  aria-label="Refresh captcha"
                >
                  🔄
                </button>
              </div>
              
              <div style={styles.captchaInputWrapper}>
                <input
                  style={{ ...styles.input, ...styles.captchaInput }}
                  type="text"
                  placeholder="Enter captcha"
                  value={userCaptcha}
                  onChange={(e) => setUserCaptcha(e.target.value.toUpperCase())}
                  maxLength={6}
                  autoComplete="off"
                />
                <button 
                  type="button"
                  style={styles.verifyBtn} 
                  onClick={validateCaptcha}
                  disabled={userCaptcha.length < 6}
                >
                  Verify
                </button>
              </div>
              
              {captchaError && (
                <p style={styles.captchaError}>{captchaError}</p>
              )}
              
              {isCaptchaValid && (
                <p style={styles.captchaSuccess}>✓ Captcha verified successfully!</p>
              )}
            </div>

            <button 
              style={{ 
                ...styles.loginBtn, 
                opacity: isCaptchaValid ? 1 : 0.6,
                cursor: isCaptchaValid ? "pointer" : "not-allowed"
              }} 
              type="submit"
              disabled={!isCaptchaValid}
            >
              Login
            </button>
            
            <button style={styles.backBtn} type="button" onClick={backToRoleSelect}>
              ← Change Role
            </button>
            
            <p style={{ marginTop: "1.5rem", color: selectedRole === "teacher" ? "#ffc72c" : "#222" }}>
              Don't have an account?{" "}
              <span style={styles.registerLink} onClick={() => navigate("/register")}>
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
    backgroundColor: "#fff",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
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
    transition: "all 0.2s ease",
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
  // Captcha Styles
  captchaContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  captchaWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  captchaCanvas: {
    border: "2px solid #e9ecef",
    borderRadius: 8,
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    transition: "all 0.2s ease",
  },
  refreshBtn: {
    width: 44,
    height: 44,
    border: "2px solid #ffc72c",
    backgroundColor: "#fff",
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: "1.2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
    boxShadow: "0 2px 8px rgba(255, 199, 44, 0.3)",
  },
  captchaInputWrapper: {
    display: "flex",
    gap: "1rem",
  },
  captchaInput: {
    flex: 1,
    textTransform: "uppercase",
    letterSpacing: "2px",
    fontWeight: 600,
  },
  verifyBtn: {
    minWidth: 80,
    padding: "16px 12px",
    borderRadius: 12,
    border: "none",
    backgroundColor: "#ffc72c",
    color: "#222",
    fontWeight: 700,
    fontSize: "0.95rem",
    cursor: "pointer",
    boxShadow: "0 3px 10px rgba(255, 199, 44, 0.4)",
    transition: "all 0.2s ease",
  },
  captchaError: {
    color: "#dc3545",
    fontSize: "0.9rem",
    fontWeight: 500,
    margin: 0,
    textAlign: "center",
  },
  captchaSuccess: {
    color: "#28a745",
    fontSize: "0.9rem",
    fontWeight: 500,
    margin: 0,
    textAlign: "center",
  },
};

export default Login;

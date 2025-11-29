import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!document.getElementById("fa-cdn")) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css";
      link.id = "fa-cdn";
      document.head.appendChild(link);
    }
    document.body.style.margin = "0";
    document.body.style.background = "#f6f7f9";
    document.body.style.height = "100vh";
    document.documentElement.style.height = "100%";
    document.body.style.fontFamily = "'Poppins', sans-serif";
    return () => {
      document.body.style = "";
      document.documentElement.style.height = "";
    };
  }, []);

  const validate = (data = formData) => {
    const newErrors = {};
    if (!data.name.trim()) newErrors.name = "Full Name is required";
    if (!data.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(data.email)) newErrors.email = "Email is invalid";
    if (!data.password) newErrors.password = "Password is required";
    else if (data.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!data.confirmPassword) newErrors.confirmPassword = "Confirm your password";
    else if (data.password !== data.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!data.role) newErrors.role = "Select role";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      alert("Registration successful! Please login.");
      navigate("/regsuccess");  // Navigate to RegSuccess page after registration
    }, 1000);
  };

  return (
    <div style={styles.wrapper}>
      <form style={styles.card} onSubmit={handleSubmit} noValidate>
        <h1 style={styles.heading}>Create Account</h1>

        <InputField
          iconClass="fas fa-user"
          name="name"
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />

        <InputField
          iconClass="fas fa-envelope"
          name="email"
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        <InputField
          iconClass="fas fa-lock"
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />

        <InputField
          iconClass="fas fa-lock"
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        <div style={{ position: "relative", marginBottom: 30, width: "100%" }}>
          <i className="fas fa-user-graduate" style={styles.icon}></i>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={{ ...styles.input, paddingLeft: 48 }}
            aria-invalid={!!errors.role}
            aria-describedby="role-error"
          >
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
          {errors.role && <p style={styles.errorText} id="role-error">{errors.role}</p>}
        </div>

        <button
          type="submit"
          style={{
            ...styles.registerBtn,
            opacity: submitted ? 0.6 : 1,
            cursor: submitted ? "not-allowed" : "pointer",
          }}
          disabled={submitted}
        >
          {submitted ? "Registering..." : "Register"}
        </button>

        <p style={styles.footerText}>
          Already have an account?{" "}
          <span
            style={styles.registerLink}
            onClick={() => navigate("/login")}
            tabIndex={0}
            role="button"
            onKeyDown={(e) => e.key === "Enter" && navigate("/login")}
          >
            Login here
          </span>
        </p>
      </form>
    </div>
  );
};

const InputField = ({ iconClass, error, ...props }) => (
  <div style={{ position: "relative", marginBottom: error ? 30 : 22, width: "100%" }}>
    <i className={iconClass} style={styles.icon}></i>
    <input
      style={{
        ...styles.input,
        borderColor: error ? "#dc2626" : "#ececec",
        transition: "border-color 0.3s ease",
      }}
      {...props}
      aria-invalid={!!error}
      aria-describedby={error ? `${props.name}-error` : undefined}
    />
    {error && <p style={styles.errorText} id={`${props.name}-error`}>{error}</p>}
  </div>
);

const styles = {
  wrapper: {
    width: "100vw",
    height: "100vh",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f6f7f9",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    boxShadow: "0 8px 24px rgba(17,38,146,.10)",
    padding: "54px 54px 32px 54px",
    display: "flex",
    flexDirection: "column",
    width: 420,
    minWidth: 340,
    alignItems: "center",
    userSelect: "none",
  },
  heading: {
    fontSize: "2.1rem",
    fontWeight: 700,
    color: "#18202a",
    marginBottom: 32,
    marginTop: 0,
    textAlign: "center",
  },
  icon: {
    position: "absolute",
    left: 18,
    top: "50%",
    transform: "translateY(-50%)",
    color: "#ffc72c",
    fontSize: 18,
    zIndex: 2,
  },
  input: {
    width: "100%",
    padding: "13px 18px 13px 48px",
    border: "1.5px solid #ececec",
    borderRadius: 8,
    outline: "none",
    fontSize: 17,
    backgroundColor: "#f9f9f9",
    boxSizing: "border-box",
    transition: "border-color 0.3s ease",
    color: "#18202a",
  },
  registerBtn: {
    marginTop: 10,
    width: "100%",
    padding: "15px 0",
    backgroundColor: "#ffc72c",
    color: "#131b2b",
    fontWeight: 700,
    fontSize: 22,
    borderRadius: 9,
    border: "none",
    cursor: "pointer",
    userSelect: "none",
    transition: "background-color 0.3s ease",
  },
  footerText: {
    marginTop: 24,
    color: "#18202a",
    fontSize: 17,
    textAlign: "center",
    userSelect: "none",
  },
  registerLink: {
    color: "#ffc72c",
    cursor: "pointer",
    marginLeft: 3,
    fontWeight: 600,
    textDecoration: "underline",
  },
  errorText: {
    marginTop: 4,
    color: "#dc2626",
    fontSize: 13,
    userSelect: "none"
  },
};

export default Register;

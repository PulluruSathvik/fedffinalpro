import React from "react";
import { useNavigate } from "react-router-dom";

const RegSuccess = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.background = "#f4f6f8";
    document.body.style.height = "100vh";
    document.body.style.fontFamily = "'Poppins', sans-serif";
    document.documentElement.style.height = "100%";
    return () => {
      document.body.style.margin = "";
      document.body.style.background = "";
      document.body.style.height = "";
      document.body.style.fontFamily = "";
      document.documentElement.style.height = "";
    };
  }, []);

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Registration Successful!</h1>
        <p style={styles.desc}>
          Your account has been created successfully.
        </p>
        <button
          style={styles.button}
          onClick={() => navigate("/login")}
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    width: "100vw",
    height: "100vh",
    background: "#f4f6f8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    background: "#fff",
    borderRadius: "18px",
    boxShadow: "0 8px 24px rgba(17,38,146,.10)",
    padding: "40px 60px",
    textAlign: "center",
    minWidth: "340px"
  },
  heading: {
    fontSize: "2rem",
    color: "#131b2b",
    fontWeight: 700,
    margin: "0 0 17px 0"
  },
  desc: {
    color: "#60686e",
    fontSize: "18px",
    margin: "0 0 26px 0"
  },
  button: {
    background: "#ffc72c",
    color: "#131b2b",
    border: "none",
    borderRadius: "8px",
    fontWeight: 700,
    fontSize: "19px",
    padding: "12px 36px",
    cursor: "pointer"
  }
};

export default RegSuccess;

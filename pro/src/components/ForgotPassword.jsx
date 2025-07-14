import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      input::-ms-reveal,
      input::-ms-clear {
        display: none !important;
      }
      input[type="password"]::-webkit-credentials-auto-fill-button {
        display: none !important;
      }
      input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px white inset !important;
        box-shadow: 0 0 0px 1000px white inset !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 6) errors.push("• Minimum 6 characters");
    if (!/[A-Z]/.test(password)) errors.push("• At least 1 uppercase letter");
    if (!/[a-z]/.test(password)) errors.push("• At least 1 lowercase letter");
    if (!/\d/.test(password)) errors.push("• At least 1 digit");
    if (!/[\W_]/.test(password)) errors.push("• At least 1 special character");
    return errors;
  };

  const handlePasswordChange = (e) => {
    const pass = e.target.value;
    setNewPassword(pass);
    setPasswordErrors(validatePassword(pass));
  };

  const handleReset = async () => {
    const errors = validatePassword(newPassword);
    if (errors.length > 0) {
      alert("Please fix the following password issues:\n" + errors.join("\n"));
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/forgot-password", {
        email,
        newPassword,
      });
      if (res.data.success) {
        alert("Password updated successfully. Please log in.");
        navigate("/");
      } else {
        alert("Error: " + res.data.message);
      }
    } catch (err) {
      alert("Failed to reset password");
    }
  };

  const passwordInputStyle = {
    ...styles.input,
    paddingRight: "40px",
    WebkitAppearance: "none",
    MozAppearance: "none",
    appearance: "none",
  };

  return (
    <div style={styles.container}>
      <form onSubmit={(e) => e.preventDefault()} style={styles.form}>
        <h2 style={styles.title}>Reset Password</h2>

        <input
          type="email"
          placeholder="Registered Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <div style={styles.passwordContainer}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            value={newPassword}
            onChange={handlePasswordChange}
            required
            autoComplete="new-password"
            inputMode="text"
            style={passwordInputStyle}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
            aria-label={showPassword ? "Hide password" : "Show password"}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === "Enter" || e.key === " ") setShowPassword(!showPassword);
            }}
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </span>
        </div>

        {passwordErrors.length > 0 && (
          <div style={styles.errorBox}>
            {passwordErrors.map((err, i) => (
              <p key={i} style={styles.errorText}>{err}</p>
            ))}
          </div>
        )}

        <button type="button" onClick={handleReset} style={styles.button}>
          Reset Password
        </button>
      </form>

      <div style={styles.links}>
        <p>
          Remember your password?{" "}
          <Link to="/" style={{ color: "#007BFF" }}>Login</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "350px",
    margin: "60px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontFamily: "Arial, sans-serif",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    marginBottom: "15px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #aaa",
    width: "100%",
    boxSizing: "border-box",
  },
  passwordContainer: {
    position: "relative",
    marginBottom: "15px",
  },
  eyeIcon: {
    position: "absolute",
    top: "50%",
    right: "12px",
    transform: "translateY(-50%)",
    cursor: "pointer",
    color: "#444",
    userSelect: "none",
  },
  button: {
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    fontSize: "16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  errorBox: {
    textAlign: "left",
    backgroundColor: "#fff3cd",
    color: "#856404",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "4px",
    border: "1px solid #ffeeba",
  },
  errorText: {
    margin: "5px 0",
    fontSize: "14px",
  },
  links: {
    marginTop: "15px",
    textAlign: "center",
    fontSize: "14px",
  },
};

export default ForgotPassword;

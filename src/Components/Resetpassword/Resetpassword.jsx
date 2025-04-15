import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, useNavigate } from "react-router-dom";
import "./ResetPassword.css";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import resetpassword from "../Resetpassword/Resetpassword.png";
import resetpasswordabove from "../Resetpassword/Reset Password above (1).png";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate("/forgetpassword");
    }
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    if (!password) {
      setErrorMessage("Password is required");
      setLoading(false);
      return;
    }

    if (!confirmPassword) {
      setErrorMessage("Confirm Password is required");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://green-world-vert.vercel.app/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword: password, confirmPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/login");
      } else {
        setErrorMessage(data.message || "Failed to reset password. Please try again.");
      }
    } catch (error) {
      console.error("Error during reset password:", error);
      setErrorMessage("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-container">
      <motion.div
        className="card p-4 shadow-lg"
        style={{ maxWidth: "500px", width: "90%", borderRadius: "15px" }}
        initial={{ opacity: 0, scale: 0.5, rotate: 180 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2>Reset Password</h2>
        <p className="subtitle">Please type something you will remember.</p>

        <form onSubmit={handleSubmit} className="reset-password-form">
          {/* Password Field */}
          <div className="input-wrapper">
            <label htmlFor="password" className="input-label">Create Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="input-wrapper">
            <label htmlFor="confirmPassword" className="input-label">Confirm Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Enter your Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          {/* Reset Button */}
          <button
            type="submit"
            className="reset-button-image"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEnvelope } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import "./Forgotpassword.css";
import shreefforgot from "../Forgotpassword/Email.png";
import shreefforgott from "../Forgotpassword/Forget Password_.png";
import shreefforgottt from "../Forgotpassword/dont worry.png";
import elhakel from "../Forgotpassword/alhakel.png";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(
          /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
          "Please enter a valid email ending with @gmail.com"
        )
        .email("Invalid email format")
        .required("Email is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://green-world-vert.vercel.app/auth/forget-password",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          }
        );

        const data = await response.json();

        if (response.ok) {
          toast.success(data.message || "Reset code sent successfully!");
          navigate("/verifycode", { state: { email: values.email } });
        } else {
          toast.error(data.message || "Failed to send reset code. Please try again.");
        }
      } catch (error) {
        toast.error("Failed to send reset code. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="forgot-password-container">
      <motion.div
        className="forgot-password-box"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="form-title-container">
          <img src={shreefforgott} alt="Forget Password?" className="form-title-image" />
        </div>
        <div className="form-description-container">
          <img src={shreefforgottt} alt="Don't worry! It happens." className="form-description-image" />
        </div>

        <form onSubmit={formik.handleSubmit} className="forgot-password-form">
          <div className="input-group">
            <img src={shreefforgot} alt="Email" className="email-label-image" />
            <div className="email-input-container">
              <img src={elhakel} alt="Email Background" className="email-background-image" />
              <input
                type="email"
                id="email"
                placeholder="Please enter your Gmail"
                {...formik.getFieldProps("email")}
                className="email-field"
              />
              <span className="input-icon">
                <FaEnvelope />
              </span>
            </div>
          </div>
          {formik.touched.email && formik.errors.email && (
            <div className="error-text">{formik.errors.email}</div>
          )}

          <motion.button
            type="submit"
            className="send-code-btn"
            disabled={loading || !formik.isValid}
          >
            {loading ? "Sending..." : "Send Code"}
          </motion.button>
        </form>

        <div className="remember-password-link">
          Remember password? <Link to="/login">Login</Link>
        </div>
      </motion.div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ForgotPassword;

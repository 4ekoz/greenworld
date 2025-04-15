import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash, FaEnvelope, FaUser } from "react-icons/fa";
import { Spinner } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    userName: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .max(10, "Username must be at most 10 characters")
      .matches(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores allowed")
      .required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .matches(/^[^\s@]+@gmail\.com$/, "Only Gmail addresses are allowed")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(/[@$!%*?&]/, "Password must contain at least one special character")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setErrors }) => {
      setLoading(true);
      try {
        let response = await axios.post("https://green-world-vert.vercel.app/auth/signup", values);
        if (response.data.message === "success") {
          toast.success("✅ Account created successfully! Check your email to verify your account.");
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("email", values.email);
          setTimeout(() => {
            navigate("/verify-email");
          }, 3000);
        } else if (response.data.message === "user already exist") {
          toast.warning("⚠ User already exists! Verification email will be re-sent.");
          await axios.post("https://green-world-vert.vercel.app/auth/resend-verification", {
            email: values.email,
          });
          toast.info("Verification email re-sent. Please check your inbox.");
        } else {
          setErrors({ email: response.data.message || "Unexpected error" });
          toast.error("❌ " + (response.data.message || "Unexpected error occurred"));
        }
      } catch (err) {
        setErrors({ email: err.response?.data?.message || "An error occurred" });
        toast.error("❌ " + (err.response?.data?.message || "An error occurred during registration."));
      } finally {
        setLoading(false);
      }
    },
  });

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    try {
      const currentURL = window.location.origin;
      const redirectURL = `${currentURL}/dashboard`;
      window.location.href = `https://green-world-vert.vercel.app/auth/google?redirect_url=${encodeURIComponent(redirectURL)}&origin=${encodeURIComponent(currentURL)}`;
    } catch (error) {
      console.error("Google signup error:", error);
      toast.error("Google Sign-Up Failed!");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="register-container">
      <motion.div className="register-box" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: "easeOut" }}>
        <h2>Create Account</h2>
        <p>create an account so you can explore all the existing posts</p>
        <form onSubmit={formik.handleSubmit}>
          {/* Username Field */}
          <div className="input-group">
            <input type="text" placeholder="Username" name="userName" maxLength={10} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.userName} />
            <FaUser className="icon" />
          </div>
          {formik.touched.userName && formik.errors.userName && <div className="error-text">{formik.errors.userName}</div>}

          {/* Email Field */}
          <div className="input-group">
            <input type="text" placeholder="Email" name="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} />
            <FaEnvelope className="icon" />
          </div>
          {formik.touched.email && formik.errors.email && <div className="error-text">{formik.errors.email}</div>}

          {/* Password Field */}
          <div className="input-group">
            <input type={showPassword ? "text" : "password"} placeholder="Password" name="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} />
            <span className="icon" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
          </div>
          {formik.touched.password && formik.errors.password && <div className="error-text">{formik.errors.password}</div>}

          {/* Sign Up Button */}
          <button type="submit" className="register-btn" disabled={!(formik.isValid && formik.dirty) || loading}>
            {loading ? <Spinner animation="border" size="sm" /> : "Sign_Up"}
          </button>

          {/* Google Login Button */}
          <div className="or-continue-with">or continue with</div>
          <div className="google-login-container">
            <button className="google-btn" onClick={handleGoogleSignup} disabled={googleLoading}>
              <FcGoogle size={20} />
              Sign up with Google
            </button>
          </div>

          {/* Already have an account link */}
          <p className="signup-link">Already have an account? <Link to="/login">Login</Link></p>
        </form>
      </motion.div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash, FaEnvelope } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "./Login.css";

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email address").required("Email is required"),
        password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        validateOnMount: true,
        onSubmit: async (values) => {
            setLoading(true);
            try {
                const response = await axios.post("https://green-world-vert.vercel.app/auth/login", values);
                if (response.data.message === "login successfully") {
                    const token = response.data.token;
                    localStorage.setItem("token", token);
                    axios.defaults.headers.common["token"] = token; // ✅ إرسال التوكن في الهيدر
                    toast.success("Login successful!");
                    setTimeout(() => navigate("/home"), 1500);
                } else {
                    toast.error("Invalid credentials");
                }
            } catch (error) {
                toast.error("Invalid credentials");
            }
            setLoading(false);
        },
    });

    const handleGoogleLoginSuccess = async (response) => {
        try {
            const decoded = jwtDecode(response.credential);
            const token = response.credential;
            localStorage.setItem("token", token);
            axios.defaults.headers.common["token"] = token; // ✅ إرسال التوكن في الهيدر
            toast.success(`Welcome ${decoded.name}!`);
            setTimeout(() => navigate("/home"), 1500);
        } catch (error) {
            toast.error("Google Sign-In Failed!");
        }
    };

    return (
        <div className="login-container">
            <motion.div className="login-box" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: "easeOut" }}>
                <h2 className="login-title">Login to your Account</h2>
                <p className="welcome-text">Welcome back, you've been missed</p>
                <form onSubmit={formik.handleSubmit}>
                    <div className="input-group">
                        <input type="text" id="email" name="email" placeholder="Enter your email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} />
                        <span className="input-icon"><FaEnvelope /></span>
                    </div>
                    {formik.touched.email && formik.errors.email && <p className="error-text">{formik.errors.email}</p>}

                    <div className="input-group">
                        <input type={showPassword ? "text" : "password"} id="password" name="password" placeholder="Enter your password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} />
                        <span className="input-icon" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                    </div>
                    {formik.touched.password && formik.errors.password && <p className="error-text">{formik.errors.password}</p>}

                    <motion.button type="submit" className={`btn-login ${!formik.isValid ? "disabled-btn" : ""}`} disabled={!formik.isValid}>
                        {loading ? "Loading..." : "Login"}
                    </motion.button>

                    <div className="forget-password-container">
                        <Link to="/forgot-password" className="forget-password-link">Forgot Password?</Link>
                    </div>

                    <p className="or-text">or continue with</p>

                    <GoogleLogin onSuccess={handleGoogleLoginSuccess} onError={() => toast.error("Google Sign-In Failed!")} />

                    <p className="signup-link">Don't have an Account? <Link to="/register">Sign Up</Link></p>
                </form>
            </motion.div>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
}

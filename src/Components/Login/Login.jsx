import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash, FaEnvelope } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import styles from "./Login.module.css";

export default function Login({ onClose, isModal = false }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
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
                    axios.defaults.headers.common["token"] = token;
                    toast.success("Login successful!");
                    if (isModal && onClose) {
                        setTimeout(onClose, 1500);
                    } else {
                        setTimeout(() => navigate("/"), 1500);
                    }
                } else {
                    toast.error(response.data.message || "Invalid credentials");
                }
            } catch (error) {
                toast.error(error.response?.data?.message || "Invalid credentials");
            } finally {
                setLoading(false);
            }
        },
    });

    const handleGoogleLogin = async () => {
        setGoogleLoading(true);
        try {
            const currentURL = window.location.origin;
            const redirectURL = `${currentURL}/dashboard`;
            window.location.href = `https://green-world-vert.vercel.app/auth/google?redirect_url=${encodeURIComponent(redirectURL)}&origin=${encodeURIComponent(currentURL)}`;
        } catch (error) {
            console.error("Google login error:", error);
            toast.error("Google Sign-In Failed!");
        } finally {
            setGoogleLoading(false);
        }
    };

    return (
        <motion.div
            className={`${styles.loginBox} ${isModal ? styles.modalLogin : ''}`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
        >
            <h2 className={styles.loginTitle}>Login to your Account</h2>
            <p className={styles.welcomeText}>Welcome back, you've been missed</p>

            <form onSubmit={formik.handleSubmit}>
                <div className={styles.inputGroup}>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    <span className={styles.inputIcon}><FaEnvelope /></span>
                </div>
                {formik.touched.email && formik.errors.email && (
                    <p className={styles.errorText}>{formik.errors.email}</p>
                )}

                <div className={styles.inputGroup}>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    <span
                        className={styles.inputIcon}
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ cursor: 'pointer' }}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                {formik.touched.password && formik.errors.password && (
                    <p className={styles.errorText}>{formik.errors.password}</p>
                )}

                <motion.button
                    type="submit"
                    className={`${styles.btnLogin} ${!formik.isValid ? styles.disabledBtn : ""}`}
                    disabled={!formik.isValid || loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {loading ? "Loading..." : "Login"}
                </motion.button>

                <div className={styles.forgetPasswordContainer}>
                    <Link to="/forgot-password" className={styles.forgetPasswordLink}>
                        Forgot Password?
                    </Link>
                </div>

                <p className={styles.orText}>or continue with</p>

                <div className={styles.googleLoginContainer}>
                    <button
                        className={styles.googleBtn}
                        onClick={handleGoogleLogin}
                        disabled={googleLoading}
                    >
                        <FcGoogle size={20} />
                        Login with Google
                    </button>
                    {googleLoading && <div className={styles.googleLoading}>Loading...</div>}
                </div>

                {!isModal && (
                    <p className={styles.signupLink}>
                        Don't have an Account? <Link to="/register">Sign Up</Link>
                    </p>
                )}
            </form>
            <ToastContainer position="top-right" autoClose={3000} />
        </motion.div>
    );
}

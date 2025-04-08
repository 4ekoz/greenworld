import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FaEye, FaEyeSlash, FaEnvelope, FaGoogle } from "react-icons/fa";
import "./Login.css";

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [users, setUsers] = useState([]);

    // Fetch users from the API
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("https://green-world-vert.vercel.app/auth/users"); // Replace with your API endpoint
                if (response.ok) {
                    const data = await response.json();
                    setUsers(data);
                    localStorage.setItem('users', JSON.stringify(data)); // حفظ المستخدمين في الـ localStorage
                } else {
                    console.error("Failed to fetch users:", response.status);
                    toast.error("Failed to fetch users. Please try again later.");
                }
            } catch (error) {
                console.error("Error fetching users:", error);
                toast.error("Error fetching users. Please try again later.");
            }
        };

        // جلب المستخدمين من الـ localStorage لو موجودين
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
            setUsers(JSON.parse(storedUsers));
        } else {
            fetchUsers();
        }
    }, []);

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: async (values, { setErrors }) => {
            setLoading(true);
            try {
                console.log("Login Data:", values);

                const response = await fetch("https://green-world-vert.vercel.app/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                });

                const data = await response.json();

                if (response.ok) {
                    // Login succeeded
                    toast.success("Logged in successfully!");
                    localStorage.setItem('token', data.token); // حفظ التوكن
                    setTimeout(() => {
                        navigate("/dashboard");
                    }, 2000);
                } else {
                    // Login failed
                    console.error("Login failed:", data);
                    if (response.status === 401) {
                        setErrors({ email: data.message || "Invalid email or password" });
                        toast.error(data.message || "Invalid email or password");
                    } else if (response.status === 404) {
                        setErrors({ email: "User not found. Please register." });
                        toast.error("User not found. Please register.");
                    } else {
                        setErrors({ email: "An error occurred during login" });
                        toast.error("An error occurred during login");
                    }
                }
            } catch (error) {
                console.error("Error during login:", error);
                setErrors({ email: "An error occurred during login" });
                toast.error("An error occurred during login");
            } finally {
                setLoading(false);
            }
        },
    });

    const handleGoogleSignIn = () => {
        if (loading) return;

        const auth = getAuth();
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                // Check if the user exists in your registered users
                const userExists = users.some((registeredUser) => registeredUser.email === user.email);

                if (userExists) {
                    toast.success(`Signed in as ${user.email}`);
                    navigate("/dashboard");
                } else {
                    toast.error("User not found. Please register.");
                    navigate("/register"); // Redirect to the registration page
                }
            })
            .catch(() => {
                toast.error("Failed to sign in with Google");
            });
    };

    return (
        <div className="login-container d-flex align-items-center justify-content-center vh-100 bg-light">
            {loading && (
                <div className="loading-overlay">
                    <motion.div
                        className="spinner-border text-success"
                        role="status"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    />
                </div>
            )}

            <motion.div
                className="login-box p-4 shadow-lg rounded bg-white w-50 w-md-75 w-lg-50"
                initial={{ opacity: 0, scale: 0.5, rotate: 180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <h2 className="text-center text-success mb-4">Sign in here</h2>
                <p className="text-center text-muted mb-4">Welcome back to Our Green World!</p>

                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-3 position-relative">
                        <label htmlFor="email" className="form-label">Email</label>
                        <div className="input-group">
                            <input
                                type="email"
                                id="email"
                                className={`form-control ${formik.touched.email && formik.errors.email ? "is-invalid" : ""}`}
                                placeholder="Enter your email"
                                {...formik.getFieldProps("email")}
                            />
                            <span className="input-group-text"><FaEnvelope /></span>
                        </div>
                        {formik.touched.email && formik.errors.email && (
                            <div className="invalid-feedback">{formik.errors.email}</div>
                        )}
                    </div>

                    <div className="mb-3 position-relative">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="position-relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                className={`form-control ${formik.touched.password && formik.errors.password ? "is-invalid" : ""}`}
                                placeholder="Enter your password"
                                {...formik.getFieldProps("password")}
                            />
                            <span
                                className="position-absolute"
                                style={{ right: "10px", top: "50%", transform: "translateY(-50%)", cursor: "pointer" }}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                            </span>
                        </div>
                        {formik.touched.password && formik.errors.password && (
                            <div className="invalid-feedback">{formik.errors.password}</div>
                        )}
                    </div>

                    <div className="mb-3 text-end">
                        {/* تأثير الأنيميشن عند الضغط على الرابط */}
                        <motion.button
                            type="button"
                            className="btn btn-link text-success p-0"
                            onClick={() => navigate("/forgot-password")}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            Forgot Password ?
                        </motion.button>
                    </div>

                    <motion.button
                        type="submit"
                        className="btn btn-success w-100 d-flex align-items-center justify-content-center"
                        disabled={!(formik.isValid && formik.dirty) || loading}
                    >
                        {loading ? (
                            <motion.div
                                className="spinner-border spinner-border-sm text-light"
                                role="status"
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            />
                        ) : (
                            "Login"
                        )}
                    </motion.button>

                    <div className="text-center my-3 text-muted">or continue with</div>

                    <motion.button
                        className="btn btn-google w-100 d-flex align-items-center justify-content-center"
                        style={{ backgroundColor: "#4285F4", color: "#fff" }}
                        whileHover={{ scale: 1.05 }}
                        onClick={handleGoogleSignIn}
                    >
                        <FaGoogle className="me-2" size={20} />
                        Sign in with Google
                    </motion.button>
                </form>

                <div className="text-center mt-3">
                    <p className="text-muted">Don't have an account? <button className="btn btn-link p-0 text-success" onClick={() => navigate("/register")}>Sign Up</button></p>
                </div>
            </motion.div>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default Login;
Use code with caution.
JavaScript
الكود بتاع الـ Dashboard (بعد التعديل):

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // التحقق من وجود التوكن في الـ localStorage
    const token = localStorage.getItem('token');

    // لو التوكن مش موجود، وجه المستخدم لصفحة الـ Login
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard!</p>
    </div>
  );
};

export default Dashboard;
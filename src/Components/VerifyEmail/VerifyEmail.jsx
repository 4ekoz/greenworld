import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerifyEmail = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await fetch(`https://green-world-vert.vercel.app//auth/verify-otp`);
                const data = await response.json();

                if (response.ok) {
                    toast.success("Email verified successfully!");
                    setTimeout(() => navigate("/login"), 2000);
                } else {
                    toast.error(data.message || "Verification failed.");
                }
            } catch (error) {
                toast.error("Verification error.");
            } finally {
                setLoading(false);
            }
        };

        verifyToken();
    }, [token, navigate]);

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            {loading ? <p>Verifying...</p> : <p>Redirecting to login...</p>}
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default VerifyEmail;

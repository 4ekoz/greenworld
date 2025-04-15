import React from "react";
import styles from "./Logout.module.css";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear all authentication data
    localStorage.removeItem("token");
    localStorage.clear();  // Clear any other auth-related data

    // Force navigation to login page
    window.location.href = "/login";
  };

  return (
    <div className={styles.logoutContainer}>
      <button onClick={handleLogout} className={styles.logoutButton}>
        <FaSignOutAlt className={styles.logoutIcon} />
        Logout
      </button>
    </div>
  );
}
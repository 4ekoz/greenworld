import React, { useState } from "react";
import styles from "./Logout.module.css";
import { FaSignOutAlt } from "react-icons/fa";
import Login from "../Login/Login";

export default function Logout() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setShowLoginModal(true);
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
    window.location.reload();
  };

  return (
    <>
      <div className={styles.logoutContainer}>
        <button onClick={handleLogout} className={styles.logoutButton}>
          <FaSignOutAlt className={styles.logoutIcon} />
          Logout
        </button>
      </div>

      {showLoginModal && (
        <div className={styles.modalOverlay}>
          <Login onClose={handleCloseModal} isModal={true} />
        </div>
      )}
    </>
  );
}
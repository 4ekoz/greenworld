import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Logout.css"; // استيراد ملف CSS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <button className={styles.logoutButton} onClick={handleLogout}>
      <FontAwesomeIcon icon={faSignOutAlt} className={styles.logoutIcon} />
      Logout
    </button>
  );
}

export default Logout;
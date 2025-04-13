import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import Logout from "../Logout/Logout";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link to="/dashboard" className={styles.navLink}>
              <span className={styles.navText}>Dashboard</span>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Logout />
          </li>
        </ul>
      </div>
    </nav>
  );
}
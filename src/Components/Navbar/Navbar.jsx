import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import cart from "./cart.png";
import Home from "./home.png";
import location from "./Location.png";
import myplanet from "./Myplanet.png";
import profile from "./profile.png";
import favourite from "./heart.png";
import Logout from "../Logout/Logout";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link to="/" className={styles.navLink}>
              <img src={Home} alt="Home" className={styles.icon} />
              <span className={styles.navText}>Home</span>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/Myplant" className={styles.navLink}>
              <img src={myplanet} alt="My Plant" className={styles.icon} />
              <span className={styles.navText}>My Plant</span>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/map" className={styles.navLink}>
              <img src={location} alt="Map" className={styles.icon} />
              <span className={styles.navText}>Map</span>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/favourites" className={styles.navLink}>
              <img src={favourite} alt="Favourites" className={styles.icon} />
              <span className={styles.navText}>Favourites</span>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/profile" className={styles.navLink}>
              <img src={profile} alt="Profile" className={styles.icon} />
              <span className={styles.navText}>Profile</span>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/cart" className={styles.navLink}>
              <img src={cart} alt="Cart" className={styles.icon} />
              <span className={styles.navText}>Cart</span>
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
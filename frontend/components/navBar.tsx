import React from "react";
import styles from "../styles/navBar.module.css";
import NavLink from "./navLink";

const navBar = () => {
  return (
    <nav className={styles.navBar}>
      <div className={styles.navItems}>
        <ul>
          <li>
            <NavLink href="/dashboard" text="Dashboard" />
          </li>
          <li>
            <NavLink href="/meals" text="Meals" />
          </li>
          <li>
            <NavLink href="/plan" text="Plan" />
          </li>
          <li>
            <NavLink href="/grocery" text="Grocery" />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default navBar;

import React from "react";
import "../styles/navBar.css";
import NavLink from "./navLink";

const navBar = () => {
  return (
    <nav className="navBar">
      <div className="navItems">
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

import React from "react";
import "../styles/navBar.css";

const navBar = () => {
  return (
    <nav className="navBar">
      <div className="navItems">
        <ul>
          <li>
            <a href="/Dashboard">Dashboard</a>
          </li>
          <li>
            <a href="/meals">Dashboard</a>
          </li>
          <li>Plan</li>
          <li>Grocery</li>
        </ul>
      </div>
    </nav>
  );
};

export default navBar;

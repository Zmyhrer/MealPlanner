import React from "react";
import "../styles/navBar.css";

const navBar = () => {
  return (
    <nav className="navBar">
      <div className="navItems">
        <ul>
          <li>
            <a href="/dashboard">Dashboard</a>
          </li>
          <li>
            <a href="/meals">Meals</a>
          </li>
          <li>
            <a href="/plan">Plan</a>
          </li>
          <li>
            <a href="/grocery">Grocery</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default navBar;

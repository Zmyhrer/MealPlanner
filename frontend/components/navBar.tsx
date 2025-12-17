"use client";
import React, { useRef, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import styles from "../styles/navBar.module.css";
import NavLink from "./navLink";

const NavBar = () => {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/meals", label: "Meals" },
    { href: "/plan", label: "Plan" },
    { href: "/grocery", label: "Grocery" },
  ];

  const navRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, x: 0 });

  const activeIndex = links.findIndex((link) => link.href === pathname);

  useEffect(() => {
    const activeRef = navRefs.current[activeIndex];
    if (activeRef) {
      setIndicatorStyle({
        width: activeRef.offsetWidth,
        x: activeRef.offsetLeft,
      });
    } else {
      setIndicatorStyle({ width: 0, x: 0 });
    }
  }, [activeIndex]);

  return (
    <nav className={styles.navBar}>
      <div className={styles.navItems}>
        <ul className={styles.navList}>
          {/* Framer Motion indicator */}
          <motion.span
            className={styles.indicator}
            layout
            animate={indicatorStyle}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />

          {links.map((link, i) => (
            <li
              key={link.href}
              ref={(el) => {
                navRefs.current[i] = el;
              }}
            >
              <NavLink href={link.href} text={link.label} />
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;

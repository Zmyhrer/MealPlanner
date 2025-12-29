"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "@/styles/dropdown.module.css";
import { Duration } from "./dateView";

interface DropdownProps {
  options: Duration[];
  selected?: Duration;
  onSelect: (value: Duration) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [internalSelected, setInternalSelected] = useState<string>(
    selected || options[0]
  );

  // Handle clicks outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value: Duration) => {
    setInternalSelected(value);
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdownContainer} ref={containerRef}>
      <div
        className={styles.dropdownDisplay}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{internalSelected}</span>
        <span className={`${styles.icon} ${isOpen ? styles.open : ""}`}>▼</span>
      </div>

      {isOpen && (
        <div className={styles.dropdownList}>
          {options.map((option) => (
            <div
              key={option}
              className={styles.dropdownOption}
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;

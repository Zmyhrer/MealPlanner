/**
 * AddMealButton
 * A toggleable button that rotates + into ×
 */
import React from "react";
import styles from "@/styles/addMealButton.module.css";

interface AddMealButtonProps {
  isActive: boolean;
  onClick: () => void;
}

const AddMealButton: React.FC<AddMealButtonProps> = ({ isActive, onClick }) => {
  return (
    <div
      className={`${styles.container} ${isActive ? styles.active : ""}`}
      role="button"
      onClick={onClick}
    >
      <span className={styles.icon}>+</span>
    </div>
  );
};

export default AddMealButton;

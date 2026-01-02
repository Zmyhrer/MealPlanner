import React from "react";
import styles from "@/styles/mealTimeButton.module.css";
import { MealTimeType } from "./mealTimes";

interface MealTimeButtonProps {
  label: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  meal: MealTimeType;
}

const MealTimeButton: React.FC<MealTimeButtonProps> = ({
  label,
  selected = false,
  disabled = false,
  onClick,
  meal,
}) => {
  const mealClass = styles[meal.toLowerCase()];

  return (
    <button
      type="button"
      className={`${styles.mealButton} ${mealClass} ${
        selected ? styles.selected : ""
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default MealTimeButton;

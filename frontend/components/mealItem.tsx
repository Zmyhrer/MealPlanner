import React from "react";
import styles from "../styles/mealItem.module.css";

export interface MealItemProps {
  name: string;
  calories: number;
}

const MealItem: React.FC<MealItemProps> = ({ name, calories }) => {
  return (
    <div className={styles["mealContainer"]}>
      <div className={styles["mealName"]}>{name}</div>
      <div className={styles["calories"]}>{calories} cal</div>
    </div>
  );
};

export default MealItem;

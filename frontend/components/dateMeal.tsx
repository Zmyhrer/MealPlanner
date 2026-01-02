import React from "react";
import styles from "@/styles/dateMeal.module.css";
import { MealTimeType } from "./mealTimes";

export interface DateMealProps {
  id: string;
  name: string;
  calories?: number;
  mealTime: MealTimeType;
}

const DateMeal: React.FC<DateMealProps> = ({ name, calories, mealTime }) => {
  return (
    <div className={`${styles.container} ${styles[mealTime]}`}>
      <div className={styles.mealName}>{name}</div>
      <div className={styles.calories}>{calories}</div>
    </div>
  );
};

export default DateMeal;

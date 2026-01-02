import React from "react";
import styles from "@/styles/dateMeal.module.css";
import { MealTimeType } from "./mealTimes";
import RemoveIcon from "@/public/remove.png";
import Image from "next/image";

export interface DateMealProps {
  id: string;
  name: string;
  calories?: number;
  mealTime: MealTimeType;
  onDelete: (id: string) => void;
}

const DateMeal: React.FC<DateMealProps> = ({
  id,
  name,
  calories,
  mealTime,
  onDelete,
}) => {
  return (
    <div className={`${styles.container} ${styles[mealTime]}`}>
      <div className={styles.mealName}>{name}</div>
      <div className={styles.rightSide}>
        <button className={styles.deleteButton} onClick={() => onDelete(id)}>
          <Image src={RemoveIcon} alt="Delete Meal Button" />
        </button>
        <div className={styles.calories}>{calories}</div>
      </div>
    </div>
  );
};

export default DateMeal;

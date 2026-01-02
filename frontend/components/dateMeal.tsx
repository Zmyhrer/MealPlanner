import React from "react";
import styles from "@/styles/dateMeal.module.css";
import { MealTimeType } from "./mealTimes";
import RemoveIcon from "@/public/clear.png";
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
    <div className={styles.container}>
      <div className={`${styles.mealName} ${styles[mealTime]}`}>{name}</div>

      <button className={styles.deleteButton} onClick={() => onDelete(id)}>
        <Image src={RemoveIcon} alt="Delete Meal Button" />
      </button>
    </div>
  );
};

export default DateMeal;

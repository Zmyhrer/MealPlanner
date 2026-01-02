import React, { useState } from "react";
import styles from "@/styles/mealTimes.module.css";
import MealTimeButton from "./mealTimeButton";

const MEALS = ["Breakfast", "Lunch", "Supper"] as const;
export type MealTimeType = (typeof MEALS)[number];
interface MealTimesProps {
  selectedMeal: MealTimeType;
  onSelectMeal: (meal: MealTimeType) => void;
}

const MealTimes: React.FC<MealTimesProps> = ({
  selectedMeal,
  onSelectMeal,
}) => {
  return (
    <div className={styles.container}>
      {MEALS.map((meal) => (
        <MealTimeButton
          key={meal}
          label={meal}
          meal={meal}
          selected={selectedMeal === meal}
          onClick={() => onSelectMeal(meal)}
        />
      ))}
    </div>
  );
};

export default MealTimes;

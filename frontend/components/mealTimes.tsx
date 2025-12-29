import React, { useState } from "react";
import styles from "@/styles/mealTimes.module.css";
import MealTimeButton from "./mealTimeButton";
import ContainerLabel from "./containerLabel";

const MEALS = ["Breakfast", "Lunch", "Supper"] as const;
type MealType = (typeof MEALS)[number];

const MealTimes = () => {
  const [selectedMeal, setSelectedMeal] = useState<MealType>("Breakfast");

  return (
    <ContainerLabel
      label="Meal Times"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <div className={styles.container}>
        {MEALS.map((meal) => (
          <MealTimeButton
            key={meal}
            label={meal}
            meal={meal}
            selected={selectedMeal === meal}
            onClick={() => setSelectedMeal(meal)}
          />
        ))}
      </div>
    </ContainerLabel>
  );
};

export default MealTimes;

import React, { useState } from "react";
import styles from "@/styles/dateCard.module.css";
import DateMeal, { DateMealProps } from "@/components/dateMeal";
import { MealTimeType } from "@/components/mealTimes";

const MEAL_ORDER: Record<MealTimeType, number> = {
  Breakfast: 0,
  Lunch: 1,
  Supper: 2,
};

interface DateCardProps {
  date: Date;
}

const DateCard: React.FC<DateCardProps> = ({ date }) => {
  const [meals, setMeals] = useState<DateMealProps[]>([]);

  const today = new Date();
  const isToday =
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate();

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();

    const raw = e.dataTransfer.getData("application/json");
    if (!raw) return;

    const parsed = JSON.parse(raw);

    const meal: DateMealProps = {
      id: crypto.randomUUID(),
      name: parsed.name,
      calories: parsed.calories,
      mealTime: parsed.mealTime,
    };

    setMeals((prev) => [...prev, meal]);
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  const sortedMeals = [...meals].sort(
    (a, b) => MEAL_ORDER[a.mealTime] - MEAL_ORDER[b.mealTime]
  );

  return (
    <div
      className={`${styles.container} ${isToday ? styles.today : ""}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className={styles.header}>
        <h3>{date.toLocaleDateString("en-US", { weekday: "long" })}</h3>
        <div className={styles.dateDisplay}>{date.getDate()}</div>
      </div>

      <div className={styles.mealList}>
        {sortedMeals.map((meal) => (
          <DateMeal
            key={meal.id}
            id={meal.id}
            name={meal.name}
            calories={meal.calories}
            mealTime={meal.mealTime}
          />
        ))}
      </div>
    </div>
  );
};

export default DateCard;

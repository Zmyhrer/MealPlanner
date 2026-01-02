import React from "react";
import styles from "../styles/mealItem.module.css";
import { MealTimeType } from "./mealTimes";

export interface MealItemProps {
  name: string;
  calories: number;
  hashtags: string[];
  draggable?: boolean;
  mealTime?: MealTimeType; // Renamed from activeMeal for clarity
}

const MealItem: React.FC<MealItemProps> = ({
  name,
  calories,
  hashtags,
  draggable = false,
  mealTime,
}) => {
  function handleDragStart(e: React.DragEvent<HTMLDivElement>) {
    // FIX: The key for the mealtime is now 'mealTime' to match what DateCard expects.
    const payload = JSON.stringify({ name, calories, hashtags, mealTime });
    e.dataTransfer.setData("application/json", payload);
  }

  return (
    <div
      className={styles.mealContainer}
      draggable={draggable}
      onDragStart={draggable ? handleDragStart : undefined}
    >
      <div className={styles.mealName}>{name}</div>

      <div className={styles.lowerContainer}>
        <div className={styles.hashtags}>
          {hashtags.slice(0, 4).map((tag, i) => (
            <span key={i} className={styles.hashtag}>
              #{tag}
            </span>
          ))}
        </div>
        <div className={styles.calories}>{calories} cal</div>
      </div>
    </div>
  );
};

export default MealItem;

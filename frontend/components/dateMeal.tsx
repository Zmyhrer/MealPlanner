import React, { useState, useRef } from "react";
import styles from "@/styles/dateMeal.module.css";
import { MealTimeType } from "./mealTimes";
import TrashIcon from "./icons/trashcan";
import Tooltip from "@/components/toolTip";

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
  const mealRef = useRef<HTMLDivElement>(null);
  const [hoverPos, setHoverPos] = useState<{
    x: number;
    y: number;
    width: number;
  } | null>(null);

  const handleMouseEnter = () => {
    if (
      mealRef.current &&
      mealRef.current.scrollWidth > mealRef.current.clientWidth
    ) {
      const rect = mealRef.current.getBoundingClientRect();
      setHoverPos({ x: rect.left, y: rect.top, width: rect.width });
    }
  };

  const handleMouseLeave = () => {
    setHoverPos(null);
  };

  return (
    <div className={styles.container}>
      <div
        ref={mealRef}
        className={`${styles.mealName} ${styles[mealTime]}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {name}
      </div>

      <button className={styles.deleteButton} onClick={() => onDelete(id)}>
        <TrashIcon />
      </button>

      {hoverPos && (
        <Tooltip
          x={hoverPos.x}
          y={hoverPos.y}
          width={hoverPos.width}
          content={name}
        />
      )}
    </div>
  );
};

export default DateMeal;

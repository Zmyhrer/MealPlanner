import React, { useState, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "@/styles/dateMeal.module.css";
import { MealTimeType } from "./mealTimes";
import TrashIcon from "./icons/trashcan";

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
  const [hoverPos, setHoverPos] = useState<{
    x: number;
    y: number;
    width: number;
  } | null>(null);
  const mealRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (mealRef.current) {
      const el = mealRef.current;
      if (el.scrollWidth > el.clientWidth) {
        const rect = el.getBoundingClientRect();
        setHoverPos({ x: rect.left, y: rect.top, width: rect.width });
      }
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

      {hoverPos &&
        createPortal(
          <div
            className={styles.tooltip}
            style={{
              left: hoverPos.x + hoverPos.width / 2,
              top: hoverPos.y - 8,
              transform: "translateX(-50%) translateY(-100%)",
            }}
          >
            {name}
            <div className={styles.tooltipArrow} />
          </div>,
          document.body
        )}
    </div>
  );
};

export default DateMeal;

"use client";

import React, { useRef, useState } from "react";
import styles from "../styles/mealItem.module.css";
import { MealTimeType } from "./mealTimes";
import Tooltip from "@/components/toolTip";
import { useRouter } from "next/navigation"; // ✅ App Router

export interface MealItemProps {
  id: string;
  name: string;
  calories: number;
  hashtags: string[];
  draggable?: boolean;
  mealTime?: MealTimeType;
}

const MealItem: React.FC<MealItemProps> = ({
  id,
  name,
  calories,
  hashtags,
  draggable = false,
  mealTime,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const mealRef = useRef<HTMLDivElement>(null);
  const [tooltipPosition, setTooltipPosition] = useState({
    x: 0,
    y: 0,
    width: 0,
  });
  const router = useRouter(); // ✅ Client Component only

  // Tooltip logic
  const handleMouseEnter = () => {
    if (mealRef.current) {
      const isTextOverflowing =
        mealRef.current.scrollWidth > mealRef.current.clientWidth;
      if (isTextOverflowing) {
        const rect = mealRef.current.getBoundingClientRect();
        setTooltipPosition({ x: rect.left, y: rect.top, width: rect.width });
        setShowTooltip(true);
      }
    }
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  // Drag logic
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    const payload = JSON.stringify({ name, calories, hashtags, mealTime });
    e.dataTransfer.setData("application/json", payload);
  };

  // Click logic
  const handleClick = () => {
    if (!draggable) {
      router.push(`/meals/${id}`);
    }
  };

  return (
    <div
      className={styles.mealContainer}
      draggable={draggable}
      onDragStart={draggable ? handleDragStart : undefined}
      onClick={!draggable ? handleClick : undefined}
    >
      <div
        ref={mealRef}
        className={styles.mealName}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {name}
      </div>

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

      {showTooltip && (
        <Tooltip
          x={tooltipPosition.x}
          y={tooltipPosition.y}
          width={tooltipPosition.width}
          content={name}
        />
      )}
    </div>
  );
};

export default MealItem;

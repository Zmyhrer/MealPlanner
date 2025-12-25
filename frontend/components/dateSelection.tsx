"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "@/styles/dateSelection.module.css";
import leftArrow from "@/public/left-arrow.png";

const getDateForWeekday = (
  targetDayName: string,
  fromDate: Date = new Date()
): Date => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const targetIndex = daysOfWeek.indexOf(targetDayName);
  if (targetIndex === -1) throw new Error("Invalid weekday name");

  const currentIndex = fromDate.getDay();
  let diff = targetIndex - currentIndex;
  if (diff < 0) diff += 7; // Go forward to next occurrence

  const newDate = new Date(fromDate);
  newDate.setDate(fromDate.getDate() + diff);
  return newDate;
};

interface DateSelectionProps {
  weekday: string; // Only accept a string like "Sunday"
}

const DateSelection: React.FC<DateSelectionProps> = ({ weekday }) => {
  const [date, setDate] = useState<Date>(getDateForWeekday(weekday));

  // Format weekday
  const formatWeekday = (d: Date): string =>
    d.toLocaleDateString("en-US", { weekday: "long" });

  // Format month/day
  const formatMonthDay = (d: Date): string =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric" });

  // Navigate one week backward
  const handleBackButton = () => {
    setDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() - 7);
      return newDate;
    });
  };

  // Navigate one week forward
  const handleForwardButton = () => {
    setDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + 7);
      return newDate;
    });
  };

  return (
    <div className={styles["large-container"]}>
      <div className={styles["top-container"]}>Start Date</div>

      <div className={styles["bottom-container"]}>
        <div className={styles["date-back"]} onClick={handleBackButton}>
          <Image src={leftArrow} alt="back arrow" width={24} height={24} />
        </div>

        <div className={styles["date-container"]}>
          <div className={styles["weekday-text-container"]}>
            {formatWeekday(date)}
          </div>
          <div className={styles["year-text-container"]}>
            {date.getFullYear()}
          </div>
          <div className={styles["date-text-container"]}>
            {formatMonthDay(date)}
          </div>
        </div>

        <div className={styles["date-forward"]} onClick={handleForwardButton}>
          <Image
            src={leftArrow}
            alt="forward arrow"
            width={24}
            height={24}
            style={{ transform: "rotate(180deg)" }}
          />
        </div>
      </div>
    </div>
  );
};

export default DateSelection;

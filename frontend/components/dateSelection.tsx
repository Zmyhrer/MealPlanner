"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "@/styles/dateSelection.module.css";
import leftArrow from "@/public/left-arrow.png";
import { DatePicker } from "./datePicker";

/** Converts weekday string to numeric index (0 = Sunday) */
const getWeekdayNumber = (weekday: string): number => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const index = days.indexOf(weekday);
  if (index === -1) throw new Error("Invalid weekday");
  return index;
};

/** Returns the next date matching the target weekday */
const getNextWeekdayDate = (
  weekdayIndex: number,
  fromDate: Date = new Date()
): Date => {
  const diff = (weekdayIndex - fromDate.getDay() + 7) % 7;
  const date = new Date(fromDate);
  date.setDate(fromDate.getDate() + diff);
  return date;
};

interface DateSelectionProps {
  weekday: string;
}

// Component Start
const DateSelection: React.FC<DateSelectionProps> = ({ weekday }) => {
  const allowedWeekday = getWeekdayNumber(weekday);
  const [date, setDate] = useState(() => getNextWeekdayDate(allowedWeekday));
  const [isPickingDate, setIsPickingDate] = useState(false);

  const handleBack = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDate((prev) => {
      const d = new Date(prev);
      d.setDate(prev.getDate() - 7);
      return d;
    });
  };

  const handleForward = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDate((prev) => {
      const d = new Date(prev);
      d.setDate(prev.getDate() + 7);
      return d;
    });
  };

  return (
    <div className={styles["large-container"]}>
      <div className={styles["top-container"]}>Start Date</div>

      <div
        className={styles["bottom-container"]}
        onClick={() => setIsPickingDate((prev) => !prev)}
      >
        <button
          className={styles["date-back"]}
          onClick={handleBack}
          disabled={isPickingDate}
        >
          <Image src={leftArrow} alt="back" width={24} height={24} />
        </button>

        <div className={styles["date-container"]}>
          <div className={styles["weekday-text-container"]}>
            {date.toLocaleDateString("en-US", { weekday: "long" })}
          </div>
          <div className={styles["year-text-container"]}>
            {date.getFullYear()}
          </div>
          <div className={styles["date-text-container"]}>
            {date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </div>
        </div>

        <button
          className={styles["date-forward"]}
          onClick={handleForward}
          disabled={isPickingDate}
        >
          <Image
            src={leftArrow}
            alt="forward"
            width={24}
            height={24}
            style={{ transform: "rotate(180deg)" }}
          />
        </button>
      </div>

      {isPickingDate && (
        <div className={styles["date-picker"]}>
          <DatePicker
            value={date}
            onChange={(newDate) => {
              setDate(newDate);
              setIsPickingDate(false);
            }}
            allowedWeekday={allowedWeekday}
          />
        </div>
      )}
    </div>
  );
};

export default DateSelection;

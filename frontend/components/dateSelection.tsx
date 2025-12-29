"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "@/styles/dateSelection.module.css";
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

const DateSelection: React.FC<DateSelectionProps> = ({ weekday }) => {
  const allowedWeekday = getWeekdayNumber(weekday);
  const [date, setDate] = useState(() => getNextWeekdayDate(allowedWeekday));
  const [isPickingDate, setIsPickingDate] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [pickerKey, setPickerKey] = useState(0);

  /** Close datepicker when clicking outside */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsPickingDate(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleBack = (e: React.MouseEvent) => {
    remountDatePicker();
    e.stopPropagation();
    setDate((prev) => {
      const d = new Date(prev);
      d.setDate(prev.getDate() - 7);
      return d;
    });
  };

  const handleForward = (e: React.MouseEvent) => {
    remountDatePicker();
    e.stopPropagation();
    setDate((prev) => {
      const d = new Date(prev);
      d.setDate(prev.getDate() + 7);
      return d;
    });
  };

  const handleDisplayClick = () => {
    remountDatePicker();
    setIsPickingDate((prev) => !prev);
  };

  const formatYear = (d: Date) => d.getFullYear();

  const remountDatePicker = () => {
    setPickerKey((k) => k + 1);
  };

  return (
    <div className={styles["large-container"]} ref={containerRef}>
      <div className={styles["label"]}>Start Date</div>

      <div className={styles["display"]} onClick={handleDisplayClick}>
        <button className={styles["date-back"]} onClick={handleBack}>
          {"<"}
        </button>

        <div className={styles["date-container"]}>
          <div className={styles["weekday-text-container"]}>
            {date.toLocaleDateString("en-US", { weekday: "long" })}
          </div>
          <div className={styles["year-text-container"]}>
            {formatYear(date)}
          </div>
          <div className={styles["date-text-container"]}>
            {date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </div>
        </div>

        <button className={styles["date-forward"]} onClick={handleForward}>
          {">"}
        </button>
      </div>

      <div
        className={`${styles["date-picker"]} ${
          isPickingDate ? styles["open"] : ""
        }`}
      >
        <DatePicker
          key={pickerKey}
          value={date}
          onChange={(newDate) => {
            setDate(newDate);
            setIsPickingDate(false);
          }}
          allowedWeekday={allowedWeekday}
        />
      </div>
    </div>
  );
};

export default DateSelection;

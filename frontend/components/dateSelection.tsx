import React, { useState, useRef, useEffect } from "react";
import styles from "@/styles/dateSelection.module.css";
import { DatePicker } from "./datePicker";
import ContainerLabel from "./containerLabel";

const getWeekdayNumber = (weekday: string) => {
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

interface DateSelectionProps {
  weekday: string;
  selectedDate: Date;
  onSelect: (date: Date) => void;
}

const DateSelection: React.FC<DateSelectionProps> = ({
  weekday,
  selectedDate,
  onSelect,
}) => {
  const allowedWeekday = getWeekdayNumber(weekday);
  const [isPickingDate, setIsPickingDate] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [pickerKey, setPickerKey] = useState(0);

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
    e.stopPropagation();
    setPickerKey((k) => k + 1);
    onSelect(
      new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate() - 7
      )
    );
  };

  const handleForward = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPickerKey((k) => k + 1);
    onSelect(
      new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate() + 7
      )
    );
  };

  const handleDisplayClick = () => {
    setPickerKey((k) => k + 1);
    setIsPickingDate((prev) => !prev);
  };

  return (
    <div className={styles["large-container"]} ref={containerRef}>
      <ContainerLabel label="Start Date">
        <div className={styles["display"]} onClick={handleDisplayClick}>
          <button className={styles["date-back"]} onClick={handleBack}>
            {"<"}
          </button>
          <div className={styles["date-container"]}>
            <div className={styles["weekday-text-container"]}>
              {selectedDate.toLocaleDateString("en-US", { weekday: "long" })}
            </div>
            <div className={styles["year-text-container"]}>
              {selectedDate.getFullYear()}
            </div>
            <div className={styles["date-text-container"]}>
              {selectedDate.toLocaleDateString("en-US", {
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
            value={selectedDate}
            onChange={(newDate) => {
              onSelect(newDate);
              setIsPickingDate(false);
            }}
            allowedWeekday={allowedWeekday}
          />
        </div>
      </ContainerLabel>
    </div>
  );
};

export default DateSelection;

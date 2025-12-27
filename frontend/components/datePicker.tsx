import React, { useState } from "react";
import styles from "@/styles/datePicker.module.css";

/**
 * Props for the Fluent-style DatePicker.
 */
export interface DatePickerProps {
  value?: Date | null;
  onChange: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/**
 * Fluent-inspired Date Picker component.
 */
export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  minDate,
  maxDate,
}) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(value ?? new Date());

  const normalize = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate());

  const isDisabled = (date: Date): boolean => {
    if (minDate && normalize(date) < normalize(minDate)) return true;
    if (maxDate && normalize(date) > normalize(maxDate)) return true;
    return false;
  };

  const daysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const days: (Date | null)[] = [];

    // Empty slots for alignment
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let d = 1; d <= totalDays; d++) {
      days.push(new Date(year, month, d));
    }

    return days;
  };

  const changeMonth = (offset: number) => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1)
    );
  };

  return (
    <div className={styles.datepicker}>
      <div className={styles.header}>
        <button
          className={styles.nav}
          onClick={() => changeMonth(-1)}
          aria-label="Previous month"
        >
          ‹
        </button>

        <span className={styles.title}>
          {currentMonth.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </span>

        <button
          className={styles.nav}
          onClick={() => changeMonth(1)}
          aria-label="Next month"
        >
          ›
        </button>
      </div>

      {/* Weekday Header */}
      <div className={styles.weekdays}>
        {WEEKDAYS.map((day) => (
          <div key={day} className={styles.weekday}>
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className={styles.grid}>
        {daysInMonth().map((date, index) => {
          if (!date) {
            return <div key={index} className={styles.empty} />;
          }

          const selected =
            value && normalize(value).getTime() === normalize(date).getTime();

          const disabled = isDisabled(date);

          return (
            <button
              key={date.toISOString()}
              className={`${styles.day} ${selected ? styles.selected : ""}`}
              disabled={disabled}
              onClick={() => !disabled && onChange(date)}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

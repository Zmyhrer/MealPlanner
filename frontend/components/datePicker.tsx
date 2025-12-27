import React, { useState } from "react";
import styles from "@/styles/datePicker.module.css";

export interface DatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  allowedWeekday: number; // 0 = Sunday
  minDate?: Date;
  maxDate?: Date;
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  allowedWeekday,
  minDate,
  maxDate,
}) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(value);

  const normalize = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate());

  const isDisabled = (date: Date) => {
    if (date.getDay() !== allowedWeekday) return true;
    if (minDate && normalize(date) < normalize(minDate)) return true;
    if (maxDate && normalize(date) > normalize(maxDate)) return true;
    return false;
  };

  const daysInMonth = (): (Date | null)[] => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const days: (Date | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= totalDays; d++) days.push(new Date(year, month, d));
    return days;
  };

  const changeMonth = (offset: number) =>
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1)
    );

  /** Calculates the next date matching the allowed weekday from today */
  const goToToday = () => {
    const today = new Date();
    const diff = (allowedWeekday - today.getDay() + 7) % 7;
    const nextAllowed = new Date(today);
    nextAllowed.setDate(today.getDate() + diff);

    if (minDate && nextAllowed < normalize(minDate))
      nextAllowed.setTime(normalize(minDate).getTime());
    if (maxDate && nextAllowed > normalize(maxDate))
      nextAllowed.setTime(normalize(maxDate).getTime());

    onChange(nextAllowed);
    setCurrentMonth(nextAllowed);
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

        <button className={styles.todayButton} onClick={goToToday}>
          Today
        </button>

        <button
          className={styles.nav}
          onClick={() => changeMonth(1)}
          aria-label="Next month"
        >
          ›
        </button>
      </div>

      <div className={styles.weekdays}>
        {WEEKDAYS.map((day) => (
          <div key={day} className={styles.weekday}>
            {day}
          </div>
        ))}
      </div>

      <div className={styles.grid}>
        {daysInMonth().map((date, index) => {
          if (!date) return <div key={index} className={styles.empty} />;
          const selected =
            normalize(value).getTime() === normalize(date).getTime();
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

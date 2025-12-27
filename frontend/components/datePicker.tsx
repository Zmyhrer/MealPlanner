import React, { useState } from "react";
import styles from "@/styles/datePicker.module.css";

export interface DatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  allowedWeekday: number;
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

  const daysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstOfMonth = new Date(year, month, 1);
    const lastOfMonth = new Date(year, month + 1, 0);

    const startOffset = firstOfMonth.getDay();
    const endOffset = 6 - lastOfMonth.getDay();

    const days: { date: Date; inCurrentMonth: boolean }[] = [];

    for (let i = startOffset; i > 0; i--) {
      const d = new Date(year, month, 1 - i);
      days.push({ date: d, inCurrentMonth: false });
    }

    for (let d = 1; d <= lastOfMonth.getDate(); d++) {
      days.push({ date: new Date(year, month, d), inCurrentMonth: true });
    }

    for (let i = 1; i <= endOffset; i++) {
      const d = new Date(year, month + 1, i);
      days.push({ date: d, inCurrentMonth: false });
    }

    return days;
  };

  const changeMonth = (offset: number) =>
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1)
    );

  const goToCurrentWeek = () => {
    const today = new Date();
    const diff = (allowedWeekday - today.getDay()) % 7;
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
    <div className={styles["datepicker"]}>
      <div className={styles["header"]}>
        <button
          className={styles["nav"]}
          onClick={() => changeMonth(-1)}
          aria-label="Previous month"
        >
          ‹
        </button>

        <div className={styles["topDisplay"]}>
          <span className={styles["title"]}>
            {currentMonth.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </span>

          <button className={styles["currentButton"]} onClick={goToCurrentWeek}>
            Current
          </button>
        </div>

        <button
          className={styles["nav"]}
          onClick={() => changeMonth(1)}
          aria-label="Next month"
        >
          ›
        </button>
      </div>

      <div className={styles["weekdays"]}>
        {WEEKDAYS.map((day) => (
          <div key={day} className={styles["weekday"]}>
            {day}
          </div>
        ))}
      </div>

      <div className={styles["grid"]}>
        {daysInMonth().map(({ date, inCurrentMonth }) => {
          const selected =
            normalize(value).getTime() === normalize(date).getTime();
          const disabled = isDisabled(date);
          const isFirstOfMonth = inCurrentMonth && date.getDate() === 1;

          return (
            <button
              key={date.toISOString()}
              className={`${styles["day"]} ${
                !inCurrentMonth ? styles["outsideMonth"] : ""
              } ${selected ? styles["selected"] : ""} ${
                isFirstOfMonth ? styles["firstDay"] : ""
              }`}
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

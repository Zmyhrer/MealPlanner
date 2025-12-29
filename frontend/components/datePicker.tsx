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
  const [viewMonth, setViewMonth] = useState(
    () => new Date(value.getFullYear(), value.getMonth(), 1)
  );

  const normalize = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate());

  const isDisabled = (date: Date) => {
    if (date.getDay() !== allowedWeekday) return true;
    if (minDate && normalize(date) < normalize(minDate)) return true;
    if (maxDate && normalize(date) > normalize(maxDate)) return true;
    return false;
  };

  const daysInMonth = () => {
    const year = viewMonth.getFullYear();
    const month = viewMonth.getMonth();

    const first = new Date(year, month, 1);
    const last = new Date(year, month + 1, 0);

    const startOffset = first.getDay();
    const totalDays = last.getDate();

    const days: { date: Date; inCurrentMonth: boolean }[] = [];

    for (let i = startOffset; i > 0; i--) {
      days.push({ date: new Date(year, month, 1 - i), inCurrentMonth: false });
    }

    for (let d = 1; d <= totalDays; d++) {
      days.push({ date: new Date(year, month, d), inCurrentMonth: true });
    }

    while (days.length < 42) {
      const next = new Date(year, month, days.length - startOffset + 1);
      days.push({ date: next, inCurrentMonth: false });
    }

    return days;
  };

  const changeMonth = (offset: number) => {
    setViewMonth(
      new Date(viewMonth.getFullYear(), viewMonth.getMonth() + offset, 1)
    );
  };

  const getClosestValidDateToToday = () => {
    const today = new Date();
    if (!isDisabled(today)) return today;

    let offset = 1;
    while (offset < 365) {
      const backward = new Date(today);
      backward.setDate(today.getDate() - offset);
      if (!isDisabled(backward)) return backward;

      offset++;
    }

    return today; // fallback if no valid date found within 1 year
  };

  const handleToday = () => {
    const closest = getClosestValidDateToToday();
    onChange(closest);
    setViewMonth(new Date(closest.getFullYear(), closest.getMonth(), 1));
  };

  return (
    <div className={styles.datepicker}>
      <div className={styles.header}>
        <button onClick={() => changeMonth(-1)} className={styles.nav}>
          ‹
        </button>

        <div className={styles.topDisplay}>
          <span className={styles.title}>
            {viewMonth.toLocaleString("default", { month: "short" })}{" "}
            {viewMonth.getFullYear()}
          </span>
        </div>

        <button onClick={() => changeMonth(1)} className={styles.nav}>
          ›
        </button>
      </div>

      <div className={styles.weekdays}>
        {WEEKDAYS.map((d) => (
          <div key={d} className={styles.weekday}>
            {d}
          </div>
        ))}
      </div>

      <div className={styles.grid}>
        {daysInMonth().map(({ date, inCurrentMonth }) => {
          const selected =
            normalize(date).getTime() === normalize(value).getTime();

          const isFirstOfMonth = inCurrentMonth && date.getDate() === 1;

          return (
            <button
              key={date.toISOString()}
              className={`${styles.day}
                ${!inCurrentMonth ? styles.outsideMonth : ""}
                ${selected ? styles.selected : ""}
                ${isFirstOfMonth ? styles.firstDay : ""}`}
              disabled={isDisabled(date)}
              onClick={() => onChange(date)}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      <div className={styles.thisWeekContainer}>
        <button className={styles.thisWeekButton} onClick={handleToday}>
          This Week
        </button>
      </div>
    </div>
  );
};

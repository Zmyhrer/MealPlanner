import React from "react";
import styles from "@/styles/dateCard.module.css";
import { get } from "http";

interface DateCardProps {
  date: Date;
}

const DateCard: React.FC<DateCardProps> = ({ date }) => {
  const getDayWithSuffix = (date: Date) => {
    const day = date.getDate();
    if (day >= 11 && day <= 13) return `${day}th`; // special case
    const lastDigit = day % 10;
    switch (lastDigit) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  };

  const getWeekDayLong = (date: Date) => {
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>{getWeekDayLong(date)}</h3>
        <div className={styles.dateDisplay}>{getDayWithSuffix(date)}</div>
      </div>
      <div className={styles.mealList}>
        <p>Meal 1</p>
        <p>Meal 2</p>
        <p>Meal 3</p>
        <p>Meal 4</p>
        <p>Meal 5</p>
        <p>Meal 6</p>
        <p>Meal 7</p>
        <p>Meal 8</p>
      </div>
    </div>
  );
};

export default DateCard;

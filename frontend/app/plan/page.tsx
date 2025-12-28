import React from "react";
import styles from "@/styles/plan.module.css";
import DateSelection from "@/components/dateSelection";
import DateView from "@/components/dateView";
import DateCard from "@/components/dateCard";

const page = () => {
  // Example: render 7 days
  const numDays = 14;
  const today = new Date();
  const dates = Array.from({ length: numDays }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d;
  });

  return (
    <div className={styles.planContainer}>
      <div className={styles.dateView}>
        <DateSelection weekday="Sunday" />
        <DateView />
      </div>

      <div className={styles.datePlan}>
        {dates.map((date) => (
          <DateCard key={date.toISOString()} />
        ))}
      </div>

      <div className={styles.searchSelection}>search-selection</div>
      <div className={styles.mealsList}>meal-list</div>
    </div>
  );
};

export default page;

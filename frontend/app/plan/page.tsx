"use client";

import React, { useState } from "react";
import styles from "@/styles/plan.module.css";
import DateSelection from "@/components/dateSelection";
import DateView, { Duration } from "@/components/dateView";
import DateCard from "@/components/dateCard";

const Page = () => {
  const numDays = 31;
  const today = new Date();
  const dates = Array.from({ length: numDays }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d;
  });

  const [view, setView] = useState<Duration>(Duration.OneWeek);

  const getIndexViewInDuration = Object.values(Duration).indexOf(view) + 1; // Return index of view in duration.
  const visibleDates = dates.slice(0, getIndexViewInDuration * 7); // Return index number * days to be shown.

  return (
    <div className={styles.planContainer}>
      <div className={styles.dateView}>
        <DateSelection weekday="Sunday" />
        <DateView
          options={Object.values(Duration)}
          selected={view}
          onSelect={setView}
        />
      </div>

      <div className={styles.datePlan}>
        {visibleDates.map((date) => (
          <DateCard key={date.toISOString()} date={date} />
        ))}
      </div>

      <div className={styles.searchSelection}>search-selection</div>
      <div className={styles.mealsList}>meal-list</div>
    </div>
  );
};

export default Page;

"use client";

import React, { useState } from "react";
import styles from "@/styles/plan.module.css";
import DateSelection from "@/components/dateSelection";
import DateView, { Duration } from "@/components/dateView";
import DateCard from "@/components/dateCard";

const Page = () => {
  // Example: render 7 days
  const numDays = 14;
  const today = new Date();
  const dates = Array.from({ length: numDays }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d;
  });

  const [view, setView] = useState<Duration>(Duration.OneWeek);

  const limitMap: Record<Duration, number> = {
    [Duration.OneWeek]: 7,
    [Duration.TwoWeeks]: 14,
    [Duration.OneMonth]: 30,
  };

  const visibleDates = dates.slice(0, limitMap[view]);

  return (
    <div className={styles.planContainer}>
      <div className={styles.dateView}>
        <DateSelection weekday="Sunday" />
        <DateView
          options={[Duration.OneWeek, Duration.TwoWeeks, Duration.OneMonth]}
          selected={view}
          onSelect={setView}
        />
      </div>

      <div className={styles.datePlan}>
        {visibleDates.map((date) => (
          <DateCard key={date.toISOString()} />
        ))}
      </div>

      <div className={styles.searchSelection}>search-selection</div>
      <div className={styles.mealsList}>meal-list</div>
    </div>
  );
};

export default Page;

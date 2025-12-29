"use client";

import React, { useState } from "react";
import styles from "@/styles/plan.module.css";
import DateSelection from "@/components/dateSelection";
import DateView, { Duration } from "@/components/dateView";
import DateCard from "@/components/dateCard";
import { select } from "framer-motion/client";
import SearchBar from "@/components/searchBar";
import ContainerLabel from "@/components/containerLabel";
import MealTimes from "@/components/mealTimes";

const Page = () => {
  // Helper to define which dates are valid
  const isDisabled = (date: Date) => date.getDay() !== 0; // Only allow Sundays

  // Function to get closest valid date to today
  const getClosestValidDateToToday = (
    isDisabledFn: (date: Date) => boolean
  ) => {
    const today = new Date();
    if (!isDisabledFn(today)) return today;

    for (let offset = 1; offset <= 365; offset++) {
      const forward = new Date(today);
      forward.setDate(today.getDate() + offset);
      if (!isDisabledFn(forward)) return forward;

      const backward = new Date(today);
      backward.setDate(today.getDate() - offset);
      if (!isDisabledFn(backward)) return backward;
    }

    return today; // fallback
  };

  const [selectedDate, setSelectedDate] = useState<Date>(() =>
    getClosestValidDateToToday(isDisabled)
  );
  const [view, setView] = useState<Duration>(Duration.OneWeek);

  // Generate days
  const numDays = 31;
  const dates = Array.from({ length: numDays }, (_, i) => {
    const d = new Date(selectedDate);
    d.setDate(selectedDate.getDate() + i);
    return d;
  });

  // Determine which dates to display based on the view
  const viewIndex = Object.values(Duration).indexOf(view) + 1; // 1-based
  const visibleDates = dates.slice(0, viewIndex * 7);

  return (
    <div className={styles.planContainer}>
      <div className={styles.dateView}>
        <DateSelection
          weekday="Sunday"
          selectedDate={selectedDate}
          onSelect={setSelectedDate}
        />
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

      <div className={styles.searchSelection}>
        <ContainerLabel label="Meals">
          <SearchBar />
        </ContainerLabel>

        <MealTimes />
      </div>
      <div className={styles.mealsList}>meal-list</div>
    </div>
  );
};

export default Page;

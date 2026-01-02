"use client";

import React, { useState } from "react";
import styles from "@/styles/plan.module.css";
import DateSelection from "@/components/dateSelection";
import DateCard from "@/components/dateCard";
import SearchBar from "@/components/searchBar";
import ContainerLabel from "@/components/containerLabel";
import MealTimes from "@/components/mealTimes";
import MealList from "@/components/mealList";
import meals from "@/data/mockMeals.json";
import {
  getClosestValidDateToToday,
  generateDates,
  getVisibleDates,
} from "@/services/dateService";
import { MealTimeType } from "@/components/mealTimes";

const Page = () => {
  const [filterText, setFilterText] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date>(() =>
    getClosestValidDateToToday("Sunday")
  );
  const [activeMeal, setActiveMeal] = useState<MealTimeType>("Breakfast");

  // Generate 31 days starting from selectedDate
  const dates = generateDates(selectedDate, 31);

  // Determine which dates to display based on the view
  const visibleDates = getVisibleDates(dates, 1);

  return (
    <div className={styles.planContainer}>
      <div className={styles.dateView}>
        <DateSelection
          weekday="Sunday"
          selectedDate={selectedDate}
          onSelect={setSelectedDate}
        />
      </div>

      <div className={styles.datePlan}>
        {visibleDates.map((date) => (
          <DateCard key={date.toISOString()} date={date} />
        ))}
      </div>

      <div className={styles.searchSelection}>
        <ContainerLabel label="Meals">
          <SearchBar
            value={filterText}
            placeholder="Search Meals"
            onChange={(value: string) => setFilterText(value)}
          />
        </ContainerLabel>

        <ContainerLabel
          label="Meal Times"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <MealTimes
            selectedMeal={activeMeal}
            onSelectMeal={(meal) => setActiveMeal(meal)}
          />
        </ContainerLabel>
      </div>

      <div className={styles.mealsList}>
        <MealList
          meals={meals}
          filterText={filterText}
          draggable={true}
          mealTime={activeMeal}
        />
      </div>
    </div>
  );
};

export default Page;

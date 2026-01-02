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
import Carousel from "@/components/carousel";

const Page = () => {
  const [filterText, setFilterText] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date>(() =>
    getClosestValidDateToToday("Sunday")
  );
  const [activeMeal, setActiveMeal] = useState<MealTimeType>("Breakfast");

  const dates = generateDates(selectedDate, 31);
  const visibleDates = getVisibleDates(dates, 1);

  const dateSlides = visibleDates.map((date) => (
    <DateCard key={date.toISOString()} date={date} />
  ));

  return (
    <div className={styles.planContainer}>
      <DateSelection
        weekday="Sunday"
        selectedDate={selectedDate}
        onSelect={setSelectedDate}
      />

      <Carousel items={dateSlides} />

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

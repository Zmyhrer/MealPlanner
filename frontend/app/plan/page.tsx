"use client";

import React, { useState } from "react";
import styles from "@/styles/plan.module.css";
import DateSelection from "@/components/dateSelection";
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
import ResponsiveDateCarousel from "@/components/responsiveDateCarousel";

const Page = () => {
  const [filterText, setFilterText] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date>(() =>
    getClosestValidDateToToday("Sunday")
  );
  const [activeMeal, setActiveMeal] = useState<MealTimeType>("Breakfast");

  const dates = generateDates(selectedDate, 31);
  const visibleDates = getVisibleDates(dates, 1);

  return (
    <div className={styles.planContainer}>
      <DateSelection
        weekday="Sunday"
        selectedDate={selectedDate}
        onSelect={setSelectedDate}
      />

      <ResponsiveDateCarousel dates={visibleDates} />

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
          meals={meals.map((meal) => ({
            id: meal.id,
            name: meal.mealName,
            calories: meal.calories,
            hashtags: meal.tags,
            ingredients: meal.ingredients,
            instructions: meal.instructions,
          }))}
          filterText={filterText}
          draggable={true}
          mealTime={activeMeal}
        />
      </div>
    </div>
  );
};

export default Page;

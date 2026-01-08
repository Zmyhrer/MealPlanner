"use client";

import React, { useState } from "react";
import styles from "../../styles/meals.module.css";
import SearchBar from "@/components/searchBar";
import MealList from "@/components/mealList";
import AddMealButton from "@/components/addMealButton";
import MealForm from "@/components/mealForm";
import meals from "@/data/mockMeals.json";
import { addMeal } from "@/services/mealService";

const Page = () => {
  const [isAddMeal, setIsAddMeal] = useState<boolean>(false);
  const [filterText, setFilterText] = useState<string>("");

  const handleAddMealButton = () => {
    setIsAddMeal((prev) => !prev);
  };

  return (
    <div className={styles["grid-container"]}>
      <div className={styles["top-container"]}>
        <div className={styles["top-left-container"]}>
          <SearchBar
            value={filterText}
            placeholder={"Search Meals"}
            onChange={(value: string) => setFilterText(value)}
          />
        </div>
        <div className={styles["top-right-container"]}>
          <AddMealButton onClick={handleAddMealButton} isActive={isAddMeal} />
        </div>
      </div>
      <div className={styles["mid-container"]}>
        {isAddMeal ? <MealForm title="Add Meal Form" submit={addMeal} /> : ""}
      </div>
      <div className={styles["bottom-container"]}>
        <MealList meals={meals} filterText={filterText} draggable={false} />
      </div>
    </div>
  );
};

export default Page;

"use client";

import React, { useState } from "react";
import Styles from "../../styles/meals.module.css";
import SearchBar from "@/components/searchBar";
import MealList from "@/components/mealList";
import AddMealButton from "@/components/addMealButton";
import AddMealForm from "@/components/addMealForm";
import meals from "@/data/mockMeals.json";

const Page = () => {
  const [isAddMeal, setIsAddMeal] = useState<boolean>(false);
  const [filterText, setFilterText] = useState<string>("");

  const handleAddMealButton = () => {
    setIsAddMeal((prev) => !prev);
  };

  return (
    <div className={Styles["grid-container"]}>
      <div className={Styles["top-container"]}>
        <div className={Styles["left-container"]}>
          <SearchBar
            value={filterText}
            placeholder={"Search Meals"}
            onChange={(value: string) => setFilterText(value)}
          />
        </div>
        <div className={Styles["right-container"]}>
          <AddMealButton onClick={handleAddMealButton} isActive={isAddMeal} />
        </div>
      </div>
      <div className={Styles["bottom-container"]}>
        {isAddMeal ? (
          <AddMealForm />
        ) : (
          <MealList meals={meals} filterText={filterText} draggable={false} />
        )}
      </div>
    </div>
  );
};

export default Page;

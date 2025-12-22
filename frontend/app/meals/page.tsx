"use client";

import React, { useState } from "react";
import Styles from "../../styles/meals.module.css";
import SearchBar from "@/components/searchBar";
import MealList from "@/components/mealList";
import AddMealButton from "@/components/addMealButton";
import AddMealForm from "@/components/addMealForm";

const Page = () => {
  const [isAddMeal, setIsAddMeal] = useState<boolean>(false);

  const handleAddMealButton = () => {
    setIsAddMeal((prev) => !prev);
  };

  const meals = [
    { name: "Mac and Cheese" },
    { name: "Spaghetti" },
    { name: "Peanut Butter & Jelly Sandwich" },
    { name: "Peanut Butter & Jelly Sandwich" },
    { name: "Peanut Butter & Jelly Sandwich" },
    { name: "Peanut Butter & Jelly Sandwich" },
    { name: "Peanut Butter & Jelly Sandwich" },
    { name: "Peanut Butter & Jelly Sandwich" },
    { name: "Peanut Butter & Jelly Sandwich" },
    { name: "Peanut Butter & Jelly Sandwich" },
    { name: "Peanut Butter & Jelly Sandwich" },
    { name: "Peanut Butter & Jelly Sandwich" },
    { name: "Peanut Butter & Jelly Sandwich" },
  ];

  return (
    <div className={Styles["grid-container"]}>
      <div className={Styles["top-container"]}>
        <div className={Styles["left-container"]}>
          <SearchBar />
        </div>
        <div className={Styles["right-container"]}>
          <AddMealButton onClick={handleAddMealButton} isActive={isAddMeal} />
        </div>
      </div>
      <div className={Styles["bottom-container"]}>
        {isAddMeal ? <AddMealForm /> : <MealList meals={meals} />}
      </div>
    </div>
  );
};

export default Page;

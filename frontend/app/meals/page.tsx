import React from "react";
import styles from "../../styles/meals.module.css";
import SearchBar from "@/components/searchBar";
import MealList from "@/components/mealList";
import AddMealButton from "@/components/addMealButton";

const page = () => {
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
    <div className={styles["grid-container"]}>
      <div className={styles["grid-item-1"]}>
        <SearchBar />
        <AddMealButton />
      </div>
      <div className={styles["grid-item-2"]}>
        <MealList meals={meals} />
      </div>
    </div>
  );
};

export default page;

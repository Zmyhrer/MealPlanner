import React from "react";
import MealItem, { MealItemProps } from "../components/mealItem";
import Styles from "../styles/mealList.module.css";

export interface MealListProps {
  meals?: MealItemProps[];
  filterText: string;
}

const MealList: React.FC<MealListProps> = ({ meals = [], filterText }) => {
  const filteredMeals = meals.filter((meal) =>
    (meal.name ?? "").toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className={Styles["gridContainer"]}>
      {filteredMeals.map((meal) => (
        <MealItem key={meal.name} name={meal.name} calories={meal.calories} />
      ))}
    </div>
  );
};

export default MealList;

// components/MealList.tsx
import React from "react";
import MealItem, { MealItemProps } from "../components/mealItem";
import Styles from "../styles/mealList.module.css";

export interface MealListProps {
  meals?: MealItemProps[];
}

const MealList: React.FC<MealListProps> = ({ meals }) => {
  return (
    <div className={Styles["gridContainer"]}>
      {(meals || []).map((meal, index) => (
        <MealItem key={index} name={meal.name} calories={meal.calories} />
      ))}
    </div>
  );
};

export default MealList;

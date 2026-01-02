import React from "react";
import MealItem, { MealItemProps } from "../components/mealItem";
import Styles from "../styles/mealList.module.css";
import { MealTimeType } from "./mealTimes";

export interface MealListProps {
  meals?: MealItemProps[];
  filterText: string;
  draggable: boolean; // Renamed from mealItemDraggableEnabled
  mealTime?: MealTimeType; // Renamed from activeMeal
}

const MealList: React.FC<MealListProps> = ({
  meals = [],
  filterText,
  draggable,
  mealTime,
}) => {
  const filteredMeals = meals.filter((meal) =>
    (meal.name ?? "").toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className={Styles["gridContainer"]}>
      {filteredMeals.map((meal) => (
        <MealItem
          key={meal.name}
          name={meal.name}
          calories={meal.calories}
          hashtags={meal.hashtags}
          draggable={draggable}
          mealTime={mealTime}
        />
      ))}
    </div>
  );
};

export default MealList;

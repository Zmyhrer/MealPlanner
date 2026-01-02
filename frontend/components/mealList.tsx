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
  const filteredMeals = meals.filter((meal) => {
    if (!filterText.trim()) return true;

    // Split on " or " (case-insensitive)
    const orClauses = filterText.toLowerCase().split(/\s+or\s+/);

    return orClauses.some((clause) => {
      const terms = clause.trim().split(/\s+/);
      const nameTerms: string[] = [];
      const hashtagTerms: string[] = [];

      // Separate name vs hashtag terms
      terms.forEach((term) => {
        if (term.startsWith("#")) {
          hashtagTerms.push(term.slice(1));
        } else {
          nameTerms.push(term);
        }
      });

      // AND logic: all name terms must match
      const nameMatches = nameTerms.every((t) =>
        meal.name?.toLowerCase().includes(t)
      );

      // AND logic: all hashtag terms must match
      const hashtags = meal.hashtags ?? [];
      const hashtagsMatches = hashtagTerms.every((ht) =>
        hashtags.some((tag) => tag.toLowerCase().includes(ht))
      );

      // Return true if this clause matches
      return nameMatches && hashtagsMatches;
    });
  });

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

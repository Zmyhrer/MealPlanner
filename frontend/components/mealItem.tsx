import React from "react";
import Styles from "../styles/mealItem.module.css";

export interface MealItemProps {
  name: string;
}

const MealItem = ({ name }: MealItemProps) => {
  return (
    <div className={Styles["mealContainer"]}>
      <div className={Styles["mealName"]}>{name}</div>
    </div>
  );
};

export default MealItem;

"use client";

import React from "react";
import Styles from "@/styles/addMealButton.module.css";

const addMealButton = () => {
  const handleOnClick = () => {
    alert("Add Meal Button");
  };

  return (
    <button
      className={Styles["container"]}
      type="button"
      onClick={handleOnClick}
    >
      <div className={Styles["icon"]}>+</div>
    </button>
  );
};

export default addMealButton;

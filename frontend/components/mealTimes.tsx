import React from "react";
import styles from "@/styles/mealTimes.module.css";

const mealTimes = () => {
  return (
    <div className={styles["container"]}>
      <div className={styles["breakfast"]}></div>
      <div className={styles["lunch"]}></div>
      <div className={styles["supper"]}></div>
    </div>
  );
};

export default mealTimes;

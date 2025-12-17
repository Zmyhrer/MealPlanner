import React from "react";
import styles from "../../styles/meals.module.css";

const page = () => {
  return (
    <div>
      <div className={styles["grid-container"]}>
        <div className={styles["grid-item-1"]}>Meals</div>
        <div className={styles["grid-item-2"]}>Search Bar</div>
        <div className={styles["grid-item-3"]}></div>
      </div>
    </div>
  );
};

export default page;

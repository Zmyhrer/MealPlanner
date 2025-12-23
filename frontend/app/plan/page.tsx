import React from "react";
import styles from "@/styles/plan.module.css";
import DateSelection from "@/components/dateSelection";

const page = () => {
  return (
    <div className={styles["plan-container"]}>
      <div className={styles["date-view"]}>
        <DateSelection weekday="Sunday" />
      </div>
      <div className={styles["date-plan"]}>date-plan</div>
      <div className={styles["search-selection"]}>search-selection</div>
      <div className={styles["meals-list"]}>meals-list</div>
    </div>
  );
};

export default page;

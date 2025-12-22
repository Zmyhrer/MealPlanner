import React from "react";
import Image from "next/image";
import styles from "@/styles/dateSelection.module.css";
import leftArrow from "@/public/left-arrow.png";

const dateSelection = () => {
  return (
    <div className={styles["large-container"]}>
      <div className={styles["top-container"]}>Start Date</div>
      <div className={styles["large-container"]}>
        <div className={styles["bottom-container"]}>
          <div className={styles["date-back"]}>
            <Image src={leftArrow} alt="back arrow" width={24} height={24} />
          </div>
          <div className={styles["date-container"]}>
            <div className={styles["top-date-container"]}>2025</div>
            <div className={styles["bottom-date-container"]}>Sept 28</div>
          </div>
          <div className={styles["date-forward"]}>
            <Image src={leftArrow} alt="forward arrow" width={24} height={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default dateSelection;

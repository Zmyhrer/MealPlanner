"use client";

import React, { useState } from "react";
import styles from "@/styles/dateView.module.css";
import Image from "next/image";
import leftArrow from "@/public/left-arrow.png";

const DateView = () => {
  const views = ["1 Week", "2 Week", "1 Month"];
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={styles["container"]}>
      <div className={styles["label"]}>View</div>
      <div className={styles["display"]}>
        <div>{views[0]}</div>
        <div className={`${styles.icon}${isOpen ? `${styles.iconOpen}` : ""}`}>
          <Image src={leftArrow} alt="back" width={24} height={24} />
        </div>
      </div>
    </div>
  );
};

export default DateView;

"use client";

import React, { useState } from "react";
import styles from "@/styles/dateView.module.css";
import Image from "next/image";
import leftArrow from "@/public/left-arrow.png";
import Dropdown from "./dropdown";

const DateView = () => {
  const views = ["1 Week", "2 Week", "1 Month"];
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={styles["container"]}>
      <div className={styles["label"]}>View</div>
      <div className={styles["display"]}>
        <Dropdown options={views} selected={views[0]} onSelect={() => {}} />
      </div>
    </div>
  );
};

export default DateView;

"use client";

import React, { useState } from "react";
import styles from "@/styles/dateView.module.css";
import Dropdown from "./dropdown";

export enum Duration {
  OneWeek = "1 week",
  TwoWeeks = "2 weeks",
  OneMonth = "1 month",
}

type DateViewProps = {
  options: Duration[];
  selected: Duration;
  onSelect: (value: Duration) => void;
};

const DateView = ({ options, selected, onSelect }: DateViewProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.label}>View</div>
      <div className={styles.display}>
        <Dropdown
          options={options}
          selected={selected}
          onSelect={(value: Duration) => onSelect(value)}
        />
      </div>
    </div>
  );
};

export default DateView;

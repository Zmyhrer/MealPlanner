"use client";

import React, { useState } from "react";
import styles from "@/styles/dateView.module.css";
import Dropdown from "./dropdown";
import ContainerLabel from "./containerLabel";

export enum Duration {
  OneWeek = "1 week",
  TwoWeeks = "2 weeks",
  ThreeWeeks = "3 weeks",
  FourWeeks = "4 weeks",
}

type DateViewProps = {
  options: Duration[];
  selected: Duration;
  onSelect: (value: Duration) => void;
};

const DateView = ({ options, selected, onSelect }: DateViewProps) => {
  return (
    <div className={styles.container}>
      <ContainerLabel label="View">
        <div className={styles.display}>
          <Dropdown
            options={options}
            selected={selected}
            onSelect={(value: Duration) => onSelect(value)}
          />
        </div>
      </ContainerLabel>
    </div>
  );
};

export default DateView;

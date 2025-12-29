import React from "react";
import styles from "@/styles/containerLabel.module.css";
import { Style } from "util";

interface ContainerLabelProps {
  label: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const ContainerLabel: React.FC<ContainerLabelProps> = ({
  label,
  style,
  children,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.label} style={style}>
        {label}
      </div>
      {children}
    </div>
  );
};

export default ContainerLabel;

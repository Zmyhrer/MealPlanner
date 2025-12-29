import React from "react";
import styles from "@/styles/containerLabel.module.css";

interface ContainerLabelProps {
  label: string;
  children: React.ReactNode;
}

const ContainerLabel: React.FC<ContainerLabelProps> = ({ label, children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.label}>{label}</div>
      {children}
    </div>
  );
};

export default ContainerLabel;

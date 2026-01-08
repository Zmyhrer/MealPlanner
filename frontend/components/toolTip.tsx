import React from "react";
import { createPortal } from "react-dom";
import styles from "@/styles/toolTip.module.css";

interface TooltipProps {
  x: number;
  y: number;
  width: number;
  content: React.ReactNode;
  offset?: number;
}

const Tooltip: React.FC<TooltipProps> = ({
  x,
  y,
  width,
  content,
  offset = 8,
}) => {
  return createPortal(
    <div
      className={styles.tooltip}
      style={{
        left: x + width / 2,
        top: y - offset,
        transform: "translateX(-50%) translateY(-100%)",
      }}
    >
      {content}
      <div className={styles.tooltipArrow} />
    </div>,
    document.body
  );
};

export default Tooltip;

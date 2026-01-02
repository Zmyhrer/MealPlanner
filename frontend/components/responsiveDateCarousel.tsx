"use client";

import React, { useRef } from "react";
import styles from "@/styles/responsiveDateCarousel.module.css";
import DateCard from "@/components/dateCard";
import { useShiftHorizontalScroll } from "@/hooks/useShiftHorizontalScroll";
import { useDragToScroll } from "@/hooks/useDragToScroll";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface ResponsiveDateCarouselProps {
  dates: Date[];
}

export default function ResponsiveDateCarousel({
  dates,
}: ResponsiveDateCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isCarousel = useMediaQuery("(max-width: 900px)");

  useShiftHorizontalScroll(containerRef);
  useDragToScroll(containerRef, isCarousel);

  return (
    <div ref={containerRef} className={styles.datePlan}>
      {dates.map((date) => (
        <DateCard key={date.toISOString()} date={date} />
      ))}
    </div>
  );
}

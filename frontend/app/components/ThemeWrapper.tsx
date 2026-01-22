"use client";

import React from "react";
import { Theme } from "@/lib/types";

interface ThemeWrapperProps {
  theme: Theme;
  children: React.ReactNode;
}

export const ThemeWrapper: React.FC<ThemeWrapperProps> = ({
  theme,
  children,
}) => {
  return (
    <div className={`${theme === Theme.DARK ? "dark" : ""}`}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
        {children}
      </div>
    </div>
  );
};

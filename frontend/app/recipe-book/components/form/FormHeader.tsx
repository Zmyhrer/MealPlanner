"use client";

import React from "react";

interface FormHeaderProps {
  title: string;
  onClose: () => void;
  hasUnsavedChanges?: boolean;
}

export const FormHeader: React.FC<FormHeaderProps> = ({
  title,
  onClose,
  hasUnsavedChanges = false,
}) => (
  <header className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
    <div className="flex items-center gap-3">
      <h3 className="text-xl font-bold">{title}</h3>
      {hasUnsavedChanges && (
        <span className="text-xs font-medium text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Unsaved Changes
        </span>
      )}
    </div>
    <button
      onClick={onClose}
      className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
      aria-label="Close"
    >
      ✕
    </button>
  </header>
);

"use client";

import { WeeklyPlan } from "@/lib/types";

interface PlannerHeaderProps {
  weeklyPlan: WeeklyPlan;
  onNavigate: (direction: number) => void;
  onGoToday: () => void;
  onOpenDatePicker: () => void;
  datePickerTriggerRef: React.RefObject<HTMLButtonElement>;
  dateRangeText: string; // Add this prop
}

export const PlannerHeader: React.FC<PlannerHeaderProps> = ({
  weeklyPlan,
  onNavigate,
  onGoToday,
  onOpenDatePicker,
  datePickerTriggerRef,
  dateRangeText, // Receive the pre-formatted date range text
}) => {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur-md py-4 z-10 border-b border-slate-200 dark:border-slate-800 px-2">
      <div className="flex items-center gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight">Weekly Planner</h2>
          <p className="text-slate-500 text-sm">
            Organize your nutritional goals
          </p>
        </div>
        <button
          onClick={onGoToday}
          className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-5 py-2.5 rounded-2xl text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm"
        >
          Today
        </button>
      </div>
      <div className="relative flex items-center gap-2 bg-white dark:bg-slate-800 p-2 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
        <button
          onClick={() => onNavigate(-7)}
          className="p-3 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
          aria-label="Previous week"
        >
          ←
        </button>
        <div className="relative">
          <button
            ref={datePickerTriggerRef}
            onClick={onOpenDatePicker}
            className="px-6 font-bold text-sm uppercase tracking-[0.2em] whitespace-nowrap hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl py-2 min-w-[200px]"
            aria-label="Select date"
          >
            {dateRangeText}
          </button>
          {/* DatePickerModal will be rendered as a child of Planner component */}
        </div>
        <button
          onClick={() => onNavigate(7)}
          className="p-3 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
          aria-label="Next week"
        >
          →
        </button>
      </div>
    </header>
  );
};

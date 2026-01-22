"use client";

import { DayOfWeek } from "@/lib/types";

interface DayOption {
  value: DayOfWeek;
  label: string;
}

interface WeekStartSelectorProps {
  currentStartDay: DayOfWeek;
  days: DayOption[];
  onStartDayChange: (day: DayOfWeek) => void;
}

export const WeekStartSelector: React.FC<WeekStartSelectorProps> = ({
  currentStartDay,
  days,
  onStartDayChange,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h4 className="font-semibold">Week Starts On</h4>
        <p className="text-xs text-slate-500">Adjust your planner layout</p>
      </div>
      <select
        value={currentStartDay}
        onChange={(e) => onStartDayChange(Number(e.target.value) as DayOfWeek)}
        className="bg-slate-100 dark:bg-slate-900 border-none rounded-xl px-4 py-2 text-xs font-bold outline-none"
      >
        {days.map((d) => (
          <option key={d.value} value={d.value}>
            {d.label}
          </option>
        ))}
      </select>
    </div>
  );
};

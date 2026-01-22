"use client";

import { UnitSystem } from "@/lib/types";

interface UnitSystemToggleProps {
  currentUnitSystem: UnitSystem;
  onUnitSystemChange: (unitSystem: UnitSystem) => void;
}

export const UnitSystemToggle: React.FC<UnitSystemToggleProps> = ({
  currentUnitSystem,
  onUnitSystemChange,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h4 className="font-semibold">Measurement Units</h4>
        <p className="text-xs text-slate-500">Weight and volume systems</p>
      </div>
      <div className="flex bg-slate-100 dark:bg-slate-700 p-1 rounded-xl">
        <button
          onClick={() => onUnitSystemChange(UnitSystem.IMPERIAL)}
          className={`px-4 py-2 rounded-lg text-xs transition-all ${
            currentUnitSystem === UnitSystem.IMPERIAL
              ? "bg-white shadow-sm font-bold text-indigo-600"
              : "text-slate-500"
          }`}
        >
          Imperial
        </button>
        <button
          onClick={() => onUnitSystemChange(UnitSystem.METRIC)}
          className={`px-4 py-2 rounded-lg text-xs transition-all ${
            currentUnitSystem === UnitSystem.METRIC
              ? "bg-white shadow-sm font-bold text-indigo-600"
              : "text-slate-500"
          }`}
        >
          Metric
        </button>
      </div>
    </div>
  );
};

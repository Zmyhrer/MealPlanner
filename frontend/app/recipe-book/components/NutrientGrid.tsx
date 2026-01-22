"use client";

import React from "react";
import { Nutrients } from "@/lib/types";

interface NutrientGridProps {
  nutrients: Nutrients;
  formatWeight: (grams: number) => string;
  weightUnit: string;
}

export const NutrientGrid: React.FC<NutrientGridProps> = ({
  nutrients,
  formatWeight,
  weightUnit,
}) => {
  return (
    <div className="grid grid-cols-4 gap-2 py-3 border-y border-slate-50 dark:border-slate-700/50 mb-4">
      <div className="text-center">
        <p className="text-[7px] font-black text-slate-400 uppercase">Cals</p>
        <p className="text-[11px] font-bold">
          {Math.round(nutrients.calories)}
        </p>
      </div>
      <div className="text-center">
        <p className="text-[7px] font-black text-emerald-500 uppercase">Prot</p>
        <p className="text-[11px] font-bold">
          {formatWeight(nutrients.protein)}
          {weightUnit}
        </p>
      </div>
      <div className="text-center">
        <p className="text-[7px] font-black text-blue-500 uppercase">Carb</p>
        <p className="text-[11px] font-bold">
          {formatWeight(nutrients.carbs)}
          {weightUnit}
        </p>
      </div>
      <div className="text-center">
        <p className="text-[7px] font-black text-amber-500 uppercase">Fat</p>
        <p className="text-[11px] font-bold">
          {formatWeight(nutrients.fat)}
          {weightUnit}
        </p>
      </div>
    </div>
  );
};

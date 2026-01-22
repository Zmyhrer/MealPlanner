"use client";

interface NutrientSummaryBannerProps {
  weeklyNutrients: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  formatMacro: (grams: number) => string;
  macroUnit: string;
}

export const NutrientSummaryBanner: React.FC<NutrientSummaryBannerProps> = ({
  weeklyNutrients,
  formatMacro,
  macroUnit,
}) => {
  return (
    <div className="bg-indigo-600 rounded-[3rem] p-10 text-white shadow-2xl shadow-indigo-200 dark:shadow-none grid grid-cols-2 lg:grid-cols-4 gap-12">
      <div className="space-y-2">
        <p className="text-[12px] uppercase font-black opacity-60 tracking-[0.3em]">
          Weekly Calories
        </p>
        <p className="text-5xl font-black tabular-nums">
          {Math.round(weeklyNutrients.calories)}
        </p>
      </div>
      <div className="space-y-2">
        <p className="text-[12px] uppercase font-black opacity-60 tracking-[0.3em]">
          Protein
        </p>
        <p className="text-3xl font-black tabular-nums">
          {formatMacro(weeklyNutrients.protein)}{" "}
          <span className="text-lg opacity-40 font-medium">{macroUnit}</span>
        </p>
      </div>
      <div className="space-y-2">
        <p className="text-[12px] uppercase font-black opacity-60 tracking-[0.3em]">
          Carbs
        </p>
        <p className="text-3xl font-black tabular-nums">
          {formatMacro(weeklyNutrients.carbs)}{" "}
          <span className="text-lg opacity-40 font-medium">{macroUnit}</span>
        </p>
      </div>
      <div className="space-y-2">
        <p className="text-[12px] uppercase font-black opacity-60 tracking-[0.3em]">
          Fat
        </p>
        <p className="text-3xl font-black tabular-nums">
          {formatMacro(weeklyNutrients.fat)}{" "}
          <span className="text-lg opacity-40 font-medium">{macroUnit}</span>
        </p>
      </div>
    </div>
  );
};

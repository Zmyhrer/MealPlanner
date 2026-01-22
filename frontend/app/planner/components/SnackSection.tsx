"use client";

import { ScheduledMeal, Recipe } from "@/lib/types";

interface SnackSectionProps {
  snacks: ScheduledMeal[];
  calculateRecipeNutrients: (
    recipe: Recipe,
    servings: number
  ) => {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  onAddSnack: () => void;
  onViewSnack: (snack: ScheduledMeal, index: number) => void;
  onUpdateServings: (index: number, servings: number) => void;
  onRemoveSnack: (index: number) => void;
}

export const SnackSection: React.FC<SnackSectionProps> = ({
  snacks,
  calculateRecipeNutrients,
  onAddSnack,
  onViewSnack,
  onUpdateServings,
  onRemoveSnack,
}) => {
  const handleUpdateServings = (
    e: React.MouseEvent,
    index: number,
    servings: number
  ) => {
    e.stopPropagation();
    onUpdateServings(index, Math.max(1, servings));
  };

  const handleRemove = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    onRemoveSnack(index);
  };

  return (
    <div className="bg-slate-100/30 dark:bg-slate-900/20 rounded-[2.5rem] p-5 space-y-4 border border-slate-200/50 dark:border-slate-800">
      <div className="flex justify-between items-center px-2">
        <span className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">
          SNACKS
        </span>
        <button
          onClick={onAddSnack}
          className="w-8 h-8 flex items-center justify-center text-xl text-indigo-600 font-black hover:bg-indigo-600 hover:text-white dark:bg-slate-800 rounded-full transition-all shadow-md"
        >
          +
        </button>
      </div>
      <div className="space-y-3">
        {snacks.map((snack, index) => {
          const snut = calculateRecipeNutrients(snack.recipe, snack.servings);
          return (
            <div
              key={index}
              onClick={() => onViewSnack(snack, index)}
              className="bg-white dark:bg-slate-800 p-4 rounded-3xl shadow-sm border border-slate-50 dark:border-slate-700 group/snack cursor-pointer hover:border-indigo-400 hover:shadow-lg transition-all"
            >
              <div className="flex justify-between items-start gap-2 mb-3">
                <h5 className="text-[12px] font-black leading-tight flex-1">
                  {snack.recipe.title}
                </h5>
                <button
                  onClick={(e) => handleRemove(e, index)}
                  className="text-slate-200 hover:text-red-500 opacity-0 group-hover/snack:opacity-100 transition-all p-1"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex items-center justify-between border-t border-slate-50 dark:border-slate-700/50 pt-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) =>
                      handleUpdateServings(e, index, snack.servings - 1)
                    }
                    className="w-6 h-6 flex items-center justify-center font-bold text-indigo-500 hover:bg-slate-100 rounded-lg text-xs"
                  >
                    -
                  </button>
                  <span className="text-xs font-mono font-black">
                    {snack.servings}
                  </span>
                  <button
                    onClick={(e) =>
                      handleUpdateServings(e, index, snack.servings + 1)
                    }
                    className="w-6 h-6 flex items-center justify-center font-bold text-indigo-500 hover:bg-slate-100 rounded-lg text-xs"
                  >
                    +
                  </button>
                </div>
                <span className="text-[11px] font-black text-slate-500">
                  {Math.round(snut.calories)} cal
                </span>
              </div>
            </div>
          );
        })}
        {snacks.length === 0 && (
          <div className="py-6 text-center text-[10px] text-slate-300 font-bold uppercase tracking-widest border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
            No snacks
          </div>
        )}
      </div>
    </div>
  );
};

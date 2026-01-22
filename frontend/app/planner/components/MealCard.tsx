"use client";

import { ScheduledMeal, MealType } from "@/lib/types";
import clsx from "clsx";

type RegularMealType = MealType.BREAKFAST | MealType.LUNCH | MealType.DINNER;

interface MealCardProps {
  type: RegularMealType;
  meal: ScheduledMeal | null;
  nutrients: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  } | null;
  formatMacro: (grams: number) => string;
  onView: () => void;
  onEdit: () => void;
  onUpdateServings: (servings: number) => void;
  onRemove: () => void;
}

export const MealCard: React.FC<MealCardProps> = ({
  type,
  meal,
  nutrients,
  formatMacro,
  onView,
  onEdit,
  onUpdateServings,
  onRemove,
}) => {
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove();
  };

  const handleUpdateServings = (e: React.MouseEvent, servings: number) => {
    e.stopPropagation();
    onUpdateServings(servings);
  };

  return (
    <div
      onClick={meal ? onView : undefined}
      className={clsx(
        "group relative bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-sm border border-slate-100 dark:border-slate-700 transition-all flex flex-col h-[200px]",
        meal && "cursor-pointer hover:border-indigo-400 hover:shadow-lg"
      )}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500/60">
          {type}
        </span>
        {meal && (
          <button
            onClick={handleRemove}
            className="text-slate-200 hover:text-red-500 transition-colors p-1 group-hover:text-slate-400"
          >
            <svg
              className="w-4 h-4"
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
        )}
      </div>

      {/* Meal content or placeholder */}
      {meal ? (
        <div className="flex-1 flex flex-col justify-between">
          <h4 className="font-bold text-sm line-clamp-2 leading-tight pr-1 mb-3">
            {meal.recipe.title}
          </h4>

          <div className="space-y-3">
            {/* Servings */}
            <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-900/50 rounded-xl px-2 py-1.5">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">
                Servings
              </span>
              <div className="flex items-center gap-3">
                {[-1, 1].map((delta) => (
                  <button
                    key={delta}
                    onClick={(e) =>
                      handleUpdateServings(e, meal.servings + delta)
                    }
                    className="w-6 h-6 flex items-center justify-center font-bold text-indigo-600 hover:bg-white rounded-lg transition-colors border border-transparent active:border-indigo-200"
                  >
                    {delta === -1 ? "-" : "+"}
                  </button>
                ))}
                <span className="text-xs font-black font-mono">
                  {meal.servings}
                </span>
              </div>
            </div>

            {/* Nutrients */}
            {nutrients && (
              <div className="flex justify-between items-center border-t border-slate-50 dark:border-slate-700/50 pt-3">
                <span className="text-sm font-black text-slate-800 dark:text-slate-200">
                  {Math.round(nutrients.calories)}{" "}
                  <span className="text-[9px] text-slate-400 font-bold">
                    CAL
                  </span>
                </span>
                <div className="flex gap-2 text-[9px] font-black text-slate-400 uppercase">
                  <span className="text-emerald-500">
                    P:{formatMacro(nutrients.protein)}
                  </span>
                  <span>C:{formatMacro(nutrients.carbs)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <button
          onClick={onEdit}
          className="flex-1 flex flex-col items-center justify-center h-[200px] border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-[2rem] hover:border-indigo-200 hover:bg-indigo-50/10 transition-all group/btn"
        >
          <span className="text-3xl text-slate-200 group-hover/btn:text-indigo-400 transition-colors">
            +
          </span>
        </button>
      )}
    </div>
  );
};

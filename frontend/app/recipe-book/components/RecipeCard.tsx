"use client";

import React from "react";
import { Recipe, Ingredient, UnitSystem } from "@/lib/types";
import { useNutrientCalculator } from "@/app/recipe-book/hooks/useNutrientCalculator";
import { NutrientGrid } from "./NutrientGrid";

interface RecipeCardProps {
  recipe: Recipe;
  ingredients: Ingredient[];
  unitSystem: UnitSystem;
  onView: () => void;
  onEdit: () => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  ingredients,
  unitSystem,
  onEdit,
  onView,
}) => {
  const { calculateNutrients, formatWeight, weightUnit } =
    useNutrientCalculator(ingredients, unitSystem);
  const nutrients = calculateNutrients(recipe);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 group flex flex-col hover:border-indigo-400 transition-all">
      <div className="flex justify-center items-center mb-2">
        <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full text-[9px] font-black uppercase tracking-wider">
          {recipe.type}
        </span>
      </div>
      <h3 className="text-center text-md font-bold mb-3 line-clamp-1">
        {recipe.title}
      </h3>

      <NutrientGrid
        nutrients={nutrients}
        formatWeight={formatWeight}
        weightUnit={weightUnit}
      />

      <button
        onClick={onView}
        className="mt-auto w-full py-2.5 rounded-xl border border-slate-100 dark:border-slate-700 text-[10px] font-bold uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
      >
        Edit
      </button>
    </div>
  );
};

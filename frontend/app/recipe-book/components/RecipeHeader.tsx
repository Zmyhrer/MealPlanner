"use client";

import React from "react";

interface RecipeHeaderProps {
  onGenerateAI: () => void;
  onAddRecipe: () => void;
  isGenerating: boolean;
}

export const RecipeHeader: React.FC<RecipeHeaderProps> = ({
  onGenerateAI,
  onAddRecipe,
  isGenerating,
}) => {
  return (
    <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
      <div>
        <h2 className="text-2xl font-bold">Recipe Book</h2>
        <p className="text-slate-500 text-sm">Central collection of meals</p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onAddRecipe}
          className="flex-1 md:flex-none bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow hover:bg-indigo-700 transition-all"
        >
          + New Recipe
        </button>
      </div>
    </header>
  );
};

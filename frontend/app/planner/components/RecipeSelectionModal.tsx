"use client";

import { useState, useMemo } from "react";
import { Recipe, MealType } from "@/lib/types";
import { filterRecipes } from "@/lib/services/searchService";

interface RecipeSelectionModalProps {
  activePicker: {
    dayIdx: number;
    type: MealType;
    snackIdx?: number;
  };
  searchQuery: string;
  userRecipes: Recipe[];
  onSearchChange: (query: string) => void;
  onSelectRecipe: (recipe: Recipe) => void;
  onClose: () => void;
}

export const RecipeSelectionModal: React.FC<RecipeSelectionModalProps> = ({
  activePicker,
  searchQuery,
  userRecipes,
  onSearchChange,
  onSelectRecipe,
  onClose,
}) => {
  const filteredChoices = useMemo(() => {
    return filterRecipes(userRecipes, searchQuery);
  }, [userRecipes, searchQuery]);

  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-lg z-[150] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 w-full max-w-2xl rounded-[3.5rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-white/20">
        <header className="p-10 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
          <div>
            <h3 className="text-3xl font-black tracking-tight">
              Add{" "}
              {activePicker.type === MealType.SNACKS
                ? "Snack"
                : activePicker.type}
            </h3>
            <p className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] mt-2">
              Personal Library Collection
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors p-2"
          >
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </header>

        <div className="p-8 border-b border-slate-50 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="relative">
            <input
              autoFocus
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Filter recipes..."
              className="w-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-3xl px-8 py-5 text-lg font-bold outline-none focus:border-indigo-500 shadow-sm transition-all pr-16"
            />
            <div className="absolute right-6 top-5 text-slate-300 text-2xl">
              🔍
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-4">
          <p className="text-[11px] font-black uppercase text-slate-400 tracking-[0.3em] mb-4">
            Results ({filteredChoices.length})
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredChoices.map((recipe) => (
              <button
                key={recipe.id}
                onClick={() => onSelectRecipe(recipe)}
                className="flex flex-col p-6 rounded-[2rem] border-2 border-slate-50 dark:border-slate-700 hover:border-indigo-500 hover:bg-indigo-50/10 transition-all text-left group"
              >
                <div className="flex-1 min-w-0 mb-3">
                  <h4 className="font-black text-lg truncate mb-1 group-hover:text-indigo-600 transition-colors">
                    {recipe.title}
                  </h4>
                  <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-[9px] uppercase font-black text-indigo-500 rounded-full tracking-widest">
                    {recipe.type}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-auto">
                  <span>{recipe.prepTime} min</span>
                  <span className="text-indigo-500">Select →</span>
                </div>
              </button>
            ))}
          </div>
          {filteredChoices.length === 0 && (
            <div className="text-center py-20 bg-slate-50/50 dark:bg-slate-900/50 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
              <p className="text-slate-400 text-xl font-bold italic">
                No matching recipes.
              </p>
              <p className="text-slate-300 text-sm font-medium mt-2">
                Try adjusting your search query.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

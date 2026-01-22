"use client";

import React from "react";
import { Recipe } from "@/lib/types";

interface RecipeDetailModalProps {
  recipe: Recipe;
  onClose: () => void;
  onEdit: (recipe: Recipe) => void;
}

export const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({
  recipe,
  onClose,
  onEdit,
}) => {
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <header className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
          <h3 className="text-xl font-bold">{recipe.title}</h3>
          <div className="flex gap-4">
            <button
              onClick={() => {
                onClose();
                onEdit(recipe);
              }}
              className="text-indigo-600 font-bold text-sm"
            >
              Edit
            </button>
            <button onClick={onClose} className="text-slate-400">
              ✕
            </button>
          </div>
        </header>
        <div className="p-6 overflow-y-auto space-y-6">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
            Instructions
          </p>
          <ol className="space-y-3">
            {recipe.instructions.map((step, idx) => (
              <li key={idx} className="text-sm flex gap-3">
                <span className="font-bold text-indigo-500">{idx + 1}.</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

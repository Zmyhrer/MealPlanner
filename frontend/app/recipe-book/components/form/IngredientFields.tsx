"use client";

import React, { KeyboardEvent } from "react";
import { UnitSystem } from "@/lib/types";

interface IngredientFieldsProps {
  ingredients: Array<{ name: string; amount: number; unit: string }>;
  unitSystem: UnitSystem;
  onUpdate: (
    ingredients: Array<{ name: string; amount: number; unit: string }>
  ) => void;
  onIngredientFieldChange: (
    index: number,
    field: "name" | "amount" | "unit",
    value: string | number
  ) => void;
  onAdd: () => void;
  onDelete: (index: number) => void;
  aiGeneratedIngredients?: boolean[];
}

export const IngredientFields: React.FC<IngredientFieldsProps> = ({
  ingredients,
  unitSystem,
  onUpdate,
  onIngredientFieldChange,
  onAdd,
  onDelete,
  aiGeneratedIngredients = [],
}) => {
  const commonUnits = [
    "", // Empty option first
    "cup",
    "tsp",
    "tbsp",
    "entire",
    "unit",
    "slice",
    "piece",
    "clove",
    "can",
    "bottle",
    ...(unitSystem === UnitSystem.METRIC
      ? ["g", "kg", "ml", "l"]
      : ["oz", "lb", "fl oz"]),
  ];

  const handleKeyDown = (e: KeyboardEvent, index: number) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (index === ingredients.length - 1) onAdd();
    }
  };

  return (
    <div className="space-y-3">
      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
        Ingredients
      </label>
      <div className="space-y-2">
        {ingredients.map((fi, idx) => (
          <div key={idx} className="flex gap-2 items-center">
            <input
              value={fi.name}
              onChange={(e) =>
                onIngredientFieldChange(idx, "name", e.target.value)
              }
              onKeyDown={(e) => handleKeyDown(e, idx)}
              placeholder="Item name"
              className={`flex-1 border rounded-xl px-3 py-2 text-sm ${
                aiGeneratedIngredients[idx]
                  ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                  : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700"
              }`}
            />
            <input
              type="number"
              step="any"
              value={fi.amount}
              onChange={(e) =>
                onIngredientFieldChange(idx, "amount", Number(e.target.value))
              }
              onKeyDown={(e) => handleKeyDown(e, idx)}
              placeholder="0"
              className={`w-20 border rounded-xl px-3 py-2 text-sm ${
                aiGeneratedIngredients[idx]
                  ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                  : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700"
              }`}
              min="0"
            />
            <select
              value={fi.unit}
              onChange={(e) =>
                onIngredientFieldChange(idx, "unit", e.target.value)
              }
              className={`w-28 border rounded-xl px-2 py-2 text-xs ${
                aiGeneratedIngredients[idx]
                  ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                  : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700"
              }`}
            >
              {commonUnits.map((u) => (
                <option key={u} value={u}>
                  {u || "Select unit"}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => onDelete(idx)}
              className="w-8 h-8 flex items-center justify-center text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
              aria-label="Delete ingredient"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        ))}
        {ingredients.length === 0 && (
          <div className="text-center py-4 text-slate-500 dark:text-slate-400 text-sm">
            No ingredients added yet. Click "Add Item" to get started.
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={onAdd}
        className="text-indigo-600 text-[10px] font-black uppercase tracking-widest bg-indigo-50 dark:bg-indigo-900/30 px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors w-full text-center"
      >
        + Add Item
      </button>
    </div>
  );
};

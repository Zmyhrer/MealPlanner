"use client";

import { Ingredient } from "@/lib/types";
import { EditForm } from "./EditForm";

interface IngredientTableRowProps {
  ingredient: Ingredient;
  editingId: string | null;
  editForm: Ingredient | null;
  onStartEditing: (ing: Ingredient) => void;
  onSave: () => void;
  onCancel: () => void;
  onUpdateNutrient: (
    field: keyof Ingredient["nutrientsPerUnit"],
    val: number
  ) => void;
  onUpdateField: (field: keyof Ingredient, value: any) => void;
}

export const IngredientTableRow: React.FC<IngredientTableRowProps> = ({
  ingredient,
  editingId,
  editForm,
  onStartEditing,
  onSave,
  onCancel,
  onUpdateNutrient,
  onUpdateField,
}) => {
  const isEditing = editingId === ingredient.id;

  return (
    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-700/20 transition-colors group">
      {isEditing && editForm ? (
        <EditForm
          editForm={editForm}
          onUpdateNutrient={onUpdateNutrient}
          onUpdateField={onUpdateField}
        />
      ) : (
        <>
          <td className="px-10 py-6">
            <span className="font-bold text-slate-800 dark:text-slate-100 text-base">
              {ingredient.name}
            </span>
          </td>
          <td className="px-10 py-6">
            <span className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:bg-indigo-50 transition-colors">
              {ingredient.category}
            </span>
          </td>
          <td className="px-10 py-6 text-center font-mono text-slate-400 font-bold">
            {ingredient.unitType}
          </td>
          <td className="px-10 py-6 text-center">
            <span className="font-mono font-black text-base">
              {Math.round(ingredient.nutrientsPerUnit.calories)}
            </span>
          </td>
          <td className="px-10 py-6 text-center">
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-black text-base">
              {ingredient.nutrientsPerUnit.protein}
            </span>
          </td>
          <td className="px-10 py-6 text-center">
            <span className="font-mono text-blue-600 dark:text-blue-400 font-black text-base">
              {ingredient.nutrientsPerUnit.carbs}
            </span>
          </td>
          <td className="px-10 py-6 text-center">
            <span className="font-mono text-amber-600 dark:text-amber-400 font-black text-base">
              {ingredient.nutrientsPerUnit.fat}
            </span>
          </td>
        </>
      )}

      <td className="px-10 py-6 text-right">
        {isEditing ? (
          <div className="flex justify-end gap-3">
            <button
              onClick={onSave}
              className="bg-indigo-600 text-white font-black text-[11px] uppercase tracking-widest px-4 py-2 rounded-xl shadow-lg shadow-indigo-200"
            >
              Save
            </button>
            <button
              onClick={onCancel}
              className="text-slate-400 font-black text-[11px] uppercase tracking-widest px-2 py-2"
            >
              Exit
            </button>
          </div>
        ) : (
          <button
            onClick={() => onStartEditing(ingredient)}
            className="text-slate-300 hover:text-indigo-600 font-black text-[11px] uppercase tracking-widest transition-all p-2 hover:bg-slate-100 rounded-xl"
          >
            Edit Entry
          </button>
        )}
      </td>
    </tr>
  );
};

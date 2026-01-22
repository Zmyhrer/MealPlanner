"use client";

import { Ingredient } from "@/lib/types";
import { IngredientTableHeader } from "./IngredientTableHeader";
import { IngredientTableRow } from "./IngredientTableRow";

interface IngredientTableProps {
  ingredients: Ingredient[];
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

export const IngredientTable: React.FC<IngredientTableProps> = ({
  ingredients,
  editingId,
  editForm,
  onStartEditing,
  onSave,
  onCancel,
  onUpdateNutrient,
  onUpdateField,
}) => {
  if (ingredients.length === 0) {
    return (
      <div className="px-10 py-32 text-center">
        <div className="flex flex-col items-center">
          <span className="text-6xl mb-6 opacity-20">🍃</span>
          <p className="text-slate-400 font-black text-xl italic uppercase tracking-[0.1em]">
            Database scan complete. No items found.
          </p>
          <p className="text-slate-300 text-sm mt-2">
            Try adding ingredients via the Recipe Book first.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <IngredientTableHeader />
        <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
          {ingredients.map((ingredient) => (
            <IngredientTableRow
              key={ingredient.id}
              ingredient={ingredient}
              editingId={editingId}
              editForm={editForm}
              onStartEditing={onStartEditing}
              onSave={onSave}
              onCancel={onCancel}
              onUpdateNutrient={onUpdateNutrient}
              onUpdateField={onUpdateField}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

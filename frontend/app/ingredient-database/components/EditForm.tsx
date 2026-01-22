"use client";

import { Ingredient } from "@/lib/types";

interface EditFormProps {
  editForm: Ingredient;
  onUpdateNutrient: (
    field: keyof Ingredient["nutrientsPerUnit"],
    val: number
  ) => void;
  onUpdateField: (field: keyof Ingredient, value: any) => void;
}

export const EditForm: React.FC<EditFormProps> = ({
  editForm,
  onUpdateNutrient,
  onUpdateField,
}) => {
  return (
    <>
      <td className="px-10 py-6">
        <input
          value={editForm.name}
          onChange={(e) => onUpdateField("name", e.target.value)}
          className="bg-slate-100 dark:bg-slate-900 border-2 border-indigo-200 rounded-xl px-3 py-1.5 w-full outline-none font-bold"
        />
      </td>
      <td className="px-10 py-6">
        <span className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-widest">
          {editForm.category}
        </span>
      </td>
      <td className="px-10 py-6 text-center font-mono text-slate-400 font-bold">
        {editForm.unitType}
      </td>
      <td className="px-10 py-6 text-center">
        <input
          type="number"
          value={editForm.nutrientsPerUnit.calories}
          onChange={(e) => onUpdateNutrient("calories", Number(e.target.value))}
          className="w-20 bg-slate-100 dark:bg-slate-900 rounded-xl px-2 py-1.5 outline-none font-bold text-center border-2 border-indigo-100"
        />
      </td>
      <td className="px-10 py-6 text-center">
        <input
          type="number"
          value={editForm.nutrientsPerUnit.protein}
          onChange={(e) => onUpdateNutrient("protein", Number(e.target.value))}
          className="w-16 bg-slate-100 dark:bg-slate-900 rounded-xl px-2 py-1.5 outline-none font-bold text-center border-2 border-emerald-100"
        />
      </td>
      <td className="px-10 py-6 text-center">
        <input
          type="number"
          value={editForm.nutrientsPerUnit.carbs}
          onChange={(e) => onUpdateNutrient("carbs", Number(e.target.value))}
          className="w-16 bg-slate-100 dark:bg-slate-900 rounded-xl px-2 py-1.5 outline-none font-bold text-center border-2 border-blue-100"
        />
      </td>
      <td className="px-10 py-6 text-center">
        <input
          type="number"
          value={editForm.nutrientsPerUnit.fat}
          onChange={(e) => onUpdateNutrient("fat", Number(e.target.value))}
          className="w-16 bg-slate-100 dark:bg-slate-900 rounded-xl px-2 py-1.5 outline-none font-bold text-center border-2 border-amber-100"
        />
      </td>
    </>
  );
};

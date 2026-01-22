"use client";

export const IngredientTableHeader: React.FC = () => {
  return (
    <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 font-black border-b border-slate-100 dark:border-slate-700 uppercase tracking-[0.2em] text-[11px]">
      <tr>
        <th className="px-10 py-6">Ingredient</th>
        <th className="px-10 py-6">Category</th>
        <th className="px-10 py-6 text-center">Unit</th>
        <th className="px-10 py-6 text-center">Calories</th>
        <th className="px-10 py-6 text-center">Prot</th>
        <th className="px-10 py-6 text-center">Carb</th>
        <th className="px-10 py-6 text-center">Fat</th>
        <th className="px-10 py-6 text-right">Actions</th>
      </tr>
    </thead>
  );
};

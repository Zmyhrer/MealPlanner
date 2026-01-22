"use client";

import React from "react";
import { Ingredient } from "@/lib/types";
import { useIngredientSearch } from "./hooks/useIngredientSearch";
import { useIngredientEdit } from "./hooks/useIngredientEdit";
import { IngredientSearch } from "./components/IngredientSearch";
import { IngredientTable } from "./components/IngredientTable";

interface IngredientDatabaseProps {
  ingredients: Ingredient[];
  onUpdateIngredient: (updated: Ingredient) => void;
}

export const IngredientDatabase: React.FC<IngredientDatabaseProps> = ({
  ingredients,
  onUpdateIngredient,
}) => {
  const { searchQuery, setSearchQuery, filteredIngredients } =
    useIngredientSearch(ingredients);
  const {
    editingId,
    editForm,
    startEditing,
    handleSave,
    cancelEditing,
    updateNutrient,
    updateField,
  } = useIngredientEdit(onUpdateIngredient);

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tight">
            Ingredient Vault
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Manage core nutritional records for your planner
          </p>
        </div>
        <IngredientSearch
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </header>

      <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden">
        <IngredientTable
          ingredients={filteredIngredients}
          editingId={editingId}
          editForm={editForm}
          onStartEditing={startEditing}
          onSave={handleSave}
          onCancel={cancelEditing}
          onUpdateNutrient={updateNutrient}
          onUpdateField={updateField}
        />
      </div>
    </div>
  );
};

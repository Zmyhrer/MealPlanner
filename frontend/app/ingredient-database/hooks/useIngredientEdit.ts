import { useState } from "react";
import { Ingredient, Nutrients } from "@/lib/types";

export const useIngredientEdit = (
  onUpdateIngredient: (updated: Ingredient) => void
) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Ingredient | null>(null);

  const startEditing = (ing: Ingredient) => {
    setEditingId(ing.id);
    setEditForm({ ...ing });
  };

  const handleSave = () => {
    if (editForm) {
      onUpdateIngredient(editForm);
      setEditingId(null);
      setEditForm(null);
    }
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const updateNutrient = (field: keyof Nutrients, val: number) => {
    if (editForm) {
      setEditForm({
        ...editForm,
        nutrientsPerUnit: {
          ...editForm.nutrientsPerUnit,
          [field]: val,
        },
      });
    }
  };

  const updateField = <K extends keyof Ingredient>(
    field: K,
    value: Ingredient[K]
  ) => {
    if (editForm) {
      setEditForm({
        ...editForm,
        [field]: value,
      });
    }
  };

  return {
    editingId,
    editForm,
    startEditing,
    handleSave,
    cancelEditing,
    updateNutrient,
    updateField,
  };
};

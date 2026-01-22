"use client";

import React, { useState } from "react";
import { Recipe, Ingredient, UnitSystem } from "@/lib/types";
import { RecipeForm } from "./components/RecipeForm";
import { RecipeCard } from "./components/RecipeCard";
import { RecipeHeader } from "./components/RecipeHeader";

interface RecipeBookProps {
  recipes: Recipe[];
  onAddRecipe: (recipe: Recipe) => void;
  onUpdateRecipe: (recipe: Recipe) => void;
  ingredients: Ingredient[];
  onAddIngredients: (ings: Ingredient[]) => void;
  unitSystem: UnitSystem;
  dietaryRestrictions: string[];
}

export const RecipeBook: React.FC<RecipeBookProps> = ({
  recipes,
  onAddRecipe,
  onUpdateRecipe,
  ingredients,
  onAddIngredients,
  unitSystem,
  dietaryRestrictions,
}) => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setSelectedRecipe(null);
    setIsModalOpen(false);
  };

  const handleOpenModal = (recipe?: Recipe) => {
    if (recipe) {
      setSelectedRecipe(recipe);
    } else {
      setSelectedRecipe(null); // This means we're creating a new recipe
    }
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <RecipeHeader
        onGenerateAI={() => {}}
        onAddRecipe={() => handleOpenModal()}
        isGenerating={false}
      />

      {isModalOpen && (
        <RecipeForm
          recipe={selectedRecipe || undefined}
          ingredients={ingredients}
          unitSystem={unitSystem}
          dietaryRestrictions={dietaryRestrictions}
          onSave={(recipe) => {
            if (selectedRecipe) {
              onUpdateRecipe(recipe);
            } else {
              onAddRecipe(recipe);
            }
            handleCloseModal();
          }}
          onAddIngredients={onAddIngredients}
          onCancel={handleCloseModal}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            ingredients={ingredients}
            unitSystem={unitSystem}
            onView={() => handleOpenModal(recipe)}
            onEdit={() => handleOpenModal(recipe)}
          />
        ))}
      </div>
    </div>
  );
};

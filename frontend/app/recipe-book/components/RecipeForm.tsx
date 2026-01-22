"use client";

import React, { useState, useEffect } from "react";
import {
  Recipe,
  Ingredient,
  UnitSystem,
  MealType,
  RecipeIngredient,
  SuggestedIngredient,
} from "@/lib/types";
import {
  fetchIngredientNutrients,
  generateRecipe,
} from "@/lib/services/geminiClient";
import { IngredientFields } from "./form/IngredientFields";
import { InstructionFields } from "./form/InstructionFields";
import { FormHeader } from "./form/FormHeader";
import { FormFooter } from "./form/FormFooter";

interface RecipeFormProps {
  recipe?: Recipe;
  ingredients: Ingredient[];
  servings: number;
  unitSystem: UnitSystem;
  dietaryRestrictions: string[];
  onSave: (recipe: Recipe) => void;
  onAddIngredients: (ings: Ingredient[]) => void;
  onCancel: () => void;
}

interface FormIngredient {
  name: string;
  amount: number;
  unit: string;
}

const MEAL_TYPE_OPTIONS = [
  { value: "", label: "Select meal type..." },
  { value: MealType.BREAKFAST, label: "Breakfast" },
  { value: MealType.LUNCH, label: "Lunch" },
  { value: MealType.DINNER, label: "Dinner" },
  { value: MealType.SNACK, label: "Snack" },
  { value: MealType.DESSERT, label: "Dessert" },
  { value: MealType.APPETIZER, label: "Appetizer" },
  { value: MealType.SIDE, label: "Side Dish" },
];

export const RecipeForm: React.FC<RecipeFormProps> = ({
  recipe,
  ingredients,
  unitSystem,
  dietaryRestrictions,
  onSave,
  onAddIngredients,
  onCancel,
}) => {
  const [title, setTitle] = useState(recipe?.title || "");
  const [type, setType] = useState<MealType | "">(recipe?.type || "");
  const [prepTime, setPrepTime] = useState(recipe?.prepTime || 0);
  const [servings, setServings] = useState(recipe?.servings || 0);
  const [tagsInput, setTagsInput] = useState(recipe?.tags.join(", ") || "");
  const [formIngredients, setFormIngredients] = useState<FormIngredient[]>([]);
  const [instructions, setInstructions] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Track which individual fields were AI-generated
  const [aiGeneratedFields, setAiGeneratedFields] = useState<{
    title?: boolean;
    type?: boolean;
    prepTime?: boolean;
    servings?: boolean;
    tags?: boolean;
    ingredients?: boolean[];
    instructions?: boolean[];
  }>({});

  useEffect(() => {
    if (recipe) {
      setTitle(recipe.title);
      setType(recipe.type);
      setPrepTime(recipe.prepTime);
      setServings(recipe.servings);
      setTagsInput(recipe.tags.join(", "));

      const mappedIngs = recipe.ingredients.map((ri) => {
        const base = ingredients.find((i) => i.id === ri.ingredientId);
        return {
          name: base?.name || "Unknown",
          amount: ri.amount,
          unit: ri.unit,
        };
      });
      setFormIngredients(mappedIngs);
      setInstructions(recipe.instructions);
    }
  }, [recipe, ingredients]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) {
      alert("Please enter a recipe title");
      return;
    }

    // Filter out empty ingredients and instructions
    const validIngredients = formIngredients.filter(
      (i) => i.name.trim() !== "",
    );
    const validInstructions = instructions.filter((i) => i.trim() !== "");

    setIsSaving(true);
    try {
      const newIngredientRecords: Ingredient[] = [];
      const recipeLinks: RecipeIngredient[] = [];

      for (const fi of validIngredients) {
        const existing = ingredients.find(
          (i) => i.name.toLowerCase() === fi.name.toLowerCase(),
        );
        let id = existing?.id;

        if (!existing) {
          id = Math.random().toString(36).substr(2, 9);
          const data = await fetchIngredientNutrients(
            fi.name,
            fi.unit || "unit",
          );
          newIngredientRecords.push({
            id,
            name: fi.name,
            category: data.category || "Other",
            nutrientsPerUnit: data.nutrientsPerUnit || {
              calories: 0,
              protein: 0,
              carbs: 0,
              fat: 0,
            },
            unitType: fi.unit || "unit",
          });
        }
        recipeLinks.push({
          ingredientId: id!,
          amount: fi.amount || 0,
          unit: fi.unit || "unit",
        });
      }

      if (newIngredientRecords.length > 0) {
        onAddIngredients(newIngredientRecords);
      }

      const newRecipe: Recipe = {
        id: recipe?.id || Math.random().toString(36).substr(2, 9),
        title,
        type: (type as MealType) || MealType.DINNER,
        ingredients: recipeLinks,
        instructions: validInstructions,
        prepTime: prepTime || 30,
        tags: tagsInput
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t !== ""),
        servings: servings || 4,
      };

      onSave(newRecipe);
      setAiGeneratedFields({});
    } catch (err) {
      console.error(err);
      alert("Failed to save recipe");
    } finally {
      setIsSaving(false);
    }
  };

  const handleGenerateAI = async () => {
    setIsGenerating(true);
    try {
      // Analyze what's already in the form
      const hasTitle = title.trim() !== "";
      const hasType = type !== "";
      const hasPrepTime = prepTime > 0;
      const hasServings = servings > 0;
      const hasTags = tagsInput.trim() !== "";

      // Analyze ingredients
      const existingIngredients = formIngredients
        .filter((i) => i.name.trim() !== "")
        .map((i) => `${i.amount} ${i.unit} ${i.name}`);

      // Analyze instructions
      const existingInstructions = instructions.filter((i) => i.trim() !== "");

      // Build a SMART context that tells AI exactly what to do
      const contextParts = [];

      // If user provided a title, tell AI to respect it
      if (hasTitle) {
        contextParts.push(
          `The recipe title is: "${title}". Use this exact title or something very similar.`,
        );

        // Add special instructions for simple recipes
        const simpleWords = [
          "toast",
          "butter",
          "bread",
          "egg",
          "eggs",
          "sandwich",
          "cereal",
          "oatmeal",
          "tea",
          "coffee",
        ];
        const isSimpleRecipe = simpleWords.some((word) =>
          title.toLowerCase().includes(word.toLowerCase()),
        );

        if (isSimpleRecipe) {
          contextParts.push(
            `This appears to be a simple recipe. Only include ingredients that make sense for "${title}". Keep it minimal and practical.`,
          );
        }
      }

      // If user already added ingredients, tell AI to build on them
      if (existingIngredients.length > 0) {
        contextParts.push(
          `The user already has these ingredients: ${existingIngredients.join(
            ", ",
          )}. Use these as a base and suggest complementary ingredients.`,
        );
      } else if (hasTitle) {
        // If no ingredients but there's a title, suggest appropriate ones
        contextParts.push(
          `Based on the title "${title}", suggest appropriate ingredients.`,
        );
      }

      // If user already added instructions, tell AI to continue them
      if (existingInstructions.length > 0) {
        contextParts.push(
          `The user already wrote these instructions: ${existingInstructions.join(
            " ",
          )}. Continue from here or improve them.`,
        );
      }

      // If user set meal type, prep time, or servings, respect those
      if (hasType) {
        contextParts.push(`Meal type should be: ${type}`);
      }

      if (hasPrepTime) {
        contextParts.push(
          `Preparation time should be around ${prepTime} minutes.`,
        );
      }

      if (hasServings) {
        contextParts.push(`The recipe should serve ${servings} people.`);
      }

      if (hasTags) {
        contextParts.push(`Tags to consider: ${tagsInput}`);
      }

      // Add dietary restrictions
      const preferences = [
        ...dietaryRestrictions,
        ...tagsInput
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t),
      ];

      // Determine meal type for AI
      const aiMealType =
        type ||
        (() => {
          const titleLower = title.toLowerCase();
          if (
            titleLower.includes("breakfast") ||
            titleLower.includes("egg") ||
            titleLower.includes("toast") ||
            titleLower.includes("cereal") ||
            titleLower.includes("pancake")
          ) {
            return MealType.BREAKFAST;
          } else if (
            titleLower.includes("lunch") ||
            titleLower.includes("sandwich") ||
            titleLower.includes("salad")
          ) {
            return MealType.LUNCH;
          } else if (
            titleLower.includes("dinner") ||
            titleLower.includes("steak") ||
            titleLower.includes("chicken") ||
            titleLower.includes("pasta")
          ) {
            return MealType.DINNER;
          } else if (
            titleLower.includes("dessert") ||
            titleLower.includes("cake") ||
            titleLower.includes("cookie") ||
            titleLower.includes("pie")
          ) {
            return MealType.DESSERT;
          } else if (titleLower.includes("snack")) {
            return MealType.SNACK;
          }
          return MealType.DINNER;
        })();

      const context =
        contextParts.length > 0
          ? contextParts.join(". ")
          : "Generate a new recipe.";

      // Call the generateRecipe function with enhanced context
      const result = await generateRecipe(
        aiMealType as MealType,
        preferences,
        unitSystem,
        context,
      );

      // SMART UPDATES: Only update what's missing or needs improvement
      const newAiGeneratedFields: typeof aiGeneratedFields = {
        ...aiGeneratedFields,
      };

      // Title: Only update if empty or very generic
      if ((!hasTitle || title.length < 3) && result.recipe.title) {
        setTitle(result.recipe.title);
        newAiGeneratedFields.title = true;
      }

      // Type: Only update if empty
      if (!hasType && result.recipe.type) {
        setType(result.recipe.type as MealType);
        newAiGeneratedFields.type = true;
      }

      // Prep time: Only update if not set
      if (!hasPrepTime && result.recipe.prepTime) {
        setPrepTime(result.recipe.prepTime);
        newAiGeneratedFields.prepTime = true;
      }

      // Servings: Only update if not set
      if (!hasServings) {
        setServings(result.recipe.servings || 0);
        newAiGeneratedFields.servings = true;
      }

      // Tags: Only update if empty
      if (!hasTags && result.recipe.title) {
        const suggestedTags = [];
        if (result.recipe.title.toLowerCase().includes("vegetarian"))
          suggestedTags.push("vegetarian");
        if (result.recipe.title.toLowerCase().includes("vegan"))
          suggestedTags.push("vegan");
        if (
          result.recipe.title.toLowerCase().includes("quick") ||
          result.recipe.prepTime < 30
        )
          suggestedTags.push("quick");
        if (result.recipe.title.toLowerCase().includes("easy"))
          suggestedTags.push("easy");
        if (result.recipe.title.toLowerCase().includes("healthy"))
          suggestedTags.push("healthy");

        // Add meal type tag
        if (result.recipe.type === MealType.BREAKFAST)
          suggestedTags.push("breakfast");
        if (result.recipe.type === MealType.LUNCH) suggestedTags.push("lunch");
        if (result.recipe.type === MealType.DINNER)
          suggestedTags.push("dinner");
        if (result.recipe.type === MealType.DESSERT)
          suggestedTags.push("dessert");
        if (result.recipe.type === MealType.SNACK) suggestedTags.push("snack");

        if (suggestedTags.length > 0) {
          setTagsInput(suggestedTags.join(", "));
          newAiGeneratedFields.tags = true;
        }
      }

      // INGREDIENTS: Smart merging
      if (result.recipe.ingredients.length > 0) {
        const existingIngredientNames = new Set(
          existingIngredients.map((ing) => {
            const match = ing.match(/\d+\s+\w+\s+(.+)/);
            return match ? match[1].toLowerCase() : ing.toLowerCase();
          }),
        );

        const newIngredients = result.recipe.ingredients
          .filter((ing) => {
            const ingNameLower = ing.name.toLowerCase();
            return !existingIngredientNames.has(ingNameLower);
          })
          .map((ing) => ({
            name: ing.name,
            amount: ing.amount || 0,
            unit: ing.unit || "",
          }));

        // Track AI-generated ingredients
        const aiGeneratedIngredientIndexes: boolean[] = [];
        const finalIngredients = [
          ...formIngredients.filter((i) => i.name.trim() !== ""),
          ...newIngredients,
        ];

        // Mark new ingredients as AI-generated
        newIngredients.forEach((ing, index) => {
          const finalIndex =
            formIngredients.filter((i) => i.name.trim() !== "").length + index;
          aiGeneratedIngredientIndexes[finalIndex] = true;
        });

        if (aiGeneratedIngredientIndexes.some(Boolean)) {
          newAiGeneratedFields.ingredients = aiGeneratedIngredientIndexes;
        }

        setFormIngredients(finalIngredients);
      }

      // INSTRUCTIONS: Smart merging
      if (result.recipe.instructions.length > 0) {
        const aiGeneratedInstructionIndexes: boolean[] = [];
        const finalInstructions = [
          ...existingInstructions,
          ...result.recipe.instructions,
        ];

        // Mark new instructions as AI-generated
        result.recipe.instructions.forEach((_, index) => {
          const finalIndex = existingInstructions.length + index;
          aiGeneratedInstructionIndexes[finalIndex] = true;
        });

        if (aiGeneratedInstructionIndexes.some(Boolean)) {
          newAiGeneratedFields.instructions = aiGeneratedInstructionIndexes;
        }

        setInstructions(finalInstructions);
      }

      setAiGeneratedFields(newAiGeneratedFields);

      // Auto-add suggested ingredients
      const newIngredientRecords: Ingredient[] =
        result.suggestedIngredients.map((ing: SuggestedIngredient) => ({
          id: Math.random().toString(36).substr(2, 9),
          name: ing.name,
          category: ing.category,
          nutrientsPerUnit: ing.nutrientsPerUnit,
          unitType: ing.unit,
        }));

      if (newIngredientRecords.length > 0) {
        onAddIngredients(newIngredientRecords);
      }
    } catch (error) {
      console.error("AI generation failed:", error);
      alert("Failed to generate recipe. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Delete ingredient handler - allow empty array
  const handleDeleteIngredient = (index: number) => {
    const newIngredients = formIngredients.filter((_, i) => i !== index);
    setFormIngredients(newIngredients);

    // Remove AI flag for deleted ingredient
    if (aiGeneratedFields.ingredients) {
      const newAiIngredients = [...aiGeneratedFields.ingredients];
      newAiIngredients.splice(index, 1);
      setAiGeneratedFields({
        ...aiGeneratedFields,
        ingredients: newAiIngredients.length > 0 ? newAiIngredients : undefined,
      });
    }
  };

  // Delete instruction handler - allow empty array
  const handleDeleteInstruction = (index: number) => {
    const newInstructions = instructions.filter((_, i) => i !== index);
    setInstructions(newInstructions);

    // Remove AI flag for deleted instruction
    if (aiGeneratedFields.instructions) {
      const newAiInstructions = [...aiGeneratedFields.instructions];
      newAiInstructions.splice(index, 1);
      setAiGeneratedFields({
        ...aiGeneratedFields,
        instructions:
          newAiInstructions.length > 0 ? newAiInstructions : undefined,
      });
    }
  };

  // Handle field changes to clear AI highlighting
  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (aiGeneratedFields.title) {
      setAiGeneratedFields({ ...aiGeneratedFields, title: false });
    }
  };

  const handleTypeChange = (value: MealType) => {
    setType(value);
    if (aiGeneratedFields.type) {
      setAiGeneratedFields({ ...aiGeneratedFields, type: false });
    }
  };

  const handlePrepTimeChange = (value: number) => {
    setPrepTime(value);
    if (aiGeneratedFields.prepTime) {
      setAiGeneratedFields({ ...aiGeneratedFields, prepTime: false });
    }
  };

  const handleServingsChange = (value: number) => {
    setServings(value);
    if (aiGeneratedFields.servings) {
      setAiGeneratedFields({ ...aiGeneratedFields, servings: false });
    }
  };

  const handleTagsChange = (value: string) => {
    setTagsInput(value);
    if (aiGeneratedFields.tags) {
      setAiGeneratedFields({ ...aiGeneratedFields, tags: false });
    }
  };

  const handleIngredientsChange = (newIngredients: FormIngredient[]) => {
    setFormIngredients(newIngredients);
    // Clear AI flags when ingredients are manually changed
    if (aiGeneratedFields.ingredients) {
      setAiGeneratedFields({ ...aiGeneratedFields, ingredients: undefined });
    }
  };

  const handleIngredientFieldChange = (
    index: number,
    field: "name" | "amount" | "unit",
    value: string | number,
  ) => {
    const newIngredients = [...formIngredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setFormIngredients(newIngredients);

    // Clear AI flag for this specific ingredient
    if (aiGeneratedFields.ingredients?.[index]) {
      const newAiIngredients = [...aiGeneratedFields.ingredients];
      newAiIngredients[index] = false;
      setAiGeneratedFields({
        ...aiGeneratedFields,
        ingredients: newAiIngredients,
      });
    }
  };

  const handleInstructionsChange = (newInstructions: string[]) => {
    setInstructions(newInstructions);
    // Clear AI flags when instructions are manually changed
    if (aiGeneratedFields.instructions) {
      setAiGeneratedFields({ ...aiGeneratedFields, instructions: undefined });
    }
  };

  const handleInstructionChange = (index: number, value: string) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);

    // Clear AI flag for this specific instruction
    if (aiGeneratedFields.instructions?.[index]) {
      const newAiInstructions = [...aiGeneratedFields.instructions];
      newAiInstructions[index] = false;
      setAiGeneratedFields({
        ...aiGeneratedFields,
        instructions: newAiInstructions,
      });
    }
  };

  // Handle clear all button click
  const handleClearAll = () => {
    setShowClearConfirm(true);
  };

  // Confirm clear all action
  const confirmClearAll = () => {
    // Reset all fields to default values
    setTitle("");
    setType("");
    setPrepTime(0);
    setServings(0);
    setTagsInput("");
    setFormIngredients([]); // Empty array
    setInstructions([]); // Empty array

    // Clear AI generated flags
    setAiGeneratedFields({});

    setShowClearConfirm(false);
  };

  // Cancel clear all action
  const cancelClearAll = () => {
    setShowClearConfirm(false);
  };

  // Add new ingredient
  const handleAddIngredient = () => {
    setFormIngredients([
      ...formIngredients,
      {
        name: "",
        amount: 0,
        unit: "",
      },
    ]);
  };

  // Add new instruction
  const handleAddInstruction = () => {
    setInstructions([...instructions, ""]);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      {/* Clear All Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[200]">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-sm mx-4 shadow-2xl">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 dark:bg-red-900/30 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-center mb-2">
              Clear Everything?
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-center mb-6">
              This will clear all recipe details. AI will regenerate empty
              fields.
            </p>
            <div className="flex gap-3">
              <button
                onClick={cancelClearAll}
                className="flex-1 px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmClearAll}
                className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-medium"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-slate-800 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <FormHeader
          title={recipe ? "Edit Recipe" : "New Recipe"}
          onClose={onCancel}
        />

        <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-6">
          {/* Basic info fields */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
              Recipe Title
            </label>
            <input
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. Avocado Toast"
              className={`w-full bg-slate-50 dark:bg-slate-900 border rounded-xl px-4 py-2.5 outline-none font-medium ${
                aiGeneratedFields.title
                  ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                  : "border-slate-200 dark:border-slate-700"
              }`}
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                Meal Type
              </label>
              <select
                value={type}
                onChange={(e) => handleTypeChange(e.target.value as MealType)}
                className={`w-full bg-slate-50 dark:bg-slate-900 border rounded-xl px-4 py-2.5 outline-none text-sm ${
                  aiGeneratedFields.type
                    ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                    : "border-slate-200 dark:border-slate-700"
                }`}
                required
              >
                {MEAL_TYPE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                Servings
              </label>
              <input
                type="number"
                value={servings}
                onChange={(e) => handleServingsChange(Number(e.target.value))}
                placeholder="0"
                className={`w-full bg-slate-50 dark:bg-slate-900 border rounded-xl px-4 py-2.5 outline-none ${
                  aiGeneratedFields.servings
                    ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                    : "border-slate-200 dark:border-slate-700"
                }`}
                min="0"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                Prep Time (Min)
              </label>
              <input
                type="number"
                value={prepTime}
                onChange={(e) => handlePrepTimeChange(Number(e.target.value))}
                placeholder="0"
                className={`w-full bg-slate-50 dark:bg-slate-900 border rounded-xl px-4 py-2.5 outline-none ${
                  aiGeneratedFields.prepTime
                    ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                    : "border-slate-200 dark:border-slate-700"
                }`}
                min="0"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
              Tags (comma separated)
            </label>
            <input
              value={tagsInput}
              onChange={(e) => handleTagsChange(e.target.value)}
              placeholder="e.g. vegetarian, quick, healthy"
              className={`w-full bg-slate-50 dark:bg-slate-900 border rounded-xl px-4 py-2.5 outline-none text-sm ${
                aiGeneratedFields.tags
                  ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                  : "border-slate-200 dark:border-slate-700"
              }`}
            />
          </div>

          <IngredientFields
            ingredients={formIngredients}
            unitSystem={unitSystem}
            onUpdate={handleIngredientsChange}
            onIngredientFieldChange={handleIngredientFieldChange}
            onAdd={handleAddIngredient}
            onDelete={handleDeleteIngredient}
            aiGeneratedIngredients={aiGeneratedFields.ingredients}
          />

          <InstructionFields
            instructions={instructions}
            onUpdate={handleInstructionsChange}
            onInstructionChange={handleInstructionChange}
            onAdd={handleAddInstruction}
            onDelete={handleDeleteInstruction}
            aiGeneratedInstructions={aiGeneratedFields.instructions}
          />

          {/* Clear All Button */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={handleClearAll}
              className="w-full px-4 py-3 text-red-500 border-2 border-red-200 dark:border-red-900/30 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors flex items-center justify-center gap-2 font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Clear All Recipe Details
            </button>
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-2">
              AI will regenerate empty fields when you click Generate
            </p>
          </div>
        </form>

        <FormFooter
          onCancel={onCancel}
          onSave={handleSave}
          isSaving={isSaving}
          isGenerating={isGenerating}
          onGenerateAI={handleGenerateAI}
          hasRecipe={!!recipe}
        />
      </div>
    </div>
  );
};

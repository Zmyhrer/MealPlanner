"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "@/styles/mealForm.module.css";
import { Meal } from "@/services/mealService";

interface Ingredient {
  quantity: string;
  unit: string;
  name: string;
}

interface MealFormProps {
  title: string;
  submit: (meal: Meal) => Promise<Meal>;
  mealId?: string;
  initialMeal?: Meal;
}

const MealForm: React.FC<MealFormProps> = ({
  title,
  submit,
  mealId,
  initialMeal,
}) => {
  const [mealName, setMealName] = useState(initialMeal?.mealName || "");
  const [tags, setTags] = useState<string[]>(initialMeal?.tags || []);
  const [tagInput, setTagInput] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>(
    initialMeal?.ingredients || [{ quantity: "", unit: "g", name: "" }]
  );
  const [instructions, setInstructions] = useState(
    initialMeal?.instructions || ""
  );

  const ingredientRefs = useRef<Array<HTMLInputElement | null>>([]);

  // Tags
  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleKeyDownTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  // Ingredients
  const handleIngredientChange = (
    index: number,
    field: keyof Ingredient,
    value: string
  ) => {
    const updated = [...ingredients];
    updated[index][field] = value;
    setIngredients(updated);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { quantity: "", unit: "g", name: "" }]);
  };

  const handleRemoveIngredient = (index: number) => {
    const updated = [...ingredients];
    updated.splice(index, 1);
    setIngredients(updated);
  };

  useEffect(() => {
    const lastIndex = ingredients.length - 1;
    ingredientRefs.current[lastIndex]?.focus();
  }, [ingredients.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const meal: Meal = {
      mealName,
      tags,
      ingredients,
      instructions,
    };

    try {
      await submit(meal);
      alert("Meal submitted successfully");

      // Reset form only if not editing
      if (!initialMeal) {
        setMealName("");
        setTags([]);
        setIngredients([{ quantity: "", unit: "g", name: "" }]);
        setInstructions("");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to submit meal");
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <h1>{title}</h1>

      {/* Meal Name */}
      <label htmlFor="mealName">Meal Name:</label>
      <input
        id="mealName"
        type="text"
        value={mealName}
        onChange={(e) => setMealName(e.target.value)}
        placeholder="Enter meal name"
        required
      />

      {/* Tags */}
      <div className={styles.section}>
        <label htmlFor="tags">Tags:</label>
        <div className={styles.inlineInput}>
          <input
            id="tags"
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="Enter tag"
            onKeyDown={handleKeyDownTag}
          />
          <button type="button" onClick={handleAddTag}>
            Add
          </button>
        </div>
        <div className={styles.tagsList}>
          {tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {"#" + tag}{" "}
              <button type="button" onClick={() => handleRemoveTag(tag)}>
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Ingredients */}
      <div className={styles.section}>
        <label>Ingredients:</label>
        {ingredients.map((ing, index) => (
          <div key={index} className={styles.inlineInput}>
            <input
              type="text"
              value={ing.quantity}
              onChange={(e) =>
                handleIngredientChange(index, "quantity", e.target.value)
              }
              placeholder="Qty (1, 1/2)"
              required
              ref={(el) => {
                ingredientRefs.current[index] = el;
              }}
            />
            <select
              value={ing.unit}
              required
              onChange={(e) =>
                handleIngredientChange(index, "unit", e.target.value)
              }
            >
              <option value="tsp">tsp(s)</option>
              <option value="tbsp">tbsp(s)</option>
              <option value="cup">cup(s)</option>
              <option value="g">g(s)</option>
              <option value="kg">kg(s)</option>
              <option value="ml">ml(s)</option>
              <option value="l">l(s)</option>
            </select>
            <input
              type="text"
              value={ing.name}
              onChange={(e) =>
                handleIngredientChange(index, "name", e.target.value)
              }
              placeholder="Ingredient"
              required
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (ingredientRefs.current[index + 1]) {
                    ingredientRefs.current[index + 1]?.focus();
                  } else {
                    handleAddIngredient();
                  }
                }
              }}
            />
            <button type="button" onClick={() => handleRemoveIngredient(index)}>
              ×
            </button>
          </div>
        ))}
        <button
          className={styles.addMoreButton}
          type="button"
          onClick={handleAddIngredient}
        >
          Add More
        </button>
      </div>

      {/* Instructions */}
      <label htmlFor="instructions">Instructions:</label>
      <textarea
        className={styles.instructions}
        id="instructions"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        placeholder="Enter cooking instructions"
        rows={5}
        required
      />

      <button type="submit">Submit Meal</button>
    </form>
  );
};

export default MealForm;

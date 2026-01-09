"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "@/styles/mealForm.module.css";
import { Meal } from "../../shared/types/meal";

interface MealFormProps {
  title: string;
  submit: (meal: Meal) => Promise<Meal>;
  initialMeal?: Meal;
}

const MealForm: React.FC<MealFormProps> = ({ title, submit, initialMeal }) => {
  const [mealName, setMealName] = useState(initialMeal?.mealName ?? "");
  const [tags, setTags] = useState<string[]>(initialMeal?.tags ?? []);
  const [tagInput, setTagInput] = useState("");
  const [ingredients, setIngredients] = useState(
    initialMeal?.ingredients ?? [{ quantity: "", unit: "g", name: "" }]
  );
  const [instructions, setInstructions] = useState(
    initialMeal?.instructions ?? ""
  );

  const ingredientRefs = useRef<Array<HTMLInputElement | null>>([]);

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

  const handleIngredientChange = (
    index: number,
    field: "quantity" | "unit" | "name",
    value: string
  ) => {
    const updated = [...ingredients];
    updated[index] = { ...updated[index], [field]: value };
    setIngredients(updated);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { quantity: "", unit: "g", name: "" }]);
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  useEffect(() => {
    ingredientRefs.current[ingredients.length - 1]?.focus();
  }, [ingredients.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const meal: Meal = {
      id: initialMeal?.id ?? crypto.randomUUID(),
      mealName,
      tags,
      ingredients,
      instructions,
    };

    await submit(meal);

    if (!initialMeal) {
      setMealName("");
      setTags([]);
      setIngredients([{ quantity: "", unit: "g", name: "" }]);
      setInstructions("");
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <h1>{title}</h1>

      <label htmlFor="mealName">Meal Name:</label>
      <input
        id="mealName"
        type="text"
        value={mealName}
        onChange={(e) => setMealName(e.target.value)}
        required
      />

      <div className={styles.section}>
        <label>Tags:</label>
        <div className={styles.inlineInput}>
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleKeyDownTag}
            className={styles.tagInput}
          />
          <button
            type="button"
            onClick={handleAddTag}
            className={styles.addTagButton}
          >
            Add
          </button>
        </div>

        <div className={styles.tagsList}>
          {tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              #{tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className={styles.removeTagButton}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <label>Ingredients:</label>
        {ingredients.map((ing, index) => (
          <div key={index} className={styles.inlineInput}>
            <input
              value={ing.quantity}
              onChange={(e) =>
                handleIngredientChange(index, "quantity", e.target.value)
              }
              ref={(el) => {
                ingredientRefs.current[index] = el;
              }}
              required
            />
            <select
              value={ing.unit}
              onChange={(e) =>
                handleIngredientChange(index, "unit", e.target.value)
              }
            >
              <option value="tsp">tsp</option>
              <option value="tbsp">tbsp</option>
              <option value="cup">cup</option>
              <option value="g">g</option>
              <option value="kg">kg</option>
              <option value="ml">ml</option>
              <option value="l">l</option>
            </select>
            <input
              value={ing.name}
              onChange={(e) =>
                handleIngredientChange(index, "name", e.target.value)
              }
              required
            />
            <button
              className={styles.ingredientDeleteButton}
              type="button"
              onClick={() => handleRemoveIngredient(index)}
            >
              ×
            </button>
          </div>
        ))}
        <button
          className={styles.ingredientAddMoreButton}
          type="button"
          onClick={handleAddIngredient}
        >
          Add More
        </button>
      </div>

      <label>Instructions:</label>
      <textarea
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        rows={5}
        required
      />

      <button type="submit">Submit Meal</button>
    </form>
  );
};

export default MealForm;

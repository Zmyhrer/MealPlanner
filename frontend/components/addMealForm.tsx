// components/AddMealForm.tsx
import React, { useState } from "react";
import Styles from "@/styles/addMealForm.module.css";

interface Ingredient {
  quantity: string;
  unit: string;
  name: string;
}

const AddMealForm: React.FC = () => {
  const [mealName, setMealName] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { quantity: "", unit: "g", name: "" },
  ]);
  const [instructions, setInstructions] = useState("");

  // Tags
  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
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

  // Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      mealName,
      tags,
      ingredients,
      instructions,
    });
    alert(`Meal added: ${mealName}`);
    setMealName("");
    setTags([]);
    setIngredients([{ quantity: "", unit: "g", name: "" }]);
    setInstructions("");
  };

  return (
    <form className={Styles.formContainer} onSubmit={handleSubmit}>
      <h2>Add a Meal</h2>

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
      <div className={Styles.section}>
        <label htmlFor="tags">Tags:</label>
        <div className={Styles.inlineInput}>
          <input
            id="tags"
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="Enter tag"
          />
          <button type="button" onClick={handleAddTag}>
            Add
          </button>
        </div>
        <div className={Styles.tagsList}>
          {tags.map((tag) => (
            <span key={tag} className={Styles.tag}>
              {"#" + tag}{" "}
              <button type="button" onClick={() => handleRemoveTag(tag)}>
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Ingredients */}
      <div className={Styles.section}>
        <label>Ingredients:</label>
        {ingredients.map((ing, index) => (
          <div key={index} className={Styles.inlineInput}>
            <input
              type="text"
              value={ing.quantity}
              onChange={(e) =>
                handleIngredientChange(index, "quantity", e.target.value)
              }
              placeholder="Qty (1, 1/2)"
              required
            />
            <select
              value={ing.unit}
              onChange={(e) =>
                handleIngredientChange(index, "unit", e.target.value)
              }
            >
              <option value="g">g(s)</option>
              <option value="kg">kg(s)</option>
              <option value="ml">ml(s)</option>
              <option value="l">l(s)</option>
              <option value="tsp">tsp(s)</option>
              <option value="tbsp">tbsp(s)</option>
              <option value="cup">cup(s)</option>
            </select>
            <input
              type="text"
              value={ing.name}
              onChange={(e) =>
                handleIngredientChange(index, "name", e.target.value)
              }
              placeholder="Ingredient"
              required
            />
            <button type="button" onClick={() => handleRemoveIngredient(index)}>
              ×
            </button>
          </div>
        ))}
        <button
          className={Styles.addMoreButton}
          type="button"
          onClick={handleAddIngredient}
        >
          Add More
        </button>
      </div>

      {/* Instructions */}
      <label htmlFor="instructions">Instructions:</label>
      <textarea
        className={Styles.instructions}
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

export default AddMealForm;

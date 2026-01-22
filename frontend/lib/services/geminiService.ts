import { GoogleGenAI, Type } from "@google/genai";
import {
  MealType,
  UnitSystem,
  Ingredient,
  SuggestedIngredient,
} from "@/lib/types";
import { Recipe } from "@/lib/types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const INGREDIENT_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING },
    amount: { type: Type.NUMBER },
    unit: { type: Type.STRING },
    category: { type: Type.STRING },
    nutrientsPerUnit: {
      type: Type.OBJECT,
      properties: {
        calories: { type: Type.NUMBER },
        protein: { type: Type.NUMBER },
        carbs: { type: Type.NUMBER },
        fat: { type: Type.NUMBER },
      },
      required: ["calories", "protein", "carbs", "fat"],
    },
  },
  required: ["name", "amount", "unit", "category", "nutrientsPerUnit"],
};

const RECIPE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    type: { type: Type.STRING },
    ingredients: {
      type: Type.ARRAY,
      items: INGREDIENT_SCHEMA,
    },
    instructions: { type: Type.ARRAY, items: { type: Type.STRING } },
    prepTime: { type: Type.NUMBER },
  },
  required: ["title", "type", "ingredients", "instructions", "prepTime"],
};

export const generateRecipe = async (
  mealType: MealType,
  preferences: string[],
  unitSystem: UnitSystem
): Promise<{ recipe: Recipe; suggestedIngredients: SuggestedIngredient[] }> => {
  const prompt = `Generate a delicious, ${mealType} recipe. 
  Preferences: ${preferences.join(", ")}. 
  Units: ${unitSystem}.
  Crucially, for EACH ingredient, provide estimated nutritional information (calories, protein, carbs, fat) for 1 unit of that ingredient in the specified unit system.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: RECIPE_SCHEMA,
    },
  });

  const text = response.text;
  if (!text) {
    throw new Error("The model did not return a response.");
  }

  const raw = JSON.parse(text);
  return {
    recipe: raw,
    suggestedIngredients: raw.ingredients,
  };
};

export const fetchIngredientNutrients = async (
  name: string,
  unit: string
): Promise<Partial<Ingredient>> => {
  const prompt = `Provide nutritional information for 1 ${unit} of ${name}. Include category and nutrients (calories, protein, carbs, fat).`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          category: { type: Type.STRING },
          nutrientsPerUnit: {
            type: Type.OBJECT,
            properties: {
              calories: { type: Type.NUMBER },
              protein: { type: Type.NUMBER },
              carbs: { type: Type.NUMBER },
              fat: { type: Type.NUMBER },
            },
            required: ["calories", "protein", "carbs", "fat"],
          },
        },
        required: ["category", "nutrientsPerUnit"],
      },
    },
  });

  return JSON.parse(response.text || "{}");
};

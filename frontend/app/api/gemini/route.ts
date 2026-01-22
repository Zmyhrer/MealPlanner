import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";
import { MealType, UnitSystem } from "@/lib/types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      systemPrompt,
      ingredientName,
      unit,
      mealType,
      preferences,
      unitSystem,
      context,
    } = body;

    if (ingredientName && unit) {
      // Handle ingredient nutrient lookup with improved prompt
      const nutrientPrompt =
        systemPrompt ||
        `You are a nutrition data assistant. Provide accurate nutritional information.

IMPORTANT RULES:
1. Be realistic and practical
2. Use standard nutritional values
3. Categorize appropriately (e.g., "Dairy", "Produce", "Protein", "Grain", "Condiment")
4. Estimate for 1 ${unit} of ${ingredientName}

Example outputs:
- "butter, tbsp": {"category": "Dairy", "nutrientsPerUnit": {"calories": 102, "protein": 0.1, "carbs": 0, "fat": 11.5}}
- "bread, slice": {"category": "Grain", "nutrientsPerUnit": {"calories": 80, "protein": 3, "carbs": 15, "fat": 1}}
- "egg, unit": {"category": "Protein", "nutrientsPerUnit": {"calories": 72, "protein": 6, "carbs": 0.4, "fat": 5}}
- "avocado, unit": {"category": "Produce", "nutrientsPerUnit": {"calories": 240, "protein": 3, "carbs": 13, "fat": 22}}

Now provide data for: ${ingredientName} (${unit})`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: nutrientPrompt,
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
          temperature: 0.3, // Lower temperature for more consistent nutrition data
        },
      });

      return NextResponse.json(JSON.parse(response.text || "{}"));
    } else {
      // Handle recipe generation with improved prompt
      const recipeSystemPrompt =
        systemPrompt ||
        `You are a helpful recipe assistant. Follow these rules CAREFULLY:

IMPORTANT RULES:
1. RESPECT USER CONTEXT: If the user provides context about existing ingredients/instructions, build upon them intelligently.
2. MATCH THE TITLE: If user mentions a specific recipe title, create a recipe that logically matches it.
3. KEEP IT SIMPLE: For simple recipe titles (like "butter toast", "scrambled eggs"), use only basic, obvious ingredients.
4. BE PRACTICAL: Don't add unnecessary fancy ingredients to simple recipes.
5. USE CONTEXT: If user mentions preferences/dietary restrictions, incorporate them.
6. APPROPRIATE COMPLEXITY: Match recipe complexity to the meal type and title.
7. CLEAR INSTRUCTIONS: Provide step-by-step instructions that are easy to follow.
8. NUTRITION: For each ingredient, provide realistic nutritional estimates.
9. UNITS: Use ${
          unitSystem === UnitSystem.METRIC
            ? "metric (g, ml, etc.)"
            : "imperial (oz, cups, etc.)"
        } units consistently.`;

      // Build user prompt with context
      let userPrompt = `Generate a ${mealType} recipe.`;

      if (preferences && preferences.length > 0) {
        userPrompt += ` Preferences: ${preferences.join(", ")}.`;
      }

      if (context && context.trim().length > 0) {
        userPrompt += `\n\nUSER'S CURRENT FORM CONTEXT:\n${context}\n\nIMPORTANT: Use this context to inform your generation.`;
      }

      userPrompt += `\n\nOutput in the specified JSON format.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            role: "user",
            parts: [{ text: recipeSystemPrompt }],
          },
          {
            role: "model",
            parts: [
              {
                text: "I understand. I will follow all rules carefully, respect user context, keep recipes appropriate, and output valid JSON.",
              },
            ],
          },
          {
            role: "user",
            parts: [{ text: userPrompt }],
          },
        ],
        config: {
          responseMimeType: "application/json",
          responseSchema: RECIPE_SCHEMA,
          temperature: 0.7, // Slightly lower temperature for more consistent results
          topP: 0.8,
          topK: 40,
        },
      });

      const text = response.text;
      if (!text) {
        throw new Error("The model did not return a response.");
      }

      const raw = JSON.parse(text);

      // Validate the response has basic structure
      if (
        !raw.title ||
        !Array.isArray(raw.ingredients) ||
        !Array.isArray(raw.instructions)
      ) {
        throw new Error("Invalid recipe structure returned from AI");
      }

      // Ensure all ingredients have required fields
      const validatedIngredients = raw.ingredients.map((ing: any) => ({
        name: ing.name || "Unknown",
        amount: ing.amount || 1,
        unit: ing.unit || (unitSystem === UnitSystem.METRIC ? "g" : "oz"),
        category: ing.category || "Other",
        nutrientsPerUnit: ing.nutrientsPerUnit || {
          calories: 0,
          protein: 0,
          carbs: 0,
          fat: 0,
        },
      }));

      return NextResponse.json({
        recipe: {
          ...raw,
          ingredients: validatedIngredients,
          prepTime: raw.prepTime || 30,
          type: raw.type || mealType,
        },
        suggestedIngredients: validatedIngredients,
      });
    }
  } catch (error) {
    console.error("Gemini API error:", error);

    // Provide more helpful error messages
    let errorMessage = "Failed to process request";
    let errorDetails = error instanceof Error ? error.message : "Unknown error";

    if (errorDetails.includes("429")) {
      errorMessage = "API rate limit exceeded. Please try again in a moment.";
    } else if (errorDetails.includes("400")) {
      errorMessage = "Invalid request to AI service. Please check your input.";
    } else if (errorDetails.includes("500")) {
      errorMessage = "AI service temporarily unavailable. Please try again.";
    } else if (
      errorDetails.includes("JSON") ||
      errorDetails.includes("parse")
    ) {
      errorMessage =
        "Failed to parse AI response. The AI may have returned invalid format.";
    }

    return NextResponse.json(
      {
        error: errorMessage,
        details: errorDetails,
      },
      { status: 500 }
    );
  }
}

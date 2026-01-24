import { Router, Request, Response } from "express";
import * as ingredientNutrientsService from "../services/ingredientNutrientsService";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { ingredient_id, nutrient_id, unit, value } = req.body;
    const ingredient_nutrients =
      await ingredientNutrientsService.addIngredientNutrients(
        ingredient_id,
        nutrient_id,
        unit,
        value,
      );
    res.status(201).json(ingredient_nutrients);
  } catch (err: any) {
    console.error("Error adding ingredient_nutrient:", err.message);
    res.status(400).json({ error: err.message });
  }
});

router.patch("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const user = await ingredientNutrientsService.UpdateIngredientNutrients(
      id,
      updates,
    );
    res.status(200).json(user);
  } catch (err: any) {
    console.error("Error updating user:", err.message);
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await ingredientNutrientsService.deleteIngredientNutrients(id);
    res.status(200).json(user);
  } catch (err: any) {
    console.error("Error deleting user:", err.message);
    res.status(400).json({ error: err.message });
  }
});

export default router;

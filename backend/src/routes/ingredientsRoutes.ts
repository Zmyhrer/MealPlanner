import { Router, Request, Response } from "express";
import * as ingredientService from "../services/ingredientsService";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const ingredient = await ingredientService.addIngredient(name);
    res.status(201).json(ingredient);
  } catch (err: any) {
    console.error("Error adding ingredient_nutrient:", err.message);
    res.status(400).json({ error: err.message });
  }
});

router.patch("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const user = await ingredientService.updateIngredient(id, updates);
    res.status(200).json(user);
  } catch (err: any) {
    console.error("Error updating user:", err.message);
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await ingredientService.deleteIngredient(id);
    res.status(200).json(user);
  } catch (err: any) {
    console.error("Error deleting user:", err.message);
    res.status(400).json({ error: err.message });
  }
});

export default router;

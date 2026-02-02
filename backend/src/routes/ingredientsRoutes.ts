import { Router } from "express";
import {
  createIngredientService,
  getAllIngredientsService,
  getIngredientByIdService,
  softDeleteIngredientService,
  updateIngredientService,
} from "../services/entities/ingredientsService";
import { createPostgresIngredientRepository } from "../repositories/ingredientsRepository";

const repository = createPostgresIngredientRepository();

const IngredientsRoutes = () => {
  const router = Router();

  // Get All Ingredients
  router.get("/", async (req, res) => {
    try {
      const ingredients = await getAllIngredientsService(repository);
      res.status(200).json(ingredients);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Get Ingredient by ID
  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const ingredient = await getIngredientByIdService(repository, id);
      res.status(200).json(ingredient);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  });

  // Create Ingredient
  router.post("/", async (req, res) => {
    const { name } = req.body;

    try {
      const ingredient = await createIngredientService(repository, name);
      res.status(201).json(ingredient);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  // Update Ingredient by ID
  router.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
      const ingredient = await updateIngredientService(repository, id, name);
      res.status(200).json(ingredient);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  });

  // Soft Delete Ingredient by ID
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
      await softDeleteIngredientService(repository, id);
      res.status(200).send();
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  });

  return router;
};

export default IngredientsRoutes;

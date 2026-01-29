//import ingredientService from "../services/entities/ingredientsService";

import { Router } from "express";

const IngredientsRoutes = () => {
  const router = Router();

  router.get("/", async (req, res) => {
    res.send("IngredientRoute");
  });

  router.post("/", async (req, res) => {});

  router.delete("/", async (req, res) => {});

  return router;
};

export default IngredientsRoutes;

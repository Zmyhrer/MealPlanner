import { Router } from "express";
import { AddIngredient } from "../services/entities/mealsService";

const IngredientsRoutes = () => {
  const router = Router();

  //Get All Ingredients
  router.get("/", (req, res) => {
    res.send(AddIngredient);
  });

  //Get Specific Ingredient
  router.get("/:id", async (req, res) => {});

  router.post("/", async (req, res) => {
    res.send("POST: Ingredient");
  });

  router.patch("/", async (req, res) => {
    res.send("PATCH: Ingredient");
  });

  router.delete("/", async (req, res) => {
    res.send("DELETE: Ingredient");
  });

  return router;
};

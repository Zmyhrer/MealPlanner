import { Router } from "express";
import {
  createMealService,
  getAllMealService,
  getMealById,
} from "../services/entities/mealsService";
import { createPostgresMealRepository } from "../repositories/mealsRepository";
import { stat } from "node:fs";

const repository = createPostgresMealRepository();

const MealsRoutes = () => {
  const router = Router();

  //Get All Meals
  router.get("/", async (req, res) => {
    try {
      const meals = getAllMealService(repository);
      res.status(200).json(meals);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  //Get Specific Meal
  router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const meal = await getMealById(repository, id);
      res.status(200).json(meal);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  });

  //Create Meal
  router.post("/", async (req, res) => {
    const { user_id, name, serving_calories, instructions } = req.body;
    const mealInfo = { user_id, name, serving_calories, instructions };
    try {
      const meal = await createMealService(repository, mealInfo);
      res.status(201).json(meal);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  //Update Meal
  router.patch("/:id", async (req, res) => {});

  //Soft Delete Meal
  router.delete("/:id", async (req, res) => {});

  return router;
};

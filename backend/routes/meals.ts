import { Router } from "express";
import { addMeal, getMealById } from "../services/mealService";

const router = Router();

router.get("/:id", (req, res) => {
  const meal = getMealById(req.params.id);
  if (!meal) return res.status(404).json({ message: "Not found" });
  res.json(meal);
});

router.post("/", (req, res) => {
  const meal = addMeal(req.body);
  res.status(201).json(meal);
});

export default router;

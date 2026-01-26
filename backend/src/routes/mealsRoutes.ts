import * as mealsService from "../services/entities/mealsService";
import { createCrudRoutes } from "../utils/routesHelper";

const router = createCrudRoutes(
  mealsService,
  "addMeal",
  "updateMeal",
  "deleteMeal",
);

export default router;

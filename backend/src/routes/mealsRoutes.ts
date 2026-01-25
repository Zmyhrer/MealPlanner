import * as mealsService from "../services/mealsService";
import { createCrudRoutes } from "../utils/routesHelper";

const router = createCrudRoutes(
  mealsService,
  "addMeal",
  "updateMeal",
  "deleteMeal",
);

export default router;

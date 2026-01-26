import * as mealTagsService from "../services/entities/mealTagsService";
import { createCrudRoutes } from "../utils/routesHelper";

const router = createCrudRoutes(
  mealTagsService,
  "addMealTag",
  "updateMealTag",
  "deleteMealTag",
);

export default router;

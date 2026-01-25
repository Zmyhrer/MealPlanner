import * as scheduledMealsService from "../services/scheduledMealsService";
import { createCrudRoutes } from "../utils/routesHelper";

const router = createCrudRoutes(
  scheduledMealsService,
  "addScheduledMeal",
  "updateScheduledMeal",
  "deleteScheduledMeal",
);

export default router;

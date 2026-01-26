import * as userPreferencesService from "../services/entities/userPreferencesService";
import { createCrudRoutes } from "../utils/routesHelper";

const router = createCrudRoutes(
  userPreferencesService,
  "addUserPreference",
  "updateUserPreference",
  "deleteUserPreference",
);

export default router;

import * as userPreferencesService from "../services/userPreferencesService";
import { createCrudRoutes } from "../utils/routesHelper";

const router = createCrudRoutes(
  userPreferencesService,
  "addUserPreference",
  "updateUserPreference",
  "deleteUserPreference",
);

export default router;

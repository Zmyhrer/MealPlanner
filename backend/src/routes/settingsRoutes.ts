import * as settingsService from "../services/settingsService";
import { createCrudRoutes } from "../utils/routesHelper";

const router = createCrudRoutes(
  settingsService,
  "addSetting",
  "updateSetting",
  "deleteSetting",
);

export default router;

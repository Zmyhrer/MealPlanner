import * as settingsRepo from "../repositories/settingsRepository";
import { Setting } from "../models/settings";
import { createCrudService } from "../utils/serviceHelpers";

const repoWrapper = {
  add: settingsRepo.addSetting,
  update: settingsRepo.updateSetting,
  remove: settingsRepo.deleteSetting,
};

const settingsService = createCrudService<
  Omit<Setting, "id">,
  Partial<Setting>,
  Setting
>("Setting", repoWrapper, ["user_id", "dark_mode"]);

export const addSetting = settingsService.add;
export const updateSetting = settingsService.update;
export const deleteSetting = settingsService.delete;

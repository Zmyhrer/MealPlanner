import * as userPreferencesRepo from "../../repositories/userPreferencesRepository";
import { User_Preference } from "../../models/userPreferences";
import { createCrudService } from "../../utils/serviceHelpers";

const repoWrapper = {
  add: userPreferencesRepo.addUserPreference,
  update: userPreferencesRepo.updateUserPreference,
  remove: userPreferencesRepo.deleteUserPreference,
};

const userPreferencesService = createCrudService<
  Omit<User_Preference, "id">,
  Partial<User_Preference>,
  User_Preference
>("User_Preference", repoWrapper, ["user_id", "preference_type"]);

export const addUserPreference = userPreferencesService.add;
export const updateUserPreference = userPreferencesService.update;
export const deleteUserPreference = userPreferencesService.delete;

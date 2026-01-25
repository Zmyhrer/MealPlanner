import * as nutrientsRepo from "../repositories/nutrientsRepository";
import { Nutrient } from "../models/nutrients";
import { createCrudService } from "../utils/serviceHelpers";

const repoWrapper = {
  add: (data: Omit<Nutrient, "id">) => nutrientsRepo.addNutrient(data.name),
  update: nutrientsRepo.updateNutrient,
  remove: nutrientsRepo.deleteNutrient,
};

const nutrientsService = createCrudService<
  Omit<Nutrient, "id">,
  Partial<Nutrient>,
  Nutrient
>("Nutrient", repoWrapper, ["name"]);

export const addNutrient = nutrientsService.add;
export const updateNutrient = nutrientsService.update;
export const deleteNutrient = nutrientsService.delete;

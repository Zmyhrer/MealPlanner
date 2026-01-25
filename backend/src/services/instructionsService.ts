import * as instructionsRepo from "../repositories/instructionsRepository";
import { Instruction } from "../models/instructions";
import { createCrudService } from "../utils/serviceHelpers";

const repoWrapper = {
  add: instructionsRepo.addInstruction,
  update: instructionsRepo.updateInstruction,
  remove: instructionsRepo.deleteInstruction,
};

const instructionsService = createCrudService<
  Omit<Instruction, "id">,
  Partial<Instruction>,
  Instruction
>("Instruction", repoWrapper, ["meal_id", "order", "text"]);

export const addInstruction = instructionsService.add;
export const updateInstruction = instructionsService.update;
export const deleteInstruction = instructionsService.delete;

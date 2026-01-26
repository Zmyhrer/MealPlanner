import { createCrudService } from "../src/utils/serviceHelpers";

describe("createCrudService", () => {
  const fakeRepo = {
    add: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const service = createCrudService("TestEntity", fakeRepo, ["field1"]);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("throws if required add field is missing", async () => {
    await expect(service.add({ field1: "" })).rejects.toThrow(
      "TestEntity field1 is required",
    );
  });

  it("calls repo.add with valid data", async () => {
    fakeRepo.add.mockResolvedValue({ id: "1", field1: "x" });
    const result = await service.add({ field1: "x" });
    expect(fakeRepo.add).toHaveBeenCalledWith({ field1: "x" });
    expect(result).toEqual({ id: "1", field1: "x" });
  });

  it("throws if update has no fields", async () => {
    await expect(service.update("1", {})).rejects.toThrow(
      "At least one field must be provided",
    );
  });

  it("throws if delete id is empty", async () => {
    await expect(service.delete("")).rejects.toThrow(
      "TestEntity id is required",
    );
  });

  it("calls repo.update with correct params", async () => {
    fakeRepo.update.mockResolvedValue({ id: "1", field1: "y" });
    const result = await service.update("1", { field1: "y" });
    expect(fakeRepo.update).toHaveBeenCalledWith("1", { field1: "y" });
    expect(result).toEqual({ id: "1", field1: "y" });
  });

  it("throws if repo.remove returns null", async () => {
    fakeRepo.remove.mockResolvedValue(null);
    await expect(service.delete("1")).rejects.toThrow("TestEntity not found");
  });
});

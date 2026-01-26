import {
  buildInsertQuery,
  buildUpdateQuery,
  buildDeleteQuery,
} from "../src/utils/repositoryHelpers";

describe("repositoryHelpers", () => {
  describe("buildInsertQuery", () => {
    it("builds an INSERT query correctly", () => {
      const data = {
        ingredient_id: "123",
        nutrient_id: "456",
        unit: "mg",
        value: 10,
      };
      const allowedFields: (keyof typeof data)[] = [
        "ingredient_id",
        "nutrient_id",
        "unit",
        "value",
      ];

      const { query, values } = buildInsertQuery(
        "ingredient_nutrients",
        data,
        allowedFields,
      );

      expect(query).toMatch(/INSERT INTO ingredient_nutrients/i);
      expect(query).toMatch(/\$1/);
      expect(values).toEqual(["123", "456", "mg", 10]);
    });

    it("ignores undefined fields", () => {
      const data = {
        ingredient_id: "123",
        nutrient_id: undefined,
        unit: "mg",
        value: 10,
      };
      const allowedFields: (keyof typeof data)[] = [
        "ingredient_id",
        "nutrient_id",
        "unit",
        "value",
      ];

      const { query, values } = buildInsertQuery(
        "ingredient_nutrients",
        data,
        allowedFields,
      );

      expect(values).toEqual(["123", "mg", 10]);
    });
  });

  describe("buildUpdateQuery", () => {
    it("builds an UPDATE query correctly", () => {
      const updates = {
        ingredient_id: "123",
        nutrient_id: "456",
        unit: "mg",
        value: 20,
      };
      const allowedFields: (keyof typeof updates)[] = [
        "ingredient_id",
        "nutrient_id",
        "unit",
        "value",
      ];
      const id = "1";

      const { query, values } = buildUpdateQuery(
        "ingredient_nutrients",
        id,
        updates,
        allowedFields,
      );

      expect(query).toMatch(/UPDATE ingredient_nutrients SET/i);
      expect(query).toMatch(/WHERE id = \$5/i); // 4 fields + id = $5
      expect(values).toEqual(["123", "456", "mg", 20, "1"]);
    });

    it("ignores undefined updates", () => {
      const updates = { ingredient_id: "123", nutrient_id: undefined };
      const allowedFields: (keyof typeof updates)[] = [
        "ingredient_id",
        "nutrient_id",
      ];
      const id = "1";

      const { query, values } = buildUpdateQuery(
        "ingredient_nutrients",
        id,
        updates,
        allowedFields,
      );
      expect(values).toEqual(["123", "1"]);
    });
  });

  describe("buildDeleteQuery", () => {
    it("builds a DELETE query correctly", () => {
      const { query, values } = buildDeleteQuery("ingredient_nutrients", "1");
      expect(query).toMatch(/DELETE FROM ingredient_nutrients/i);
      expect(values).toEqual(["1"]);
    });
  });
});

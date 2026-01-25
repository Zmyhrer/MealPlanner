export function createCrudService<
  TInsert extends Record<string, any>,
  TUpdate extends Record<string, any>,
  TEntity,
>(
  entityName: string,
  repo: {
    add: (data: TInsert) => Promise<TEntity>;
    update: (id: string, updates: TUpdate) => Promise<TEntity>;
    remove: (id: string) => Promise<TEntity>;
  },
  requiredFields: (keyof TInsert)[],
) {
  return {
    async add(data: TInsert): Promise<TEntity> {
      for (const field of requiredFields) {
        const value = data[field];
        if (
          value === undefined ||
          value === null ||
          (typeof value === "string" && !value.trim())
        ) {
          throw new Error(`${entityName} ${String(field)} is required`);
        }
      }
      return await repo.add(data);
    },

    async update(id: string, updates: TUpdate): Promise<TEntity> {
      if (!id?.trim()) {
        throw new Error(`${entityName} id is required`);
      }
      const hasUpdates = Object.values(updates as Record<string, unknown>).some(
        (v) => v !== undefined,
      );
      if (!hasUpdates) {
        throw new Error("At least one field must be provided");
      }
      return await repo.update(id, updates);
    },

    async delete(id: string): Promise<TEntity> {
      if (!id?.trim()) {
        throw new Error(`${entityName} id is required`);
      }
      const deleted = await repo.remove(id);
      if (!deleted) {
        throw new Error(`${entityName} not found`);
      }
      return deleted;
    },
  };
}

export function createCrudService<
  TInsert extends Record<string, any>,
  TUpdate extends Record<string, any>,
  TEntity,
>(
  entityName: string,
  repo: {
    add: (data: TInsert | TInsert[]) => Promise<TEntity | TEntity[]>;
    update: (
      data:
        | { id: string; updates: TUpdate }
        | { id: string; updates: TUpdate }[],
    ) => Promise<TEntity | TEntity[]>;
    remove: (id: string | string[]) => Promise<TEntity | TEntity[]>;
  },
  requiredFields: (keyof TInsert)[],
) {
  return {
    async add(data: TInsert | TInsert[]): Promise<TEntity | TEntity[]> {
      const records = Array.isArray(data) ? data : [data];
      for (const record of records) {
        for (const field of requiredFields) {
          const value = record[field];
          if (
            value === undefined ||
            value === null ||
            (typeof value === "string" && !value.trim())
          ) {
            throw new Error(`${entityName} ${String(field)} is required`);
          }
        }
      }
      return await repo.add(data);
    },

    async update(
      data:
        | { id: string; updates: TUpdate }
        | { id: string; updates: TUpdate }[],
    ): Promise<TEntity | TEntity[]> {
      return await repo.update(data);
    },

    async delete(id: string | string[]): Promise<TEntity | TEntity[]> {
      return await repo.remove(id);
    },
  };
}

export function buildInsertQuery<T extends Record<string, any>>(
  table: string,
  data: T,
  allowedFields: readonly (keyof T)[],
): { query: string; values: any[] } {
  const columns: string[] = [];
  const placeholders: string[] = [];
  const values: any[] = [];
  let index = 1;

  for (const key of allowedFields) {
    if (data[key] !== undefined) {
      columns.push(String(key));
      placeholders.push(`$${index}`);
      values.push(data[key]);
      index++;
    }
  }

  const query = `INSERT INTO ${table} (${columns.join(", ")}) VALUES (${placeholders.join(", ")}) RETURNING *;`;

  return { query, values };
}

export function buildUpdateQuery<T extends Record<string, any>>(
  table: string,
  id: string,
  updates: T,
  allowedFields: readonly (keyof T)[],
): { query: string; values: any[] } {
  const fields: string[] = [];
  const values: any[] = [];
  let index = 1;

  for (const key of allowedFields) {
    if (updates[key] !== undefined) {
      fields.push(`${String(key)} = $${index}`);
      values.push(updates[key]);
      index++;
    }
  }

  const query = `UPDATE ${table} SET ${fields.join(", ")} WHERE id = $${index} RETURNING *;`;

  return { query, values: [...values, id] };
}

export function buildDeleteQuery(
  table: string,
  id: string,
): { query: string; values: any[] } {
  const query = `
    DELETE FROM ${table}
    WHERE id = $1
    RETURNING *;
  `;

  return { query, values: [id] };
}

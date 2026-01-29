//INSERT
export function buildInsertQueryFlexible<T extends Record<string, any>>(
  table: string,
  data: T | T[],
  allowedFields: readonly (keyof T)[],
): { query: string; values: any[] } {
  const dataArray = Array.isArray(data) ? data : [data];
  if (dataArray.length === 0) throw new Error("No data provided");

  const columns = allowedFields.map(String);
  const values: any[] = [];
  const placeholders: string[] = [];
  let index = 1;

  for (const row of dataArray) {
    const rowPlaceholders: string[] = [];
    for (const key of allowedFields) {
      if (row[key] === undefined) {
        rowPlaceholders.push("DEFAULT");
      } else {
        rowPlaceholders.push(`$${index}`);
        values.push(row[key]);
        index++;
      }
    }
    placeholders.push(`(${rowPlaceholders.join(", ")})`);
  }

  const query = `INSERT INTO ${table} (${columns.join(", ")}) VALUES ${placeholders.join(", ")} RETURNING *;`;
  return { query, values };
}

//UPDATE
export function buildUpdateQueryFlexible<T extends Record<string, any>>(
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

  if (fields.length === 0)
    throw new Error("At least one field must be provided");

  const query = `UPDATE ${table} SET ${fields.join(", ")} WHERE id = $${index} RETURNING *;`;
  return { query, values: [...values, id] };
}

//DELETE
export function buildDeleteQueryFlexible(
  table: string,
  id: string | string[],
): { query: string; values: any[] } {
  const ids = Array.isArray(id) ? id : [id];

  if (ids.length === 0) throw new Error("No id provided for deletion");

  const placeholders = ids.map((_, index) => `$${index + 1}`);
  const query = `DELETE FROM ${table} WHERE id IN (${placeholders.join(", ")}) RETURNING *;`;

  return { query, values: ids };
}

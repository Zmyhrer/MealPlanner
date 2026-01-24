import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

// create the pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

// optional: test the connection once
(async () => {
  try {
    const res = await pool.query("SELECT 1;");
    console.log("Database connected successfully:", res.rows);
  } catch (err) {
    console.error("Database connection failed:", err);
    process.exit(1); // stop server if DB is unreachable
  }
})();

export default pool;

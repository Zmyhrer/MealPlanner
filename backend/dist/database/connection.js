"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: process.env.DB_USER || "postgres",
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME || "MealPlannerDB",
    password: process.env.DB_PASSWORD || "mysecretpassword",
    port: Number(process.env.DB_PORT) || 5431,
});
exports.default = pool;
async function testConnection() {
    try {
        const res = await pool.query("SELECT 1;");
        console.log("Database connected successfully:", res.rows);
    }
    catch (err) {
        console.error("Database connection failed:", err);
    }
    finally {
        await pool.end();
    }
}
testConnection();

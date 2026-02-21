require("dotenv").config();
const pool = require("./config/db");

(async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("✅ Database connected! Current time:", res.rows[0]);
  } catch (err) {
    console.error("❌ Database connection failed:", err);
  } finally {
    pool.end();
  }
})();
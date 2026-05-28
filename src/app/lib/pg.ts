import { Pool } from "pg";

const pool = new Pool({
  user: process.env.PG_USER || "postgres",
  password: process.env.PG_PASSWORD || "postgres",
  host: process.env.PG_HOST || "localhost",
  port: parseInt(process.env.PG_PORT || "5432"),
  database: process.env.PG_DATABASE || "gridmind_db",
});

export const pgDb = {
  query: (text: string, params?: any[]) => pool.query(text, params),
};

export async function initializePostgresSchema() {
  const usersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      hash VARCHAR(255) NOT NULL,
      salt VARCHAR(255) NOT NULL,
      name VARCHAR(100) NOT NULL,
      role VARCHAR(100) NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;

  const p2pOffersTable = `
    CREATE TABLE IF NOT EXISTS p2p_offers (
      id SERIAL PRIMARY KEY,
      neighbor VARCHAR(255) NOT NULL,
      qty VARCHAR(50) NOT NULL,
      price VARCHAR(50) NOT NULL,
      type VARCHAR(20) NOT NULL
    );
  `;

  const tradesLedgerTable = `
    CREATE TABLE IF NOT EXISTS trades_ledger (
      id SERIAL PRIMARY KEY,
      log_message TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;

  await pool.query(usersTable);
  await pool.query(p2pOffersTable);
  await pool.query(tradesLedgerTable);

  const offersCheck = await pool.query("SELECT COUNT(*) FROM p2p_offers");
  if (parseInt(offersCheck.rows[0].count) === 0) {
    await pool.query(`
      INSERT INTO p2p_offers (neighbor, qty, price, type) VALUES
      ('Block A (Solar Excess)', '4.2 kWh', '$0.11', 'sell'),
      ('Unit 12 (Deficit Demand)', '2.5 kWh', '$0.13', 'buy'),
      ('Block C (Rooftop Wind)', '5.0 kWh', '$0.10', 'sell');
    `);
  }
}
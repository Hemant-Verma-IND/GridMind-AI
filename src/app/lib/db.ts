import fs from "fs";
import path from "path";

const DB_FILE = path.join(process.cwd(), "database.json");

interface TelemetryLog {
  timestamp: string;
  active_power_kw: number;
  voltage_v: number;
  current_a: number;
}

interface P2POffer {
  id: number;
  neighbor: string;
  qty: string;
  price: string;
  type: "sell" | "buy";
}

interface DatabaseSchema {
  telemetry_history: TelemetryLog[];
  p2p_offers: P2POffer[];
  trades_ledger: string[];
}

const defaultData: DatabaseSchema = {
  telemetry_history: [
    { timestamp: new Date(Date.now() - 3600000).toISOString(), active_power_kw: 4.1, voltage_v: 230.1, current_a: 17.8 }
  ],
  p2p_offers: [
    { id: 1, neighbor: "Block A (Solar Excess)", qty: "4.2 kWh", price: "$0.11", type: "sell" },
    { id: 2, neighbor: "Unit 12 (Deficit Demand)", qty: "2.5 kWh", price: "$0.13", type: "buy" },
    { id: 3, neighbor: "Block C (Rooftop Wind)", qty: "5.0 kWh", price: "$0.10", type: "sell" }
  ],
  trades_ledger: []
};

function readDb(): DatabaseSchema {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(defaultData, null, 2));
    return defaultData;
  }
  const raw = fs.readFileSync(DB_FILE, "utf-8");
  return JSON.parse(raw);
}

function writeDb(data: DatabaseSchema) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

export const db = {
  insertTelemetry: (reading: { active_power_kw: number; voltage_v: number; current_a: number }) => {
    const data = readDb();
    const newReading: TelemetryLog = {
      timestamp: new Date().toISOString(),
      ...reading
    };
    data.telemetry_history.push(newReading);
    if (data.telemetry_history.length > 500) {
      data.telemetry_history.shift();
    }
    writeDb(data);
    return newReading;
  },

  getLatestTelemetry: (): TelemetryLog => {
    const data = readDb();
    return data.telemetry_history[data.telemetry_history.length - 1];
  },

  getTelemetryHistory: (limit: number = 24): TelemetryLog[] => {
    const data = readDb();
    return data.telemetry_history.slice(-limit);
  },

  getP2POffers: (): P2POffer[] => {
    const data = readDb();
    return data.p2p_offers;
  },

  deleteP2POffer: (id: number) => {
    const data = readDb();
    data.p2p_offers = data.p2p_offers.filter(offer => offer.id !== id);
    writeDb(data);
  },

  insertTrade: (log: string) => {
    const data = readDb();
    data.trades_ledger.unshift(log);
    if (data.trades_ledger.length > 50) {
      data.trades_ledger.pop();
    }
    writeDb(data);
  },

  getTradesLedger: (): string[] => {
    const data = readDb();
    return data.trades_ledger;
  }
};
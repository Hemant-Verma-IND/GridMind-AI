import { NextResponse } from "next/server";

const publicKnowledgeBase = {
  v2g: {
    title: "Vehicle-to-Grid (V2G) Load Discharge",
    body: "GridMind AI coordinates with PRIME's telemetry to turn electric vehicles into active storage assets.\n\n**How it works:**\n• The system monitors regional peak demand hours (18:00 - 22:00).\n• It triggers your connected EV battery to discharge into your local building circuits, saving on high peak rates ($0.28/kWh).\n• It automatically stops discharging when your battery hits your safety threshold (e.g., 35% SoC) to preserve your range."
  },
  nilm: {
    title: "NILM Appliance Peak Tracking",
    body: "Non-Intrusive Load Monitoring (NILM) analyzes raw current and voltage waveforms at your single main breaker to disaggregate individual appliance footprints.\n\n**Capabilities:**\n• Identifies the distinct 'electrical signature' of heavy appliances (refrigerators, HVACs, pumps).\n• Flags anomalous continuous loads (e.g., an AC left running unnecessarily overnight).\n• Warns operators *before* a physical trip occurs by identifying sub-second voltage sags."
  },
  p2p: {
    title: "Transactive Microgrid Trading",
    body: "Our peer-to-peer microgrid ledger allows households with solar arrays to trade surplus electricity directly with neighbors.\n\n**Benefits:**\n• Bypasses low utility feed-in buyback rates.\n• Enables buyers to purchase local green energy cheaper than standard grid prices.\n• Transacts securely using PostgreSQL-backed local block ledgers."
  },
  prime: {
    title: "PRIME Edge Protection",
    body: "PRIME is our physical ESP32-based protective circuit breaker. Operating at the main board, it implements sub-second hardware trip protection.\n\n**Features:**\n• 30A SLA electromagnetic relay isolation.\n• ZMPT101B and ACS712 high-precision sensors.\n• Local haptic buzzer alarms and visual status indicators."
  }
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawQuery = searchParams.get("query") || "";
  const query = rawQuery.toLowerCase().trim();

  let title = "Search Results";
  let body = "";

  const matchesV2G = ["ev", "v2g", "vehicle", "car", "discharge", "battery"].some(k => query.includes(k));
  const matchesNILM = ["nilm", "appliance", "peak", "fridge", "hvac", "dryer", "detect", "scan"].some(k => query.includes(k));
  const matchesP2P = ["p2p", "trade", "sell", "buy", "neighbor", "market", "solar"].some(k => query.includes(k));
  const matchesPRIME = ["prime", "hardware", "breaker", "sensor", "relay", "esp32"].some(k => query.includes(k));

  if (matchesV2G) {
    title = publicKnowledgeBase.v2g.title;
    body = publicKnowledgeBase.v2g.body;
  } else if (matchesNILM) {
    title = publicKnowledgeBase.nilm.title;
    body = publicKnowledgeBase.nilm.body;
  } else if (matchesP2P) {
    title = publicKnowledgeBase.p2p.title;
    body = publicKnowledgeBase.p2p.body;
  } else if (matchesPRIME) {
    title = publicKnowledgeBase.prime.title;
    body = publicKnowledgeBase.prime.body;
  } else {
    title = "GridMind AI Assistant";
    body = "I can answer questions regarding our unified core technologies. Try searching for these topics:\n\n• **PRIME Hardware:** 'How does the physical breaker protect my home?'\n• **NILM Analytics:** 'How do you track appliances without smart plugs?'\n• **V2G Support:** 'Explain vehicle-to-grid load discharging.'\n• **P2P Trading:** 'What is peer-to-peer microgrid energy trading?'";
  }

  return NextResponse.json({ title, body });
}
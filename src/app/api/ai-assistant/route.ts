import { NextResponse } from "next/server";

const gridKnowledgeBase = {
  v2g: {
    description: "Vehicle-to-Grid (V2G) technology transforms electric vehicles into bi-directional battery storage assets. Instead of just drawing power, your EV can feed electricity back into your building or the local grid during high-demand peak intervals.",
    optimization: "By discharging during high-rate windows, you avoid expensive utility tariffs and earn stabilization credits. The system automatically restricts discharging below your safety threshold to preserve vehicle range.",
  },
  nilm: {
    description: "Non-Intrusive Load Monitoring (NILM) is an advanced machine-learning disaggregation technique. It analyzes high-frequency current and voltage transients at your single main utility meter to identify individual appliance duty cycles.",
    benefits: "By matching transient step-change signatures, the system detects when devices like refrigerators, HVAC units, or washing machines cycle on and off, eliminating the need for expensive sub-metering hardware or smart plugs.",
  },
  carbon: {
    description: "Carbon-Aware Load Shifting aligns your high-demand processes with periods of clean energy generation (high wind and solar injection into the local grid).",
    actions: "When grid carbon intensity rises, the scheduler pauses non-essential operations. For example, delaying EV charging to early morning hours shifts consumption away from dirty fossil-fuel peak plants.",
  },
  p2p: {
    description: "Transactive P2P Microgrids allow localized prosumers (homes with solar panels or stationary batteries) to trade energy directly with nearby consumers over a virtual ledger.",
    economics: "Instead of exporting surplus solar energy back to the utility company at low feed-in tariff rates, you can sell excess power directly to neighbors at a mutually beneficial price, keeping energy capital inside the community.",
  }
};

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const { message, gridState } = payload;

    const query = message.toLowerCase().trim();
    let reply = "";

    const isGreeting = ["hello", "hi", "hey", "greetings", "yo", "g'day", "morning", "afternoon"].some(k => query === k || query.startsWith(k + " "));
    const isThanks = ["thanks", "thank you", "awesome", "perfect", "great", "cool", "wonderful"].some(k => query.includes(k));
    const isHelp = ["help", "commands", "what can you do", "menu", "capabilities"].some(k => query.includes(k));

    const matchesSchedule = ["schedule", "task", "time", "when", "eco", "plan", "calendar"].some(k => query.includes(k));
    const matchesV2G = ["v2g", "ev", "battery", "car", "vehicle", "discharge", "soc"].some(k => query.includes(k));
    const matchesNILM = ["nilm", "appliance", "fridge", "hvac", "dryer", "signature", "detect"].some(k => query.includes(k));
    const matchesP2P = ["p2p", "trade", "sell", "buy", "neighbor", "market", "ledger"].some(k => query.includes(k));
    const matchesCarbon = ["carbon", "green", "emission", "co2", "intensity", "clean", "dirty"].some(k => query.includes(k));
    const matchesEfficiency = ["efficiency", "rating", "score", "optimize"].some(k => query.includes(k));
    const matchesLoad = ["load", "power", "watt", "kw", "current", "voltage", "usage"].some(k => query.includes(k));

    if (isGreeting) {
      reply = `Hello! I am your GM Assistant, active and monitoring your localized microgrid. \n\nOur current system scenario is set to **${gridState.gridStatusLabel}** with an active load of **${gridState.activeLoadKw} kW**. \n\nHow can I help you optimize your assets today? (Try asking: "What is my recommended task schedule?")`;
    } 
    
    else if (isThanks) {
      reply = "You are very welcome! I will continue tracking grid anomalies and localized trading parameters. Let me know if you need anything else.";
    } 
    
    else if (isHelp) {
      reply = "I can analyze and coordinate several parameters on your dashboard:\n\n" +
              "• **Schedules:** Ask 'What is my recommended task schedule?'\n" +
              "• **V2G Battery Options:** Ask 'How is my EV helping the grid?'\n" +
              "• **NILM Disaggregation:** Ask 'How does NILM detect my appliances?'\n" +
              "• **Carbon Reductions:** Ask 'Is the grid carbon intensity clean?'\n" +
              "• **P2P Marketplace:** Ask 'What is P2P energy trading?'\n" +
              "• **System Telemetry:** Ask 'What is my current active grid load?'";
    } 
    
    else if (matchesSchedule) {
      if (gridState.scenario === "peak") {
        reply = `**CRITICAL ADVISORY:** The grid is experiencing **Peak Stress**. Active demand is high (**${gridState.activeLoadKw} kW**).\n\n**Recommended Schedule:**\n• Postpone high-demand appliance runs (washing machine, dishwasher).\n• Shift EV charging entirely to the off-peak window starting at **02:00 AM** tonight.\n• Active V2G is offsetting your current essential household loads.`;
      } else if (gridState.scenario === "dirty") {
        reply = `**CARBON WARNING:** Grid intensity is dirty (**${gridState.carbonIntensityG} gCO₂/kWh**).\n\n**Recommended Schedule:**\n• Pause non-essential tasks.\n• Our carbon-aware scheduler has deferred pool pump and EV charging sessions until **02:00 AM** tonight, when wind generation is projected to peak.`;
      } else {
        reply = `**GRID STABLE:** Current load levels are optimized. Your current rate is off-peak (**$${gridState.tariffRate}/kWh**).\n\n**Recommended Schedule:**\n• Standard windows are active. High-demand appliances can be operated safely.\n• Charging your EV now will utilize the cleanest local solar-surplus generation available.`;
      }
    } 
    
    else if (matchesV2G) {
      const v2gState = gridState.scenario === "peak"
        ? `V2G is currently active and discharging power to support your household. This is saving you money by avoiding peak rates (**$${gridState.tariffRate}/kWh**).`
        : `V2G is in standby. Your EV battery sits at **74% SoC** and will charge using low-cost off-peak rates (**$${gridState.tariffRate}/kWh**).`;

      reply = `${gridKnowledgeBase.v2g.description}\n\n**Current V2G Status:**\n• ${v2gState}\n\n**Optimization:**\n• ${gridKnowledgeBase.v2g.optimization}`;
    } 
    
    else if (matchesNILM) {
      const activeAnomaly = gridState.scenario === "peak"
        ? "NILM telemetry indicates your HVAC is operating at peak cooling capacity (**4.10 kW**), driving your demand surge."
        : "NILM logs show optimized appliance cycles. Your refrigerator is running at a standard **0.15 kW** baseline.";

      reply = `${gridKnowledgeBase.nilm.description}\n\n**Live Diagnostics:**\n• ${activeAnomaly}\n\n**Benefits:**\n• ${gridKnowledgeBase.nilm.benefits}`;
    } 
    
    else if (matchesCarbon) {
      const carbonAdvice = gridState.scenario === "dirty"
        ? `Grid carbon intensity is currently high at **${gridState.carbonIntensityG} gCO2/kWh**. Our carbon-aware scheduler has delayed heavy appliances to reduce indirect emissions.`
        : `Grid carbon intensity is optimal at **${gridState.carbonIntensityG} gCO2/kWh**. It is highly recommended to run heavy processes now while grid power is clean.`;

      reply = `${gridKnowledgeBase.carbon.description}\n\n**Live Carbon Analysis:**\n• ${carbonAdvice}\n\n**Actions:**\n• ${gridKnowledgeBase.carbon.actions}`;
    } 
    
    else if (matchesP2P) {
      reply = `${gridKnowledgeBase.p2p.description}\n\n**Ledger Update:**\n• Your P2P local ledger has tracked several localized contracts this week, helping bypass standard utility rates.\n\n**Economics:**\n• ${gridKnowledgeBase.p2p.economics}`;
    } 
    
    else if (matchesEfficiency) {
      reply = `Your system is operating at a **${gridState.efficiencyScore}%** efficiency score under the active **${gridState.gridStatusLabel}** scenario.\n\n**Analysis:**\n• ${
        gridState.scenario === "peak"
          ? "The score is lower due to concurrent peak-hour demand. Running V2G and delaying non-essential loads will help raise your rating."
          : "Your power factor (0.96) and load balancing are fully optimized."
      }`;
    } 
    
    else if (matchesLoad) {
      reply = `The facility's real-time active grid load is **${gridState.activeLoadKw} kW** under the **${gridState.gridStatusLabel}** scenario.\n\n**Analysis:**\n• ${
        gridState.scenario === "peak"
          ? "This is significantly higher than your baseline. Automated load-shedding is recommended."
          : "Your demand is stable and within normal baseline parameters."
      }`;
    } 
    
    else {
      reply = `I am your GridMind GM Assistant. I am trained to answer questions on GridMind AI's core systems based on your current live state:\n\n` +
              `• **V2G Orchestration:** Ask "How is my EV helping the grid?"\n` +
              `• **NILM Diagnostics:** Ask "How does NILM detect my appliances?"\n` +
              `• **Carbon Shifting:** Ask "Is the grid carbon intensity clean?"\n` +
              `• **P2P Microgrid:** Ask "What is P2P energy trading?"\n` +
              `• **Real-Time Telemetry:** Ask "What is my current active grid load?"\n` +
              `• **Schedules:** Ask "What is my recommended task schedule?"`;
    }

    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json({ reply: "Local database query failed. Please restart the server." }, { status: 500 });
  }
}
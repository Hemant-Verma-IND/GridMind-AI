import { NextResponse } from "next/server";
import { influxDb } from "../../lib/influx";

function generateForecastingData(scenario: string, currentVal: number) {
  const data = [];
  const baseTemp = scenario === "peak" ? 34 : scenario === "dirty" ? 22 : 24;
  
  for (let hour = 0; hour < 24; hour += 2) {
    const timeString = `${hour.toString().padStart(2, "0")}:00`;
    
    let baseLoad = 0.4;
    if (hour === 16 && scenario === "normal") {
      baseLoad = currentVal;
    }
    
    const isPeakHour = hour >= 18 && hour <= 22;
    const isMorningPeak = hour >= 6 && hour <= 8;
    const peakMultiplier = isPeakHour ? 3.2 : isMorningPeak ? 1.8 : 1.0;
    
    const coolingLoad = Math.max(0, baseTemp - 24) * 0.45;
    const noise = (Math.random() - 0.5) * 0.15;
    
    let actualLoad = baseLoad + (coolingLoad * peakMultiplier) + noise;
    if (scenario === "peak") actualLoad *= 1.85;
    if (scenario === "dirty") actualLoad *= 1.15;
    
    if (hour === 16 && scenario === "normal") {
      actualLoad = currentVal;
    }

    const predictionDeviation = (Math.random() - 0.5) * 0.08;
    const predictedLoad = actualLoad * (1 + predictionDeviation);
    
    const isFuture = hour > 16;

    data.push({
      time: timeString,
      actual: isFuture ? null : parseFloat(actualLoad.toFixed(2)),
      predicted: parseFloat(predictedLoad.toFixed(2)),
    });
  }
  
  return data;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const scenario = searchParams.get("scenario") || "normal";

  let latest: any = null;
  try {
    latest = await influxDb.getLatestTelemetry();
  } catch (err) {
    latest = { active_power_kw: 4.82, voltage_v: 230.4, current_a: 20.9 };
  }

  const activePower = scenario === "normal" && latest 
    ? latest.active_power_kw 
    : scenario === "peak" 
    ? 9.64 
    : 6.12;

  const forecastChartData = generateForecastingData(scenario, activePower);

  const nilmLogs = [
    {
      timestamp: "16:41:02",
      appliance: "Refrigerator Compressor",
      status: "ON",
      load: "0.15 kW",
    },
    {
      timestamp: "16:38:15",
      appliance: scenario === "peak" ? "HVAC (High Cooling)" : "HVAC (Eco-Mode)",
      status: "ON",
      load: scenario === "peak" ? "4.10 kW" : `${(activePower - 1.2).toFixed(2)} kW`,
    },
    {
      timestamp: "16:15:30",
      appliance: "Base Standby Load",
      status: "ON",
      load: "0.25 kW",
    },
  ];

  return NextResponse.json({
    forecastChartData,
    nilmLogs,
    latestTelemetry: {
      active_power_kw: activePower,
      voltage_v: scenario === "normal" && latest ? latest.voltage_v : 230.0,
      current_a: scenario === "normal" && latest ? latest.current_a : parseFloat((activePower / 230.0).toFixed(2))
    },
    systemTimestamp: new Date().toISOString(),
  });
}
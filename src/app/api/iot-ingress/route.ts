import { NextResponse } from "next/server";
import { influxDb } from "../../lib/influx";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    
    const inserted = await influxDb.writeTelemetry({
      active_power_kw: parseFloat(payload.active_power_kw || 4.82),
      voltage_v: parseFloat(payload.voltage_v || 230.4),
      current_a: parseFloat(payload.current_a || 20.9),
    });

    return NextResponse.json({ 
      status: "success", 
      received: inserted 
    });
  } catch (error) {
    return NextResponse.json({ status: "error" }, { status: 400 });
  }
}

export async function GET() {
  try {
    const latest = await influxDb.getLatestTelemetry();
    return NextResponse.json(latest);
  } catch (error) {
    return NextResponse.json({ error: "Query failed" }, { status: 500 });
  }
}
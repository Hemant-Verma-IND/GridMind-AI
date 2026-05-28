import { NextResponse } from "next/server";
import { db } from "../../lib/db";

export async function GET() {
  const offers = db.getP2POffers();
  const ledger = db.getTradesLedger();
  return NextResponse.json({ offers, ledger });
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const { id, qty, price, neighbor } = payload;
    
    db.deleteP2POffer(id);
    
    const logMessage = `Secured ${qty} P2P microgrid contract with ${neighbor} at ${price}/kWh`;
    db.insertTrade(logMessage);

    return NextResponse.json({ status: "success", logMessage });
  } catch (error) {
    return NextResponse.json({ status: "error" }, { status: 400 });
  }
}
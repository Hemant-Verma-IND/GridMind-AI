import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../lib/mongodb";
import { hashPassword } from "../../../lib/crypto";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const { email, password, name, role } = payload;

    if (
      typeof email !== "string" || 
      typeof password !== "string" || 
      typeof name !== "string" || 
      typeof role !== "string"
    ) {
      return NextResponse.json({ error: "Malformed payload structure" }, { status: 400 });
    }

    const sanitizedEmail = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedEmail)) {
      return NextResponse.json({ error: "Invalid email syntax" }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    }

    const { db } = await connectToDatabase();

    const existingUser = await db.collection("users").findOne({ email: sanitizedEmail });
    if (existingUser) {
      return NextResponse.json({ error: "Account resource conflict" }, { status: 409 });
    }

    const { hash, salt } = hashPassword(password);

    await db.collection("users").insertOne({
      email: sanitizedEmail,
      hash,
      salt,
      name: name.trim(),
      role: role.trim(),
      created_at: new Date()
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Internal registry failure" }, { status: 500 });
  }
}
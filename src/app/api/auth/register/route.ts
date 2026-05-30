import { NextResponse } from "next/server";
import { pgDb } from "../../../lib/pg";
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

    const existingCheck = await pgDb.query(
      "SELECT id FROM users WHERE email = $1", 
      [sanitizedEmail]
    );

    if (existingCheck.rows.length > 0) {
      return NextResponse.json({ error: "Account resource conflict" }, { status: 409 });
    }

    const { hash, salt } = hashPassword(password);

    await pgDb.query(
      "INSERT INTO users (email, hash, salt, name, role) VALUES ($1, $2, $3, $4, $5)",
      [sanitizedEmail, hash, salt, name.trim(), role.trim()]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Internal registry failure" }, { status: 500 });
  }
}
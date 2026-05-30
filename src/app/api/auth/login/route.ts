import { NextResponse } from "next/server";
import { pgDb } from "../../../lib/pg";
import { verifyPassword, encryptSession } from "../../../lib/crypto";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const { email, password } = payload;

    if (typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json({ error: "Malformed payload structure" }, { status: 400 });
    }

    const sanitizedEmail = email.trim().toLowerCase();

    const result = await pgDb.query(
      "SELECT id, email, hash, salt, name, role FROM users WHERE email = $1",
      [sanitizedEmail]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Invalid security credentials" }, { status: 401 });
    }

    const user = result.rows[0];

    const isValid = verifyPassword(password, user.salt, user.hash);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid security credentials" }, { status: 401 });
    }

    const sessionPayload = JSON.stringify({
      uid: user.id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
      exp: Date.now() + 86400000
    });

    const encryptedToken = encryptSession(sessionPayload);

    const response = NextResponse.json({
      success: true,
      operator: {
        name: user.name,
        role: user.role,
        email: user.email
      }
    });

    response.cookies.set({
      name: "gm_session",
      value: encryptedToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400,
      path: "/"
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Internal processing failure" }, { status: 500 });
  }
}
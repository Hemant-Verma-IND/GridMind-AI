import { NextResponse } from "next/server";
import { encryptSession } from "../../../lib/crypto";

export async function POST() {
  try {
    const sessionPayload = JSON.stringify({
      uid: "google_workspace_oauth_user",
      email: "workspace@gridmind.ai",
      name: "Workspace Operator",
      role: "Grid Engineer",
      exp: Date.now() + 86400000
    });

    const encryptedToken = encryptSession(sessionPayload);

    const response = NextResponse.json({
      success: true,
      operator: {
        name: "Workspace Operator",
        role: "Grid Engineer",
        email: "workspace@gridmind.ai"
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
    return NextResponse.json({ error: "Oauth processing failure" }, { status: 500 });
  }
}
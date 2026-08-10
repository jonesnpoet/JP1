import { NextResponse } from "next/server";

interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function isValidPayload(body: unknown): body is ContactPayload {
  if (typeof body !== "object" || body === null) return false;
  const { name, email, subject, message } = body as Record<string, unknown>;
  return (
    typeof name === "string" &&
    name.trim() !== "" &&
    typeof email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) &&
    typeof subject === "string" &&
    subject.trim() !== "" &&
    typeof message === "string" &&
    message.trim() !== ""
  );
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!isValidPayload(body)) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  // Email delivery provider not yet chosen -- wire it up here once decided.
  return NextResponse.json(
    { error: "Email delivery isn't configured yet." },
    { status: 501 },
  );
}

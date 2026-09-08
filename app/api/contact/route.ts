import { NextResponse } from "next/server";
import { Resend } from "resend";

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

// Destination inbox for every submission; override via CONTACT_TO_EMAIL.
const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "Design@jonesandpoet.com";
// Resend's sending identity -- jonesandpoet.com is verified in Resend, so
// this sends from that domain directly. Override via CONTACT_FROM_EMAIL if
// needed.
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "Jones + Poet Website <noreply@jonesandpoet.com>";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!isValidPayload(body)) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "Email delivery isn't configured yet." }, { status: 501 });
  }

  const { name, email, subject, message } = body;
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: TO_EMAIL,
    replyTo: email,
    subject: `New inquiry: ${subject}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  });

  if (error) {
    return NextResponse.json({ error: "Failed to send message." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import EmailSettings from "@/lib/models/EmailSettings";
import { requireAdmin } from "@/lib/requireAdmin";
import { clearEmailServiceCache } from "@/lib/email-service";

const emptySettings = {
  provider: "resend",
  fromName: "",
  fromEmail: "",
  replyTo: "",
  adminEmail: "",
  adminSubject: "New message from {name}",
  sendConfirmation: true,
  confirmationSubject: "Thanks for reaching out",
  testMode: true,
  isActive: true,
  smtp: { host: "smtp.office365.com", port: 587, secure: false, user: "" },
  sendgrid: { apiKey: "" },
  resend: { apiKey: "" },
};

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  await connectDB();
  const doc = await EmailSettings.findOne({ isActive: true });
  if (!doc) return NextResponse.json(emptySettings);

  // Never send stored secrets back to the client — the form treats a blank
  // secret field as "leave unchanged" on save.
  return NextResponse.json({
    provider: doc.provider,
    fromName: doc.fromName,
    fromEmail: doc.fromEmail,
    replyTo: doc.replyTo,
    adminEmail: doc.adminEmail,
    adminSubject: doc.adminSubject,
    sendConfirmation: doc.sendConfirmation,
    confirmationSubject: doc.confirmationSubject,
    testMode: doc.testMode,
    isActive: doc.isActive,
    smtp: {
      host: doc.smtpHost || "smtp.office365.com",
      port: doc.smtpPort || 587,
      secure: doc.smtpSecure || false,
      user: doc.smtpUser || "",
    },
    sendgrid: { apiKey: "" },
    resend: { apiKey: "" },
  });
}

export async function PUT(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const body = await request.json().catch(() => null);
  if (!body || !body.fromEmail || !body.fromName || !body.adminEmail) {
    return NextResponse.json(
      { error: "From name, from email, and admin email are required." },
      { status: 400 }
    );
  }

  await connectDB();

  const update: Record<string, unknown> = {
    provider: body.provider,
    fromName: body.fromName,
    fromEmail: body.fromEmail,
    replyTo: body.replyTo,
    adminEmail: body.adminEmail,
    adminSubject: body.adminSubject,
    sendConfirmation: body.sendConfirmation,
    confirmationSubject: body.confirmationSubject,
    testMode: body.testMode,
    isActive: true,
  };

  if (body.provider === "smtp" || body.provider === "outlook") {
    update.smtpHost = body.smtp?.host || "smtp.office365.com";
    update.smtpPort = body.smtp?.port || 587;
    update.smtpSecure = body.smtp?.secure || false;
    update.smtpUser = body.smtp?.user || "";
    // Only overwrite the stored password if a new one was actually typed.
    if (body.smtp?.password) update.smtpPassword = body.smtp.password;
  } else if (body.provider === "sendgrid") {
    if (body.sendgrid?.apiKey) update.sendgridApiKey = body.sendgrid.apiKey;
  } else if (body.provider === "resend") {
    if (body.resend?.apiKey) update.resendApiKey = body.resend.apiKey;
  }

  // Singleton document, same upsert pattern as /api/admin/site.
  await EmailSettings.findOneAndUpdate({}, update, {
    new: true,
    upsert: true,
    runValidators: true,
  });

  clearEmailServiceCache();

  return NextResponse.json({ ok: true });
}

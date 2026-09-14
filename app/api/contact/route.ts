import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Message from "@/lib/models/Message";
import { getEmailSettings, sendEmail } from "@/lib/email-service";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (
    !body ||
    typeof body.name !== "string" ||
    typeof body.email !== "string" ||
    typeof body.message !== "string" ||
    !body.name.trim() ||
    !body.email.trim() ||
    !body.message.trim()
  ) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  const name = body.name.trim();
  const email = body.email.trim();
  const message = body.message.trim();

  try {
    await connectDB();
    await Message.create({ name, email, message });
  } catch (err) {
    console.error("Failed to save contact message:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }

  // The message is already saved at this point, so an email problem should
  // never turn into a failed submission for the visitor — just log it and
  // still return ok: true. Configure this under /admin/email-settings.
  try {
    const settings = await getEmailSettings();
    if (settings) {
      const notifyHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New portfolio contact message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p style="background: #f5f5f5; padding: 15px; border-radius: 4px;">${message}</p>
        </div>
      `;

      await sendEmail({
        to: settings.adminEmail,
        subject: (settings.adminSubject || "New message from {name}").replace("{name}", name),
        html: notifyHtml,
      });

      if (settings.sendConfirmation) {
        const confirmationHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <p>Hi ${name},</p>
            <p>Thanks for reaching out — I've received your message and will get back to you soon.</p>
            <p style="background: #f5f5f5; padding: 15px; border-radius: 4px;">${message}</p>
          </div>
        `;
        await sendEmail({
          to: email,
          subject: settings.confirmationSubject || "Thanks for reaching out",
          html: confirmationHtml,
        });
      }
    } else {
      console.warn("Contact message saved, but no email settings configured yet.");
    }
  } catch (err) {
    console.error("Contact message saved, but sending the notification email failed:", err);
  }

  return NextResponse.json({ ok: true });
}

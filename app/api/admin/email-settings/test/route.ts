import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/requireAdmin";
import { clearEmailServiceCache, getEmailSettings, sendEmail } from "@/lib/email-service";

// Sends a real test email to the configured admin address, bypassing test
// mode so you can actually confirm delivery. Uses whatever is currently
// saved in the database — save your settings first.
export async function POST() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  // Make sure we're reading the latest saved settings, not a stale cache.
  clearEmailServiceCache();

  const settings = await getEmailSettings();
  if (!settings) {
    return NextResponse.json(
      { error: "No email settings saved yet. Save your settings first." },
      { status: 400 }
    );
  }

  try {
    if (settings.testMode) {
      // Send for real even in test mode, so "Send test email" actually tests.
      const { emailService } = await import("@/lib/email");
      if (!emailService.isInitialized()) {
        return NextResponse.json({ error: "Email provider not initialized." }, { status: 500 });
      }
      const result = await emailService.send({
        to: settings.adminEmail,
        subject: "Test email from your portfolio",
        html: `<p>This is a test email sent via the <strong>${settings.provider}</strong> provider. If you're reading this, it works.</p>`,
      });
      if (!result.success) {
        return NextResponse.json({ error: result.error || "Send failed." }, { status: 500 });
      }
      return NextResponse.json({ ok: true, messageId: result.messageId });
    }

    const result = await sendEmail({
      to: settings.adminEmail,
      subject: "Test email from your portfolio",
      html: `<p>This is a test email sent via the <strong>${settings.provider}</strong> provider. If you're reading this, it works.</p>`,
    });
    return NextResponse.json({ ok: true, messageId: result.messageId });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to send test email." },
      { status: 500 }
    );
  }
}

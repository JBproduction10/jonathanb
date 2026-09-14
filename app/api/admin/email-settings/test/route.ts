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

  if (!settings.adminEmail) {
    return NextResponse.json(
      { error: "Set \"Send notifications to\" before sending a test email." },
      { status: 400 }
    );
  }

  try {
    const result = await sendEmail(
      {
        to: settings.adminEmail,
        subject: "Test email from your portfolio",
        html: `<p>This is a test email sent via the <strong>${settings.provider}</strong> provider. If you're reading this, it works.</p>`,
      },
      { force: true }
    );
    return NextResponse.json({ ok: true, messageId: result.messageId });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to send test email." },
      { status: 500 }
    );
  }
}

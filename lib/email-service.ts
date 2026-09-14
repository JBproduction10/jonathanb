// lib/email-service.ts
// Loads email settings from the database and sends through whichever
// provider is configured in /admin/email-settings.
import { connectDB } from "@/lib/mongodb";
import EmailSettings from "@/lib/models/EmailSettings";
import { emailService, EmailConfig } from "@/lib/email";
import type { EmailOptions } from "@/lib/email/providers/interface";

interface EmailSettingsDoc {
  provider: "smtp" | "outlook" | "sendgrid" | "resend";
  fromName: string;
  fromEmail: string;
  replyTo?: string;
  adminEmail: string;
  adminSubject: string;
  sendConfirmation: boolean;
  confirmationSubject: string;
  testMode: boolean;
  isActive: boolean;
  smtpHost?: string;
  smtpPort?: number;
  smtpSecure?: boolean;
  smtpUser?: string;
  smtpPassword?: string;
  sendgridApiKey?: string;
  resendApiKey?: string;
}

let cachedSettings: EmailSettingsDoc | null = null;

async function initializeEmailService(): Promise<void> {
  await connectDB();
  const settings = await EmailSettings.findOne({ isActive: true })
    .select("+smtpPassword +sendgridApiKey +resendApiKey")
    .lean<EmailSettingsDoc | null>();

  if (!settings) {
    console.warn("⚠️ No email settings configured — visit /admin/email-settings");
    return;
  }

  const emailConfig: EmailConfig = {
    provider: settings.provider,
    fromName: settings.fromName,
    fromEmail: settings.fromEmail,
    replyTo: settings.replyTo,
  };

  if (settings.provider === "smtp" || settings.provider === "outlook") {
    emailConfig.smtp = {
      host: settings.smtpHost || "smtp.office365.com",
      port: settings.smtpPort || 587,
      secure: settings.smtpSecure || false,
      user: settings.smtpUser || "",
      password: settings.smtpPassword || "",
    };
  } else if (settings.provider === "sendgrid") {
    emailConfig.sendgrid = { apiKey: settings.sendgridApiKey || "" };
  } else if (settings.provider === "resend") {
    emailConfig.resend = { apiKey: settings.resendApiKey || "" };
  }

  emailService.initialize(emailConfig);
  cachedSettings = settings;
}

export async function getEmailSettings(): Promise<EmailSettingsDoc | null> {
  if (cachedSettings) return cachedSettings;
  await connectDB();
  cachedSettings = await EmailSettings.findOne({ isActive: true })
    .select("+smtpPassword +sendgridApiKey +resendApiKey")
    .lean<EmailSettingsDoc | null>();
  return cachedSettings;
}

// Call this whenever the settings are saved from /admin/email-settings so
// the next send picks up the new config instead of a stale cached one.
export function clearEmailServiceCache(): void {
  cachedSettings = null;
  emailService.clearCache();
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  if (!emailService.isInitialized()) {
    await initializeEmailService();
  }

  const settings = await getEmailSettings();
  if (!settings) {
    throw new Error("Email settings not configured. Configure them in /admin/email-settings.");
  }

  if (settings.testMode) {
    console.log("TEST MODE: email would be sent to:", to, "| subject:", subject);
    return { messageId: "test-mode-" + Date.now() };
  }

  const result = await emailService.send({ to, subject, html });
  if (!result.success) {
    throw new Error(result.error || "Failed to send email");
  }

  return { messageId: result.messageId || "email-" + Date.now() };
}

import { Schema, models, model } from "mongoose";

const EmailSettingsSchema = new Schema(
  {
    provider: {
      type: String,
      enum: ["smtp", "outlook", "sendgrid", "resend"],
      default: "resend",
      required: true,
    },
    fromName: { type: String, required: true, trim: true },
    fromEmail: { type: String, required: true, trim: true, lowercase: true },
    replyTo: { type: String, trim: true, lowercase: true },
    // Where the "new contact message" notification is sent — typically you.
    adminEmail: { type: String, required: true, trim: true, lowercase: true },
    adminSubject: { type: String, default: "New message from {name}" },
    // Optional confirmation email back to the person who submitted the form.
    sendConfirmation: { type: Boolean, default: true },
    confirmationSubject: { type: String, default: "Thanks for reaching out" },
    testMode: { type: Boolean, default: true },
    isActive: { type: Boolean, default: true },

    smtpHost: { type: String, trim: true },
    smtpPort: { type: Number, default: 587 },
    smtpSecure: { type: Boolean, default: false },
    smtpUser: { type: String, trim: true },
    smtpPassword: { type: String, select: false },

    sendgridApiKey: { type: String, select: false },
    resendApiKey: { type: String, select: false },
  },
  { timestamps: true }
);

export default models.EmailSettings || model("EmailSettings", EmailSettingsSchema);

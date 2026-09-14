import { Schema, models, model } from "mongoose";

export interface AdminDoc {
  _id: string;
  email: string;
  passwordHash: string;
}

const AdminSchema = new Schema<AdminDoc>({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
});

export default models.Admin || model<AdminDoc>("Admin", AdminSchema);

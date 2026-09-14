import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Message from "@/lib/models/Message";
import { requireAdmin } from "@/lib/requireAdmin";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  const body = await request.json().catch(() => ({}));
  await connectDB();
  const doc = await Message.findByIdAndUpdate(
    params.id,
    { read: body.read ?? true },
    { new: true }
  );
  if (!doc) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json(doc);
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  await connectDB();
  const doc = await Message.findByIdAndDelete(params.id);
  if (!doc) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json({ ok: true });
}

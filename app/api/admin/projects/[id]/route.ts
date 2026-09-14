import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Project from "@/lib/models/Project";
import { requireAdmin } from "@/lib/requireAdmin";
import cloudinary from "@/lib/cloudinary";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid body." }, { status: 400 });

  await connectDB();
  const doc = await Project.findByIdAndUpdate(params.id, body, {
    new: true,
    runValidators: true,
  });
  if (!doc) return NextResponse.json({ error: "Project not found." }, { status: 404 });
  return NextResponse.json(doc);
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  await connectDB();
  const doc = await Project.findByIdAndDelete(params.id);
  if (!doc) return NextResponse.json({ error: "Project not found." }, { status: 404 });

  // Best-effort cleanup of the associated Cloudinary asset.
  if (doc.imagePublicId) {
    try {
      await cloudinary.uploader.destroy(doc.imagePublicId);
    } catch (err) {
      console.error("Cloudinary cleanup failed:", err);
    }
  }

  return NextResponse.json({ ok: true });
}

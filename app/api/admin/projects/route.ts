import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import Project from "@/lib/models/Project";
import { requireAdmin } from "@/lib/requireAdmin";

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  await connectDB();
  const docs = await Project.find().sort({ order: 1, createdAt: 1 });
  return NextResponse.json(docs);
}

export async function POST(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const body = await request.json().catch(() => null);
  if (!body?.slug || !body?.title || !body?.description || !body?.image) {
    return NextResponse.json(
      { error: "slug, title, description and image are required." },
      { status: 400 }
    );
  }

  await connectDB();
  try {
    const count = await Project.countDocuments();
    const doc = await Project.create({ ...body, order: body.order ?? count });
    revalidatePath("/");
    return NextResponse.json(doc, { status: 201 });
  } catch (err: any) {
    if (err?.code === 11000) {
      return NextResponse.json(
        { error: "A project with that slug already exists." },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: "Failed to create project." }, { status: 500 });
  }
}

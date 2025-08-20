import { NextRequest, NextResponse } from "next/server";
import { deleteBook } from "@/lib/admin/actions/book";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const result = await deleteBook(id);
    if (!result.success) return NextResponse.json({ error: result.error }, { status: 400 });

    return NextResponse.json({ success: true, message: result.message });
  } catch (err) {
    console.error("POST /api/books/delete error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

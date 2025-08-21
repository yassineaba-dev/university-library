// app/api/books/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { deleteBook } from "@/lib/admin/actions/book";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  console.log("DELETE /api/books/[id] hit, id:", params.id);
  try {
    const result = await deleteBook(params.id);
    if (!result.success) return NextResponse.json({ error: result.error }, { status: 400 });
    return NextResponse.json({ success: true, message: result.message });
  } catch (err) {
    console.error("DELETE error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  console.log("POST /api/books/[id] hit, id:", params.id);
  try {
    const result = await deleteBook(params.id);
    if (!result.success) return NextResponse.json({ error: result.error }, { status: 400 });
    return NextResponse.json({ success: true, message: result.message });
  } catch (err) {
    console.error("POST error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

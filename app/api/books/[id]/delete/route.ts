// app/api/books/[id]/delete/route.ts
import { deleteBook } from "@/lib/admin/actions/book";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const result = await deleteBook(params.id);

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

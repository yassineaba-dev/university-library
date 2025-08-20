// This is a Next.js 13/14 app router API route
import { NextResponse } from "next/server";
import { deleteBook } from "@/lib/admin/actions/book";

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const result = await deleteBook(params.id);

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

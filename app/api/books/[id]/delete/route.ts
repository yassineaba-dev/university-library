// File: /app/api/books/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { deleteBook } from "@/lib/admin/actions/book";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const result = await deleteBook(params.id);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error }, 
        { status: 400 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: result.message 
    });
  } catch (error) {
    console.error("Delete book API error:", error);
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    );
  }
}

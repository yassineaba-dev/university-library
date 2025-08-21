// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { deleteUser } from "@/lib/admin/actions/user";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  console.log("DELETE /api/users/[id] hit, id:", params.id);
  try {
    const result = await deleteUser(params.id);
    if (!result.success) return NextResponse.json({ error: result.error }, { status: 400 });
    return NextResponse.json({ success: true, message: result.message });
  } catch (err) {
    console.error("DELETE error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

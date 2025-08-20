// app/api/books/delete/route.ts
import { NextRequest, NextResponse } from "next/server";
import { deleteBook } from "@/lib/admin/actions/book"; // keep if you want to call your logic

export async function GET(req: NextRequest) {
  console.log("GET /api/books/delete hit");
  return NextResponse.json({ ok: true, route: "/api/books/delete", method: "GET" });
}

export async function POST(req: NextRequest) {
  console.log("POST /api/books/delete hit");
  try {
    const body = await req.json().catch(() => null);
    console.log("POST body:", body);
    // optionally call your deleteBook here:
    // const result = await deleteBook(body?.id);
    // return NextResponse.json(result);

    return NextResponse.json({ ok: true, received: body });
  } catch (err) {
    console.error("POST error:", err);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}

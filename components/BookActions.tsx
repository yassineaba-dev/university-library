"use client";

import Image from "next/image";
import Link from "next/link";

export default function BookActions({ bookId }: { bookId: string }) {
  const handleDelete = async (bookId: string) => {
  const confirmed = confirm("Are you sure you want to delete this book?");
  if (!confirmed) return;

  try {
    const res = await fetch(`/api/books/${bookId}/delete`, { method: "DELETE" });

    let result;
    try {
      result = await res.json(); // safely parse response
    } catch {
      result = {};
    }

    if (!res.ok) {
      alert(result?.error || "Something went wrong.");
      return;
    }

    window.location.reload();
  } catch (err) {
    console.error("Delete failed:", err);
    alert("Something went wrong.");
  }
};

  return (
    <div className="flex flex-row items-center gap-3.5">
      <Link href={`/admin/books/${bookId}/edit`} className="relative size-5">
        <Image
          src="/icons/admin/edit.svg"
          fill
          className="object-contain"
          alt="edit"
        />
      </Link>
      <button onClick={handleDelete} className="relative size-5">
        <Image
          src="/icons/admin/trash.svg"
          fill
          className="object-contain"
          alt="delete"
        />
      </button>
    </div>
  );
}

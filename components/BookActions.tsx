// components/BookActions.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { deleteBook } from "@/lib/admin/actions/book";

export default function BookActions({ bookId }: { bookId: string }) {
  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this book?");
    if (!confirmed) return;

    const result = await deleteBook(bookId);
    if (result.success) {
      window.location.reload();
    } else {
      alert("Failed to delete the book.");
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

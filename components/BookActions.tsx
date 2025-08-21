"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface BookActionsProps {
  bookId: string;
  onDelete?: () => void; // optional now
}

export default function BookActions({ bookId, onDelete }: BookActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false);

 // In your BookActions component
const handleDelete = async () => {
  const confirmed = confirm(
    "Are you sure you want to delete this book? This action cannot be undone."
  );
  if (!confirmed) return;

  setIsDeleting(true);

  try {
    // Use the correct URL format
    const res = await fetch(`/api/books/${bookId}`, {
      method: "DELETE",
    });

    // Check if response is OK before trying to parse JSON
    if (!res.ok) {
      // Try to get error message from response
      let errorMsg = "Something went wrong.";
      try {
        const errorData = await res.json();
        errorMsg = errorData.error || errorMsg;
      } catch (e) {
        // If response is not JSON, use status text
        errorMsg = res.statusText || errorMsg;
      }
      alert(errorMsg);
      return;
    }

    // Parse response as JSON
    const result = await res.json();

    // If parent passed onDelete, call it; otherwise fallback to reload
    if (typeof onDelete === "function") {
      onDelete();
    } else {
      window.location.reload();
    }
  } catch (err) {
    console.error("Delete failed:", err);
    alert("Something went wrong. Please try again.");
  } finally {
    setIsDeleting(false);
  }
};
  
  return (
    <div className="flex items-center gap-3">
      <Link
        href={`/admin/books/${bookId}/edit`}
        className="rounded-md hover:bg-gray-100 transition-colors"
        title="Edit book"
      >
        <Image src="/icons/admin/edit.svg" width={22} height={22} alt="Edit" className="w-4 h-4" />
      </Link>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="rounded-md hover:bg-red-50 transition-colors disabled:opacity-50"
        title="Delete book"
      >
        {isDeleting ? (
          <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <Image src="/icons/admin/trash.svg" width={22} height={22} alt="Delete" className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}

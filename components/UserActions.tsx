// components/UserActions.tsx
"use client";

import { useState } from "react";
import Image from "next/image";

interface UserActionsProps {
  userId: string;
  onDelete?: () => void;
}

export default function UserActions({ userId, onDelete }: UserActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = confirm(
      "Are you sure you want to delete this user? This action cannot be undone."
    );
    if (!confirmed) return;

    setIsDeleting(true);

    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const result = await res.json();
        alert(result?.error || "Something went wrong.");
        return;
      }

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
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-1.5 rounded-md hover:bg-red-50 transition-colors disabled:opacity-50"
      title="Delete user"
    >
      {isDeleting ? (
        <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
      ) : (
        <Image 
          src="/icons/admin/trash.svg" 
          width={20} 
          height={20} 
          className="object-contain"
          alt="Delete user" 
        />
      )}
    </button>
  );
}

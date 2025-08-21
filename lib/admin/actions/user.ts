"use server";

import { revalidatePath } from "next/cache";
import { or, desc, asc, count, eq, ilike } from "drizzle-orm";

import { db } from "@/database/drizzle";
import { borrowRecords, users } from "@/database/schema";

const ITEMS_PER_PAGE = 20;

export async function getUsers({
  query,
  sort = "available",
  page = 1,
  limit = ITEMS_PER_PAGE,
}: QueryParams) {
  try {
    const searchConditions = query
      ? or(
          ilike(users.fullname, `%${query}%`),
          ilike(users.email, `%${query}%`)
        )
      : undefined;

    const sortOptions: Record<string, any> = {
      newest: desc(users.createdAt),
      oldest: asc(users.createdAt),
    };

    const sortingCondition = sortOptions[sort] || desc(users.createdAt);

    const usersData = await db
      .select({
        user: users,
        totalBorrowedBooks: count(borrowRecords.id).as("totalBorrowedBooks"),
      })
      .from(users)
      .leftJoin(
        borrowRecords,
        eq(borrowRecords.userId, users.id) // Match borrow records to users.
      )
      .where(searchConditions)
      .groupBy(users.id) // Group by user to get borrow counts.
      .orderBy(sortingCondition)
      .limit(limit)
      .offset((page - 1) * limit);

    const totalItems = await db
      .select({
        count: count(users.id),
      })
      .from(users)
      .where(searchConditions);

    const totalPages = Math.ceil(totalItems[0].count / ITEMS_PER_PAGE);
    const hasNextPage = page < totalPages;

    return {
      success: true,
      data: usersData,
      metadata: {
        totalPages,
        hasNextPage,
      },
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    return {
      success: false,
      error: "An error occurred while fetching users",
    };
  }
}

export async function updateAccountStatus(params: UpdateAccountStatusParams) {
  const { userId, status } = params;

  try {
    const updatedUser = await db
      .update(users)
      .set({ status })
      .where(eq(users.id, userId))
      .returning();

    revalidatePath("/admin/account-requests");
    return {
      success: true,
      data: updatedUser,
    };
  } catch (error) {
    console.error("Error updating user status:", error);
    return {
      success: false,
      error: "An error occurred while updating user status",
    };
  }
}

export async function deleteUser(id: string) {
  try {
    // First check if the user exists
    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    if (!existingUser) {
      return { success: false, error: "User not found" };
    }

    // Check if the user has active borrow records
    const [activeBorrowRecord] = await db
      .select()
      .from(borrowRecords)
      .where(eq(borrowRecords.userId, id))
      .limit(1);

    if (activeBorrowRecord) {
      return {
        success: false,
        error: "Cannot delete user with active borrow records",
      };
    }

    // Delete the user from the database
    await db.delete(users).where(eq(users.id, id));

    // Revalidate the admin users page
    try {
      revalidatePath("/admin/users");
    } catch (e) {
      console.warn("revalidatePath failed:", e);
    }

    return { success: true, message: "User deleted successfully" };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, error: "Failed to delete user. Please try again." };
  }
}

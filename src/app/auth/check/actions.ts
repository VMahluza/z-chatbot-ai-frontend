"use server";

import { authenticatedUser } from "@/app/actions";

export async function checkAuthAction() {
  try {
    const user = await authenticatedUser();
    return { success: true, user };
  } catch (error) {
    console.error("Auth check failed:", error);
    return { success: false, user: null };
  }
}

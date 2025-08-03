"use server";

import { cookies } from "next/headers";

export async function logoutAction() {
  try {
    const cookieStore = await cookies();
    
    // Clear the authentication cookie
    cookieStore.set("token", "", {
      path: "/",
      expires: new Date(0), // Expire immediately
      httpOnly: true,
    });

    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);
    return { success: false, error: "Logout failed" };
  }
}

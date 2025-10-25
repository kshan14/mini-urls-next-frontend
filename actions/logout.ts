"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutAction() {
  // 1. Get Cookies
  const cookieStore = await cookies();
  // 2. Set Auth Cookie to empty
  cookieStore.set("auth", "", {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 0,
  });
  // 3. Redirect to Login Page
  redirect("/login");
}

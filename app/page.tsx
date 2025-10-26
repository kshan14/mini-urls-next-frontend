import { cookies } from "next/headers";

import HeaderBar from "@/components/ui/HeaderBar";

import { parseJWTToken } from "@/lib/jwt";

export default async function Home() {
  // 1. Get token and verify
  const cookieStore = await cookies();
  const resp = await parseJWTToken(cookieStore);

  // 2. Check loggedIn and role
  let isLoggedIn = resp.data ? true : false;
  let isAdmin = isLoggedIn && resp.data?.role === "Admin";
  return <HeaderBar isAdmin={isAdmin} isLoggedIn={isLoggedIn} />;
}

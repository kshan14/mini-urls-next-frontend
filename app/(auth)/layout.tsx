import React from "react";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import HeaderBar from "@/components/ui/HeaderBar";

import { parseJWTToken } from "@/lib/jwt";
import env from "@/lib/env";
import { AdminRole } from "@/lib/apis/commonTypes";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const { WS_BASE_URL } = env();

export default async function AuthLayout({ children }: AuthLayoutProps) {
  // 1. get jwt data
  const cookieStore = await cookies();
  const resp = await parseJWTToken(cookieStore);

  // 2. check loggedIn and role
  const isLoggedIn = resp.data ? true : false;
  const isAdmin = isLoggedIn && resp.data?.role === AdminRole;
  const jwtToken = resp.data?.token;

  if (!isLoggedIn) {
    redirect("/login");
  }

  return (
    <div className="w-full h-full max-h-full flex flex-col">
      <HeaderBar
        isLoggedIn={isLoggedIn}
        isAdmin={isAdmin}
        wsUrl={WS_BASE_URL}
        jwtToken={jwtToken}
      />
      <div className="w-full flex-2 min-h-0 flex md:justify-center">
        {children}
      </div>
    </div>
  );
}

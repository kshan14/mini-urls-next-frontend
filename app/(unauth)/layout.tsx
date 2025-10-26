import React from "react";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { parseJWTToken } from "@/lib/jwt";

interface UnAuthLayoutProps {
  children: React.ReactNode;
}

export default async function UnAuthLayout({ children }: UnAuthLayoutProps) {
  const cookieStore = await cookies();
  const resp = await parseJWTToken(cookieStore);
  // if already logged in, redirect to home
  if (resp.data) {
    redirect("/");
  }
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      {children}
    </div>
  );
}

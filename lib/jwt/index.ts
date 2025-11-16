"use server";

import jwt, { JwtPayload } from "jsonwebtoken";

import env from "@/lib/env";
import { JWTUser } from "@/lib/jwt/types";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

const ClaimsIdKey =
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";

const ClaimsEmailKey =
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name";

const ClaimsRoleKey =
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

export async function parseJWTToken(cookies: ReadonlyRequestCookies): Promise<{
  data?: JWTUser;
  err?: string;
}> {
  // 1. get token from cookies
  const token = cookies.get("auth")?.value;
  // 2. if token is not there, return empty
  if (!token) {
    return {};
  }
  // 3. verify token
  try {
    const decoded = jwt.verify(
      token,
      env.JWT_SECRET_KEY as string
    ) as JwtPayload;
    return {
      data: {
        token,
        id: (decoded[ClaimsIdKey] as string) ?? "",
        email: (decoded[ClaimsEmailKey] as string) ?? "",
        role: (decoded[ClaimsRoleKey] as any) ?? "User",
      },
    };
  } catch (err) {
    console.error(`jwt verify failed: ${err}`);
    let errMsg = "JWT Failed";
    if (err instanceof Error) {
      errMsg = err.message;
    }
    return {
      err: errMsg,
    };
  }
}

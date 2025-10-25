"use server";

import env from "@/lib/env";
import { RegisterRequest, RegisterResponse } from "@/lib/apis/register/types";
import { ErrorResponse } from "@/lib/apis/commonTypes";
import { InternalServerErrMsg } from "@/lib/apis/commonConsts";

export async function registerAPI(
  req: RegisterRequest
): Promise<{ data?: RegisterResponse; err?: string }> {
  const url = `${env.API_BASE_URL}/api/users`;
  try {
    // 1. Send API Request
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });
    // 2. Parse response to json
    const jsonData = await resp.json();
    // 3. Http Status Okay. just type cast and return
    if (resp.ok) {
      return {
        data: jsonData as RegisterResponse,
      };
    }
    // 4. not okay. check error structure follows error schema
    console.error(`register failed: ${jsonData}`);
    return {
      err:
        (jsonData as ErrorResponse)?.errors?.[0]?.message ??
        InternalServerErrMsg,
    };
  } catch (err) {
    // 5. Something unexpected happens returns Internal Server Err Message
    console.error(`register error: ${err}`);
    return {
      err: InternalServerErrMsg,
    };
  }
}

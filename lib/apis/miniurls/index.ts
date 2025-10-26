"use server";

import env from "@/lib/env";
import {
  CreateMiniUrlRequest,
  CreateMiniUrlResponse,
} from "@/lib/apis/miniurls/types";
import { ErrorResponse } from "@/lib/apis/commonTypes";
import { InternalServerErrMsg } from "@/lib/apis/commonConsts";

export async function createMiniUrlAPI(
  authToken: string,
  req: CreateMiniUrlRequest
): Promise<{ data?: CreateMiniUrlResponse; err?: string }> {
  const url = `${env.API_BASE_URL}/api/miniurls`;
  try {
    // 1. send API request
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(req),
    });

    // 2. Parse response to json
    const jsonData = await resp.json();

    // 3. Http Status Okay. just type cast and return
    if (resp.ok) {
      return {
        data: jsonData as CreateMiniUrlResponse,
      };
    }

    // 4. not okay. check error structure follows error schema
    console.error(`create mini url failed: ${jsonData}`);
    return {
      err:
        (jsonData as ErrorResponse)?.errors?.[0]?.message ??
        InternalServerErrMsg,
    };
  } catch (err) {
    // 5. something unexpected happens returns Internal Server Err Message
    console.error(`create mini url error: ${err}`);
    return {
      err: InternalServerErrMsg,
    };
  }
}

"use server";

import env from "@/lib/env";
import {
  CreateMiniUrlRequest,
  CreateMiniUrlResponse,
  GetMiniUrlResponse,
} from "@/lib/apis/miniurls/types";
import { ErrorResponse, PaginationResponse } from "@/lib/apis/commonTypes";
import { InternalServerErrMsg } from "@/lib/apis/commonConsts";
import { URLSearchParams } from "url";

const { API_BASE_URL } = env();

export async function createMiniUrlAPI(
  authToken: string,
  req: CreateMiniUrlRequest
): Promise<{ data?: CreateMiniUrlResponse; err?: string }> {
  const url = `${API_BASE_URL}/api/miniurls`;
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

export async function getMiniUrlPageAPI(
  authToken: string,
  offset: number,
  limit: number,
  status?: string
): Promise<{
  data?: PaginationResponse<GetMiniUrlResponse>;
  err?: string;
}> {
  // 1. Prepare search params and url
  const searchParams = new URLSearchParams({
    offset: offset.toString(),
    limit: limit.toString(),
  });
  if (status) {
    searchParams.append("status", status);
  }
  const url = `${API_BASE_URL}/api/miniurls?${searchParams.toString()}`;
  // 2. Send API Request
  try {
    const resp = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    // 3. Parse response to json
    const jsonData = await resp.json();
    // 4. Http Status Okay. just type cast and return
    if (resp.ok) {
      return {
        data: jsonData as PaginationResponse<GetMiniUrlResponse>,
      };
    }
    // 4. not okay. check error structure follows error schema
    console.error(`get miniurl page failed: ${jsonData}`);
    return {
      err:
        (jsonData as ErrorResponse)?.errors?.[0]?.message ??
        InternalServerErrMsg,
    };
  } catch (err) {
    // 5. Something unexpected happens returns Internal Server Err Message
    console.error(`get miniurl page error: ${err}`);
    return {
      err: InternalServerErrMsg,
    };
  }
}

export async function approveMiniUrlAPI(
  authToken: string,
  id: string
): Promise<{ err?: string }> {
  const url = `${API_BASE_URL}/api/miniurls/approve/${id}`;
  // 1. Send API Request
  try {
    const resp = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (resp.ok) {
      return {};
    }
    const jsonData = await resp.json();
    console.error(`approve miniurl failed: ${jsonData}`);
    return {
      err:
        (jsonData as ErrorResponse)?.errors?.[0]?.message ??
        InternalServerErrMsg,
    };
  } catch (err) {
    console.error(`approve miniurl error: ${err}`);
    return {
      err: InternalServerErrMsg,
    };
  }
}

export async function denyMiniUrlAPI(
  authToken: string,
  id: string
): Promise<{ err?: string }> {
  const url = `${API_BASE_URL}/api/miniurls/deny/${id}`;
  // 1. Send API Request
  try {
    const resp = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (resp.ok) {
      return {};
    }
    const jsonData = await resp.json();
    console.error(`deny miniurl failed: ${jsonData}`);
    return {
      err:
        (jsonData as ErrorResponse)?.errors?.[0]?.message ??
        InternalServerErrMsg,
    };
  } catch (err) {
    console.error(`deny miniurl error: ${err}`);
    return {
      err: InternalServerErrMsg,
    };
  }
}

export async function deleteMiniUrlAPI(
  authToken: string,
  id: string
): Promise<{ err?: string }> {
  const url = `${API_BASE_URL}/api/miniurls/delete/${id}`;
  // 1. Send API Request
  try {
    const resp = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (resp.ok) {
      return {};
    }
    const jsonData = await resp.json();
    console.error(`delete miniurl failed: ${jsonData}`);
    return {
      err:
        (jsonData as ErrorResponse)?.errors?.[0]?.message ??
        InternalServerErrMsg,
    };
  } catch (err) {
    console.error(`delete miniurl error: ${err}`);
    return {
      err: InternalServerErrMsg,
    };
  }
}

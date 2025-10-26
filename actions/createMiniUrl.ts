"use server";

import { cookies } from "next/headers";

import { createMiniUrlSchema, validateSchema } from "@/lib/validation";
import { createMiniUrlAPI } from "@/lib/apis/miniurls";

export type ActionState = {
  errors?: {
    [key: string]: string;
  };
  createUrlError?: string;
  url: string;
  description: string;
  createdUrlInfo?: {
    id: string;
    url: string;
    shortenedUrl: string;
  };
};

export async function createMiniUrlAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  // extract form data
  const miniUrlJsonData = {
    url: formData.get("url")?.toString() ?? "",
    description: formData.get("description")?.toString() ?? "",
  };

  // validate
  const validationErr = validateSchema(createMiniUrlSchema, miniUrlJsonData);
  if (validationErr) {
    return {
      ...miniUrlJsonData,
      errors: validationErr,
    };
  }

  // get auth token from cookies
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth")?.value ?? "";

  // create mini url api
  const resp = await createMiniUrlAPI(authToken, miniUrlJsonData);

  if (resp.err) {
    return {
      ...miniUrlJsonData,
      createUrlError: resp.err,
    };
  }

  // mini url creation successful, return true
  return {
    url: "",
    description: "",
    createdUrlInfo: {
      id: resp.data?.id ?? "",
      shortenedUrl: resp.data?.shortenedUrl ?? "",
      url: resp.data?.url ?? "",
    },
  };
}

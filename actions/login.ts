"use server";

import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";

import { loginSchema, validateSchema } from "@/lib/validation";
import { loginAPI } from "@/lib/apis/login";

export type ActionState = {
  errors?: {
    [key: string]: string;
  };
  loginError?: string;
  username: string;
  password: string;
};

export async function loginAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  // extract form data
  const loginJsonData = {
    username: formData.get("username")?.toString() ?? "",
    password: formData.get("password")?.toString() ?? "",
  };

  // validate
  const validationErr = validateSchema(loginSchema, loginJsonData);
  if (validationErr) {
    return {
      ...loginJsonData,
      errors: validationErr,
    };
  }

  // login api
  const resp = await loginAPI(loginJsonData);

  // login error, send login error message
  if (resp.err) {
    return {
      username: "",
      password: "",
      loginError: resp.err,
    };
  }

  // login successful, set cookies and redirect
  const cookieStore = await cookies();
  cookieStore.set("auth", resp.data?.token!, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 2, // 2 hours in seconds
  });

  // if login page is accessed indirectly from other protected page, then redirect back to the original page
  const headerList = await headers();
  const redirectPath = headerList.get("x-pathname") ?? "/register";
  redirect(redirectPath);
}

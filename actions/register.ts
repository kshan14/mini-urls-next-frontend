"use server";

import { redirect } from "next/navigation";

import { registerUserSchema, validateSchema } from "@/lib/validation";
import { registerAPI } from "@/lib/apis/register";

export interface ActionState {
  errors?: {
    [key: string]: string;
  };
  registerError?: string;
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
}

export async function registerAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  // extract form data
  const registerJsonData = {
    username: formData.get("username")?.toString() ?? "",
    password: formData.get("password")?.toString() ?? "",
    confirmPassword: formData.get("confirmPassword")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
  };

  // validate
  const validationErr = validateSchema(registerUserSchema, registerJsonData);
  if (validationErr) {
    return {
      ...registerJsonData,
      errors: validationErr,
    };
  }

  // register api
  const resp = await registerAPI({
    username: registerJsonData.username,
    password: registerJsonData.password,
    email: registerJsonData.email,
  });

  // registration error, send error message
  if (resp.err) {
    return {
      username: "",
      password: "",
      email: "",
      confirmPassword: "",
      registerError: resp.err,
    };
  }

  // registration successful, redirect
  redirect("/login");
}

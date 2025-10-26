import { z, ZodObject } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .nonempty("Username is required")
    .max(50, "Username cannot exceed 50 characters"),
  password: z
    .string()
    .nonempty("Password is required")
    .max(50, "Password cannot exceed 50 characters"),
});

export const registerUserSchema = z
  .object({
    username: z
      .string()
      .nonempty("Username is required")
      .max(50, "Username cannot exceed 50 characters"),
    password: z
      .string()
      .nonempty("Password is required")
      .max(50, "Password cannot exceed 50 characters"),
    confirmPassword: z
      .string()
      .nonempty("Confirm Password is required")
      .max(50, "Confirm Password cannot exceed 50 characters"),
    email: z
      .email("Email is invalid")
      .nonempty("Email is required")
      .max(50, "Email cannot exceed 50 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const createMiniUrlSchema = z.object({
  url: z
    .url("Url is invalid")
    .nonempty("Url is required")
    .max(2000, "Url cannot exceed 2000 characters"),
  description: z
    .string()
    .nonempty("Description is required")
    .max(2000, "Description cannot exceed 2000 characters"),
});

export function validateSchema<T extends ZodObject<any>>(
  schema: T,
  data: unknown
): Record<string, string> | undefined {
  const result = schema.safeParse(data);

  if (result.success) return undefined;

  const formatted = result.error.format();

  const fieldErrors: Record<string, string> = Object.fromEntries(
    Object.entries(formatted)
      .map(([field, val]) => {
        const firstErr = (val as any)._errors?.[0];
        return firstErr ? [field, firstErr] : null;
      })
      .filter((e): e is [string, string] => e != null)
  );

  return Object.keys(fieldErrors).length > 0 ? fieldErrors : undefined;
}

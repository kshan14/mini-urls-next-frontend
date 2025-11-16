export interface JWTUser {
  id: string;
  email: string;
  role: "Admin" | "User";
  token: string;
}

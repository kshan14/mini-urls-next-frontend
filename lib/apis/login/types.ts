export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  id: string;
  email: string;
  token: string;
  role: "Admin" | "User";
}

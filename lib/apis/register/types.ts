export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
}

export interface RegisterResponse {
  id: string;
  email: string;
  role: string;
}

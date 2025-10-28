export interface ErrFieldMsg {
  field: string;
  message: string;
}

export interface ErrorResponse {
  title: string;
  url: string;
  statusCode: number;
  traceId: string;
  timestamp: string;
  errors: ErrFieldMsg[];
}

export interface PaginationResponse<T> {
  data: T[];
  length: number;
  totalCount: number;
}

export const UserRole: Role = "User";
export const AdminRole: Role = "Admin";
export type Role = "Admin" | "User";

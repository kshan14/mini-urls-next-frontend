import { Role } from "@/lib/apis/commonTypes";

export interface CreateMiniUrlRequest {
  url: string;
  description: string;
}

export const PendingUrlStatus: UrlStatus = "Pending";
export const ApprovedUrlStatus: UrlStatus = "Approved";
export const RejectedUrlStatus: UrlStatus = "Rejected";
export type UrlStatus = "Pending" | "Approved" | "Rejected";

export interface CreateMiniUrlResponse {
  id: string;
  url: string;
  shortenedUrl: string;
  description: string;
  status: UrlStatus;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
}

interface UrlUser {
  id: string;
  email: string;
  role: Role;
}

export interface GetMiniUrlResponse extends CreateMiniUrlResponse {
  createdBy: UrlUser;
  approvedBy?: UrlUser;
}

export interface CreateMiniUrlRequest {
  url: string;
  description: string;
}

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

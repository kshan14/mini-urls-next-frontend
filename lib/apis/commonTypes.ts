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

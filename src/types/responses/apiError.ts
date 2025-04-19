export interface ApiError {
  statusCode: number;
  message: string;
  details?: Record<string, string>;
} 
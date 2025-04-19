export interface ApiResponse<T> {
  statusCode: number;
  content: T;
  message?: string;
} 
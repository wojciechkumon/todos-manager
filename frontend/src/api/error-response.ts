export interface ErrorResponse {
  statusCode: number;
  message: string | ValidationError[];
  error?: string;
}

export interface ValidationError {
  property: string;
  value?: string | number;
  constraints: Record<string, string>;
  target: Record<string, string | number>;
  children: string[];
}

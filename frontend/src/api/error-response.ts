export interface ErrorResponse {
  statusCode: number;
  message: string | ValidationErrorMessages[];
  error?: string;
}

export interface ValidationErrorMessages {
  property: string;
  value?: string | number;
  constraints: Record<string, string>;
  target: Record<string, string | number>;
  children: string[];
}

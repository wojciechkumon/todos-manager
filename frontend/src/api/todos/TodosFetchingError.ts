import { HttpStatusCode } from 'axios';
import { ErrorResponse } from '../error-response.ts';

export class TodosFetchingError extends Error {
  info: ErrorResponse;
  status: HttpStatusCode;

  constructor(message: string, info: ErrorResponse, status: HttpStatusCode) {
    super(message);
    this.info = info;
    this.status = status;
  }
}

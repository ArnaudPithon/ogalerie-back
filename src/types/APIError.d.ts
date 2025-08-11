export interface apiError {
  error: Error,
  message: string,
  code: number,
  date: Date,
  stack: string,
}

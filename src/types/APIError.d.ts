export interface ApiError {
  error: Error,
  message: string,
  code: number,
  date: Date,
  stack: string,
}

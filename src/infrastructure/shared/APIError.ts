class APIError extends Error {
  error?: Error;
  code: number;
  date: Date;

  constructor(message: string, code: number, err?: Error) {
    // Parent constructor
    super(message);

    if (err) {
      this.error = err;
    }

    this.code = code;
    this.date = new Date();
  }
}

export default APIError;

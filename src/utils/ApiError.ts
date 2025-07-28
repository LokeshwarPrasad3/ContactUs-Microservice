class ApiError extends Error {
  statusCode: number;
  data: null | any;
  errors: any[] = [];
  success: boolean;

  constructor(
    statusCode: number,
    message: string = "Something went wrong!!",
    errors: any[] = [],
    stack: string = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.success = false;
    this.message = message;
    this.errors = errors;
    this.stack = stack;
  }
}

export { ApiError };

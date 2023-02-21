export class ActionResult<T> {
  success: boolean = true;
  data: T;
  error: string = "";
  errorCode: number | null = null;

  constructor(data: T) {
    this.data = data;
  }

  setError(errorCode: number, message: string): void {
    this.success = false;
    this.error = message;
    this.errorCode = errorCode;
  }
}
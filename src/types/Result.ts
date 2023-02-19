export type Result<T> = {
  success: boolean;
  data: T;
  error?: Error | string;
  errorCode?: number 
};
export interface SuccessResult<T> {
  result: T;
  success: true;
}

export interface FailureResult {
  success: false;
}

export type Result<T> = SuccessResult<T>|FailureResult;

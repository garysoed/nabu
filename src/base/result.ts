export interface SuccessResult<T> {
  result: T;
  success: true;
}

export interface FailureResult {
  success: false;
}

export type Result<T> = SuccessResult<T>|FailureResult;

export function success<T>(result: T): SuccessResult<T> {
  return {success: true, result};
}

export function failure(): FailureResult {
  return {success: false};
}
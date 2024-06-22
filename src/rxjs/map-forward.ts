import {Observable, of, OperatorFunction, throwError} from 'rxjs';
import {switchMap} from 'rxjs/operators';

import {Converter} from '../base/converter';

function handleFailure<F, T>(fromValue: F): Observable<T> {
  return throwError(new Error(`${fromValue} cannot be converted`));
}

export function mapForward<F, T>(
  converter: Converter<F, T>,
  onFailure: (fromValue: F) => Observable<T> = handleFailure,
): OperatorFunction<F, T> {
  return switchMap((fromValue) => {
    const result = converter.convertForward(fromValue);
    if (!result.success) {
      return onFailure(fromValue);
    }

    return of(result.result);
  });
}

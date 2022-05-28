import {Converter} from '../base/converter';
import {Result} from '../base/result';

class IdentityConverter<T> implements Converter<T, T> {
  convertBackward(value: T): Result<T> {
    return {result: value, success: true};
  }

  convertForward(value: T): Result<T> {
    return {result: value, success: true};
  }
}

export function identity<T>(): IdentityConverter<T> {
  return new IdentityConverter();
}

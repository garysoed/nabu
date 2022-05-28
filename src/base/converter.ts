import {Result} from './result';

export interface Converter<F, T> {
  convertBackward(value: T): Result<F>;

  convertForward(input: F): Result<T>;
}

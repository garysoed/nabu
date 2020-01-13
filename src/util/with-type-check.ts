import { Type } from '@gs-types';

import { Converter } from '../base/converter';
import { Result } from '../base/result';

class WithTypeCheckConverter<T> implements Converter<unknown, T> {
  constructor(private readonly type: Type<T>) { }
  convertBackward(value: T): Result<unknown> {
    return {success: true, result: value};
  }

  convertForward(input: unknown): Result<T> {
    if (this.type.check(input)) {
      return {success: true, result: input};
    }

    return {success: false};
  }
}

export function withTypeCheck<T>(type: Type<T>): Converter<unknown, T> {
  return new WithTypeCheckConverter(type);
}

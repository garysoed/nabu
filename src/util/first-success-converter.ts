import {Converter} from '../base/converter';
import {Result} from '../base/result';

class FirstSuccessConverter<A, B> implements Converter<A, B> {
  constructor(private readonly converters: Array<Converter<A, B>>) {}

  convertBackward(value: B): Result<A> {
    for (const converter of this.converters) {
      const result = converter.convertBackward(value);
      if (result.success) {
        return result;
      }
    }

    return {success: false};
  }

  convertForward(input: A): Result<B> {
    for (const converter of this.converters) {
      const result = converter.convertForward(input);
      if (result.success) {
        return result;
      }
    }

    return {success: false};
  }
}

export function firstSuccess<A, B>(
  ...converters: Array<Converter<A, B>>
): Converter<A, B> {
  return new FirstSuccessConverter(converters);
}

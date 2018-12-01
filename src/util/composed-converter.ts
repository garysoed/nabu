import { Converter } from '../base/converter';
import { Result } from '../base/result';

class ComposedConverter<A, B> implements Converter<A, B> {
  private readonly converters_: Array<Converter<unknown, unknown>>;
  private readonly reversedConverters_: Array<Converter<unknown, unknown>>;

  constructor(...converters: Array<Converter<unknown, unknown>>) {
    this.converters_ = converters;
    this.reversedConverters_ = [...converters].reverse();
  }

  convertBackward(value: B): Result<A> {
    let currentValue: any = value;
    for (const converter of this.reversedConverters_) {
      const result = converter.convertBackward(currentValue);
      if (!result.success) {
        return {success: false};
      }

      currentValue = result.result;
    }

    return {result: currentValue as A, success: true};
  }

  convertForward(value: A): Result<B> {
    let currentValue: any = value;
    for (const converter of this.converters_) {
      const result = converter.convertForward(currentValue);
      if (!result.success) {
        return {success: false};
      }

      currentValue = result.result;
    }

    return {result: currentValue as B, success: true};
  }
}

export function compose<A, B>(converter: Converter<A, B>): Converter<A, B>;
export function compose<A, T0, B>(
    converter0: Converter<A, T0>,
    converter1: Converter<T0, B>,
): Converter<A, B>;
export function compose<A, T0, T1, B>(
    converter0: Converter<A, T0>,
    converter1: Converter<T0, T1>,
    converter2: Converter<T1, B>,
): Converter<A, B>;
export function compose(
    // tslint:disable-next-line:trailing-comma
    ...converters: Array<Converter<unknown, unknown>>
): Converter<unknown, unknown> {
  return new ComposedConverter(...converters);
}

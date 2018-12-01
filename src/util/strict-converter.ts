import { Converter } from '../base/converter';

export class StrictConverter<A, B> {
  constructor(private readonly baseConverter: Converter<A, B>) { }

  convertBackward(value: B): A {
    const result = this.baseConverter.convertBackward(value);
    if (!result.success) {
      throw new Error(`Conversion of ${value} failed`);
    }

    return result.result;
  }

  convertForward(value: A): B {
    const result = this.baseConverter.convertForward(value);
    if (!result.success) {
      throw new Error(`Conversion of ${value} failed`);
    }

    return result.result;
  }
}

export function strict<A, B>(baseConverter: Converter<A, B>): StrictConverter<A, B> {
  return new StrictConverter(baseConverter);
}

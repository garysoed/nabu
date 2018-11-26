import { Converter } from '../base/converter';
import { Result } from '../base/result';

class ReversedConverter<A, B> implements Converter<B, A> {
  constructor(private readonly base_: Converter<A, B>) {}

  convertBackward(value: A): Result<B> {
    return this.base_.convertForward(value);
  }

  convertForward(value: B): Result<A> {
    return this.base_.convertBackward(value);
  }
}

export function reverse<A, B>(base: Converter<A, B>): Converter<B, A> {
  return new ReversedConverter(base);
}

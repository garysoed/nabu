import { ImmutableSet } from 'gs-tools/export/collect';
import { Converter } from '../base/converter';
import { Result } from '../base/result';
import { Serializable } from '../base/serializable';

class StringMatchConverter<T extends string> implements Converter<T, Serializable> {
  constructor(private readonly acceptableValues_: ImmutableSet<T>) { }

  convertBackward(value: Serializable): Result<T> {
    if (typeof value !== 'string') {
      return {success: false};
    }

    const isAcceptable = this.acceptableValues_.has(value as T);
    if (!isAcceptable) {
      return {success: false};
    }

    return {result: value as T, success: true};
  }

  convertForward(input: T): Result<Serializable> {
    const isAcceptable = this.acceptableValues_.has(input);
    if (!isAcceptable) {
      return {success: false};
    }

    return {result: input, success: true};
  }
}

export function stringMatchConverter<T extends string>(
    acceptableValues: Iterable<T>,
): StringMatchConverter<T> {
  return new StringMatchConverter<T>(ImmutableSet.of(acceptableValues));
}

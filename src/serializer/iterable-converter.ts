import { Converter } from '../base/converter';
import { Result } from '../base/result';
import { Serializable } from '../base/serializable';

class IterableConverter<T, I extends Iterable<T>> implements Converter<I, Serializable> {
  constructor(
      private readonly iterableProvider_: (content: Iterable<T>) => I,
      private readonly itemConverter_: Converter<T, Serializable>,
  ) { }

  convertBackward(value: Serializable): Result<I> {
    if (!(value instanceof Array)) {
      return {success: false};
    }

    const convertedItems: T[] = [];
    for (const item of value) {
      const conversionResult = this.itemConverter_.convertBackward(item);
      if (!conversionResult.success) {
        return {success: false};
      }

      convertedItems.push(conversionResult.result);
    }

    return {result: this.iterableProvider_(convertedItems), success: true};
  }

  convertForward(input: I): Result<Serializable> {
    const convertedItems: Serializable[] = [];
    for (const item of input) {
      const conversionResult = this.itemConverter_.convertForward(item);
      if (!conversionResult.success) {
        return {success: false};
      }

      convertedItems.push(conversionResult.result);
    }

    return {result: convertedItems, success: true};
  }
}

export function iterableConverter<T, I extends Iterable<T>>(
    provider: (content: Iterable<T>) => I,
    itemConverter: Converter<T, Serializable>,
): IterableConverter<T, I> {
  return new IterableConverter(provider, itemConverter);
}

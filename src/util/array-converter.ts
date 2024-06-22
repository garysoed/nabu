import {Converter} from '../base/converter';
import {failure, Result, success} from '../base/result';

/**
 * Converts the input array.
 *
 * Only successful if all of the items are successfully converted.
 */
export function array<F, T>(
  itemConverter: Converter<F, T>,
): Converter<readonly F[], readonly T[]> {
  return {
    convertBackward(input: readonly T[]): Result<readonly F[]> {
      return input
        .map((item) => itemConverter.convertBackward(item))
        .reduce(
          (result: Result<readonly F[]>, current) =>
            reduceResults(result, current),
          success([]),
        );
    },

    convertForward(input: readonly F[]): Result<readonly T[]> {
      return input
        .map((item) => itemConverter.convertForward(item))
        .reduce(
          (result: Result<readonly T[]>, current) =>
            reduceResults(result, current),
          success([]),
        );
    },
  };
}

function reduceResults<T>(
  acc: Result<readonly T[]>,
  curr: Result<T>,
): Result<readonly T[]> {
  if (!acc.success) {
    return acc;
  }

  if (!curr.success) {
    return failure();
  }

  return success([...acc.result, curr.result]);
}

import {arrayThat, assert, should, test} from 'gs-testing';

import {Converter} from '../base/converter';
import {failure, Result, success} from '../base/result';

import {array} from './array-converter';

const EVEN_CONVERTER: Converter<number, number> = {
  convertBackward(input: number): Result<number> {
    if (input % 2 === 0) {
      return failure();
    }

    return success(input - 1);
  },

  convertForward(input: number): Result<number> {
    if (input % 2 === 1) {
      return failure();
    }

    return success(input + 1);
  },
};

test('@nabu/src/util/array-converter', () => {
  test('convertBackward', () => {
    should('convert correctly', () => {
      assert(
        array(EVEN_CONVERTER).convertBackward([1, 3, 5]),
      ).to.haveProperties({
        success: true,
        result: arrayThat<number>().haveExactElements([0, 2, 4]),
      });
    });

    should('fail if one of the items failed', () => {
      assert(
        array(EVEN_CONVERTER).convertBackward([1, 4, 5]),
      ).to.haveProperties({success: false});
    });
  });

  test('convertForward', () => {
    should('convert correctly', () => {
      assert(array(EVEN_CONVERTER).convertForward([0, 2, 4])).to.haveProperties(
        {
          success: true,
          result: arrayThat<number>().haveExactElements([1, 3, 5]),
        },
      );
    });

    should('fail if one of the items failed', () => {
      assert(
        array(EVEN_CONVERTER).convertBackward([0, 3, 4]),
      ).to.haveProperties({success: false});
    });
  });
});

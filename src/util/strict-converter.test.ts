import {assert, setup, should, test} from 'gs-testing';

import {Converter} from '../base/converter';
import {Result} from '../base/result';

import {reverse} from './reversed-converter';
import {strict} from './strict-converter';

class TestConverter implements Converter<number, string> {
  convertBackward(value: string): Result<number> {
    const result = parseFloat(value);
    if (isNaN(result)) {
      return {success: false};
    }

    return {result, success: true};
  }

  convertForward(input: number): Result<string> {
    return {result: input.toString(), success: true};
  }
}

test('util.StrictConverter', () => {
  test('convertBackward', () => {
    const _ = setup(() => {
      const converter = strict(new TestConverter());
      return {converter};
    });

    should('return the result if successful', () => {
      assert(_.converter.convertBackward('1.23')).to.equal(1.23);
    });

    should('throw error if fail', () => {
      assert(() => _.converter.convertBackward('abc')).to.throwErrorWithMessage(
        /Conversion of/,
      );
    });
  });

  test('convertForward', () => {
    const _ = setup(() => {
      const converter = strict(reverse(new TestConverter()));
      return {converter};
    });

    should('return the result if successful', () => {
      assert(_.converter.convertForward('1.23')).to.equal(1.23);
    });

    should('throw error if fail', () => {
      assert(() => _.converter.convertForward('abc')).to.throwErrorWithMessage(
        /Conversion of/,
      );
    });
  });
});

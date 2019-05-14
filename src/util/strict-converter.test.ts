import { assert, setup, should, test } from '@gs-testing';
import { Converter } from '../base/converter';
import { Result } from '../base/result';
import { reverse } from './reversed-converter';
import { strict, StrictConverter } from './strict-converter';

class NumberConverter implements Converter<number, string> {
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
    let converter: StrictConverter<number, string>;

    setup(() => {
      converter = strict(new NumberConverter());
    });

    should(`return the result if successful`, () => {
      assert(converter.convertBackward('1.23')).to.equal(1.23);
    });

    should(`throw error if fail`, () => {
      assert(() => converter.convertBackward('abc')).to.throwErrorWithMessage(/Conversion of/);
    });
  });

  test('convertForward', () => {
    let converter: StrictConverter<string, number>;

    setup(() => {
      converter = strict(reverse(new NumberConverter()));
    });

    should(`return the result if successful`, () => {
      assert(converter.convertForward('1.23')).to.equal(1.23);
    });

    should(`throw error if fail`, () => {
      assert(() => converter.convertForward('abc')).to.throwErrorWithMessage(/Conversion of/);
    });
  });
});

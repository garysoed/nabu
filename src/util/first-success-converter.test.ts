import { assert, setup, should, test } from 'gs-testing/export/main';
import { Converter } from '../base/converter';
import { Result } from '../base/result';
import { firstSuccess } from './first-success-converter';
import { reverse } from './reversed-converter';
import { strict } from './strict-converter';

class FloatParseConverter implements Converter<number, string> {
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

class IntegerParseConverter implements Converter<number, string> {
  convertBackward(value: string): Result<number> {
    const result = parseInt(value, 10);
    if (isNaN(result)) {
      return {success: false};
    }

    return {result, success: true};
  }

  convertForward(input: number): Result<string> {
    return {result: input.toString(), success: true};
  }
}

test('util.FirstSuccessConverter', () => {
  test('convertBackward', () => {
    let converter: Converter<number, string>;

    setup(() => {
      converter = firstSuccess(new IntegerParseConverter(), new FloatParseConverter());
    });

    should(`return the first successful conversion`, () => {
      assert(strict(converter).convertBackward('1.23')).to.equal(1);
    });

    should(`fail if none of the converters are successful`, () => {
      assert(converter.convertBackward('abc')).to.haveProperties({success: false});
    });
  });

  test('convertForward', () => {
    let converter: Converter<string, number>;

    setup(() => {
      converter = firstSuccess(
          reverse(new IntegerParseConverter()),
          reverse(new FloatParseConverter()),
      );
    });

    should(`return the first successful conversion`, () => {
      assert(strict(converter).convertForward('1.23')).to.equal(1);
    });

    should(`fail if none of the converters are successful`, () => {
      assert(converter.convertForward('abc')).to.haveProperties({success: false});
    });
  });
});

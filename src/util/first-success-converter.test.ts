import {assert, should, test} from 'gs-testing';

import {Converter} from '../base/converter';
import {Result} from '../base/result';

import {firstSuccess} from './first-success-converter';
import {reverse} from './reversed-converter';
import {strict} from './strict-converter';


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
  test('convertBackward', init => {
    const _ = init(() => {
      const converter = firstSuccess(new IntegerParseConverter(), new FloatParseConverter());
      return {converter};
    });

    should('return the first successful conversion', () => {
      assert(strict(_.converter).convertBackward('1.23')).to.equal(1);
    });

    should('fail if none of the converters are successful', () => {
      assert(_.converter.convertBackward('abc')).to.haveProperties({success: false});
    });
  });

  test('convertForward', init => {
    const _ = init(() => {
      const converter = firstSuccess(
          reverse(new IntegerParseConverter()),
          reverse(new FloatParseConverter()),
      );
      return {converter};
    });

    should('return the first successful conversion', () => {
      assert(strict(_.converter).convertForward('1.23')).to.equal(1);
    });

    should('fail if none of the converters are successful', () => {
      assert(_.converter.convertForward('abc')).to.haveProperties({success: false});
    });
  });
});

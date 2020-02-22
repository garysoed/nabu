import { assert, should, test } from 'gs-testing';
import { Converter } from '../base/converter';
import { Result } from '../base/result';
import { reverse } from './reversed-converter';

class ForwardOnlyConverter implements Converter<object, object> {
  convertBackward(value: object): Result<object> {
    return {success: false};
  }

  convertForward(value: object): Result<object> {
    return {result: value, success: true};
  }
}

test('util.ReversedConverter', () => {
  test('convertBackward', () => {
    should(`convert correctly`, () => {
      const converter = reverse(new ForwardOnlyConverter());
      const obj = {};
      assert(converter.convertBackward(obj)).to.haveProperties({result: obj});
    });
  });

  test('convertForward', () => {
    should(`convert correctly`, () => {
      const converter = reverse(new ForwardOnlyConverter());
      assert(converter.convertForward({})).to.haveProperties({success: false});
    });
  });
});

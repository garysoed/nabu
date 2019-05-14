import { assert, setup, should, test } from '@gs-testing';
import { SuccessResult } from '../../base/result';
import { Base64 } from './base64';

test('grammar.binary.Base64', () => {
  let converter: Base64;

  setup(() => {
    converter = new Base64();
  });

  test('convertBackward', () => {
    should(`convert correctly`, () => {
      const encoder = new TextEncoder();
      const length6Array = encoder.encode('Base64');
      const length5Array = encoder.encode('Hello');
      const length4Array = encoder.encode('blaH');

      const forward6Result =
          (converter.convertBackward(btoa('Base64')) as SuccessResult<Uint8Array>).result;
      assert([...forward6Result]).to.haveExactElements([...length6Array]);
      const forward5Result =
          (converter.convertBackward(btoa('Hello')) as SuccessResult<Uint8Array>).result;
      assert([...forward5Result]).to.haveExactElements([...length5Array]);
      const forward4Result =
          (converter.convertBackward(btoa('blaH')) as SuccessResult<Uint8Array>).result;
      assert([...forward4Result]).to.haveExactElements([...length4Array]);
    });

    should(`fail if the length is invalid`, () => {
      assert(converter.convertBackward('SGVsbG8')).to.haveProperties({success: false});
    });

    should(`fail if one of the letters is invalid`, () => {
      assert(converter.convertBackward('SGVs=G8=')).to.haveProperties({success: false});
    });
  });

  test('convertForward', () => {
    should(`convert correctly`, () => {
      const encoder = new TextEncoder();
      const length6Array = encoder.encode('Base64');
      const length5Array = encoder.encode('Hello');
      const length4Array = encoder.encode('blaH');
      assert(converter.convertForward(length6Array)).to.haveProperties({result: btoa('Base64')});
      assert(converter.convertForward(length5Array)).to.haveProperties({result: btoa('Hello')});
      assert(converter.convertForward(length4Array)).to.haveProperties({result: btoa('blaH')});
    });
  });
});

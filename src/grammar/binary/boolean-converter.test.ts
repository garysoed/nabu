import { arrayThat, assert, objectThat, setup, should, test } from '@gs-testing';

import { SuccessResult } from '../../base/result';

import { BooleanConverter } from './boolean-converter';
import { DataType } from './data-type';


test('grammar.binary.BooleanConverter', () => {
  let converter: BooleanConverter;

  setup(() => {
    converter = new BooleanConverter();
  });

  should(`convert forward and backwards true correctly`, () => {
    const forwardResult = (converter.convertForward(true) as SuccessResult<Uint8Array>).result;
    assert(converter.convertBackward(forwardResult)).to.haveProperties({
      result: objectThat().haveProperties({data: true}),
    });
  });

  should(`convert forward and backwards false correctly`, () => {
    const forwardResult = (converter.convertForward(false) as SuccessResult<Uint8Array>).result;
    assert(converter.convertBackward(forwardResult)).to.haveProperties({
      result: objectThat().haveProperties({data: false}),
    });
  });

  test('convertBackward', () => {
    should(`convert true correctly`, () => {
      const dataType = DataType.BOOLEAN;
      const array = Uint8Array.from([dataType, 1]);
      assert(converter.convertBackward(array)).to.haveProperties({
        result: objectThat().haveProperties({data: true, length: 2}),
      });
    });

    should(`convert false correctly`, () => {
      const dataType = DataType.BOOLEAN;
      const array = Uint8Array.from([dataType, 0]);
      assert(converter.convertBackward(array)).to.haveProperties({
        result: objectThat().haveProperties({data: false, length: 2}),
      });
    });

    should(`fail if the type is not BOOLEAN`, () => {
      const dataType = DataType.NULL;
      const array = Uint8Array.from([dataType]);
      assert(converter.convertBackward(array)).to.haveProperties({success: false});
    });

    should(`fail if the type conversion failed`, () => {
      const array = Uint8Array.from([200]);
      assert(converter.convertBackward(array)).to.haveProperties({success: false});
    });
  });

  test('convertForward', () => {
    should(`convert true correctly`, () => {
      assert(converter.convertForward(true)).to.haveProperties({
        result: arrayThat<number>().haveExactElements([
          DataType.BOOLEAN,
          1,
        ]),
      });
    });

    should(`convert false correctly`, () => {
      assert(converter.convertForward(false)).to.haveProperties({
        result: arrayThat<number>().haveExactElements([
          DataType.BOOLEAN,
          0,
        ]),
      });
    });
  });
});

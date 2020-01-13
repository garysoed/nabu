import { arrayThat, assert, objectThat, setup, should, test } from '@gs-testing';

import { SuccessResult } from '../../base/result';

import { DataType } from './data-type';
import { NullConverter } from './null-converter';

test('grammar.binary.NullConverter', () => {
  let converter: NullConverter;

  setup(() => {
    converter = new NullConverter();
  });

  should(`convert forward and backwards correctly`, () => {
    const forwardResult = (converter.convertForward(null) as SuccessResult<Uint8Array>).result;
    assert(converter.convertBackward(forwardResult)).to.haveProperties({
      result: objectThat().haveProperties({data: null}),
    });
  });

  test('convertBackward', () => {
    should(`convert correctly`, () => {
      const dataType = DataType.NULL;
      const array = Uint8Array.from([dataType]);
      assert(converter.convertBackward(array)).to.haveProperties({
        result: objectThat().haveProperties({data: null, length: 1}),
      });
    });

    should(`fail if the type is not NULL`, () => {
      const dataType = DataType.LIST;
      const array = Uint8Array.from([dataType]);
      assert(converter.convertBackward(array)).to.haveProperties({success: false});
    });

    should(`fail if the type conversion failed`, () => {
      const array = Uint8Array.from([200]);
      assert(converter.convertBackward(array)).to.haveProperties({success: false});
    });
  });

  test('convertForward', () => {
    should(`convert correctly`, () => {
      assert(converter.convertForward(null)).to.haveProperties({
        result: arrayThat<number>().haveExactElements([DataType.NULL]),
      });
    });
  });
});

import { arrayThat, assert, objectThat, setup, should, test } from 'gs-testing';

import { SuccessResult } from '../../base/result';

import { DataType } from './data-type';
import { UndefinedConverter } from './undefined-converter';

test('grammar.binary.UndefinedConverter', () => {
  let converter: UndefinedConverter;

  setup(() => {
    converter = new UndefinedConverter();
  });

  should(`convert forward and backwards correctly`, () => {
    const forwardResult = (converter.convertForward(undefined) as SuccessResult<Uint8Array>).result;
    assert(converter.convertBackward(forwardResult)).to.haveProperties({
      result: objectThat().haveProperties({data: undefined}),
    });
  });

  test('convertBackward', () => {
    should(`convert correctly`, () => {
      const dataType = DataType.UNDEFINED;
      const array = Uint8Array.from([dataType]);
      assert(converter.convertBackward(array)).to.haveProperties({
        result: objectThat().haveProperties({data: undefined, length: 1}),
      });
    });

    should(`fail if the type is not UNDEFINED`, () => {
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
      assert(converter.convertForward(undefined)).to.haveProperties({
        result: arrayThat<number>().haveExactElements([DataType.UNDEFINED]),
      });
    });
  });
});

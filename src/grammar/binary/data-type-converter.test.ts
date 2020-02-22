import { arrayThat, assert, objectThat, setup, should, test } from 'gs-testing';

import { SuccessResult } from '../../base/result';

import { DataType } from './data-type';
import { DataTypeConverter } from './data-type-converter';

test('grammar.binary.DataTypeConverter', () => {
  let converter: DataTypeConverter;

  setup(() => {
    converter = new DataTypeConverter();
  });

  should(`convert forward and backwards correctly`, () => {
    const dataType = DataType.LIST;
    const forwardResult = (converter.convertForward(dataType) as SuccessResult<Uint8Array>).result;
    assert(converter.convertBackward(forwardResult)).to.haveProperties({
      result: objectThat().haveProperties({data: dataType}),
    });
  });

  test('convertBackward', () => {
    should(`convert correctly`, () => {
      const dataType = DataType.LIST;
      const array = Uint8Array.from([dataType]);
      assert(converter.convertBackward(array)).to.haveProperties({
        result: objectThat().haveProperties({data: dataType, length: 1}),
      });
    });

    should(`fail if not a data type`, () => {
      const array = Uint8Array.from([200]);
      assert(converter.convertBackward(array)).to.haveProperties({success: false});
    });
  });

  test('convertForward', () => {
    should(`convert correctly`, () => {
      const dataType = DataType.LIST;
      assert(converter.convertForward(dataType)).to.haveProperties({
        result: arrayThat<number>().haveExactElements([dataType]),
      });
    });
  });
});

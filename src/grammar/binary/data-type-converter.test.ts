import {assert, iterableThat, objectThat, should, test} from 'gs-testing';

import {SuccessResult} from '../../base/result';

import {BinaryData} from './binary-data';
import {DataType} from './data-type';
import {DataTypeConverter} from './data-type-converter';


test('grammar.binary.DataTypeConverter', init => {
  const _ = init(() => {
    const converter = new DataTypeConverter();
    return {converter};
  });

  should('convert forward and backwards correctly', () => {
    const dataType = DataType.LIST;
    const forwardResult = (_.converter.convertForward(dataType) as SuccessResult<Uint8Array>)
        .result;
    assert(_.converter.convertBackward(forwardResult)).to.haveProperties({
      result: objectThat<BinaryData<number>>().haveProperties({data: dataType}),
    });
  });

  test('convertBackward', () => {
    should('convert correctly', () => {
      const dataType = DataType.LIST;
      const array = Uint8Array.from([dataType]);
      assert(_.converter.convertBackward(array)).to.haveProperties({
        result: objectThat<BinaryData<number>>().haveProperties({data: dataType, length: 1}),
      });
    });

    should('fail if not a data type', () => {
      const array = Uint8Array.from([200]);
      assert(_.converter.convertBackward(array)).to.haveProperties({success: false});
    });
  });

  test('convertForward', () => {
    should('convert correctly', () => {
      const dataType = DataType.LIST;
      assert(_.converter.convertForward(dataType)).to.haveProperties({
        result: iterableThat<number, Uint8Array>().startWith([dataType]),
      });
    });
  });
});

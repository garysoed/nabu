import {
  assert,
  iterableThat,
  objectThat,
  setup,
  should,
  test,
} from 'gs-testing';

import {SuccessResult} from '../../base/result';

import {BinaryData} from './binary-data';
import {DataType} from './data-type';
import {NullConverter} from './null-converter';

test('grammar.binary.NullConverter', () => {
  const _ = setup(() => {
    const converter = new NullConverter();
    return {converter};
  });

  should('convert forward and backwards correctly', () => {
    const forwardResult = (
      _.converter.convertForward(null) as SuccessResult<Uint8Array>
    ).result;
    assert(_.converter.convertBackward(forwardResult)).to.haveProperties({
      result: objectThat<BinaryData<null>>().haveProperties({data: null}),
    });
  });

  test('convertBackward', () => {
    should('convert correctly', () => {
      const dataType = DataType.NULL;
      const array = Uint8Array.from([dataType]);
      assert(_.converter.convertBackward(array)).to.haveProperties({
        result: objectThat<BinaryData<null>>().haveProperties({
          data: null,
          length: 1,
        }),
      });
    });

    should('fail if the type is not NULL', () => {
      const dataType = DataType.LIST;
      const array = Uint8Array.from([dataType]);
      assert(_.converter.convertBackward(array)).to.haveProperties({
        success: false,
      });
    });

    should('fail if the type conversion failed', () => {
      const array = Uint8Array.from([200]);
      assert(_.converter.convertBackward(array)).to.haveProperties({
        success: false,
      });
    });
  });

  test('convertForward', () => {
    should('convert correctly', () => {
      assert(_.converter.convertForward(null)).to.haveProperties({
        result: iterableThat<number, Uint8Array>().startWith([DataType.NULL]),
      });
    });
  });
});

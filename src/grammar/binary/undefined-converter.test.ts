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
import {UndefinedConverter} from './undefined-converter';

test('grammar.binary.UndefinedConverter', () => {
  const _ = setup(() => {
    const converter = new UndefinedConverter();
    return {converter};
  });

  should('convert forward and backwards correctly', () => {
    const forwardResult = (
      _.converter.convertForward() as SuccessResult<Uint8Array>
    ).result;
    assert(_.converter.convertBackward(forwardResult)).to.haveProperties({
      result: objectThat<BinaryData<undefined>>().haveProperties({
        data: undefined,
      }),
    });
  });

  test('convertBackward', () => {
    should('convert correctly', () => {
      const dataType = DataType.UNDEFINED;
      const array = Uint8Array.from([dataType]);
      assert(_.converter.convertBackward(array)).to.haveProperties({
        result: objectThat<BinaryData<undefined>>().haveProperties({
          data: undefined,
          length: 1,
        }),
      });
    });

    should('fail if the type is not UNDEFINED', () => {
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
      assert(_.converter.convertForward()).to.haveProperties({
        result: iterableThat<number, Uint8Array>().startWith([
          DataType.UNDEFINED,
        ]),
      });
    });
  });
});

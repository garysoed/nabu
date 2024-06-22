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
import {StringConverter} from './string-converter';

test('grammar.binary.StringConverter', () => {
  const _ = setup(() => {
    const converter = new StringConverter();
    return {converter};
  });

  should('convert forward and backwards correctly', () => {
    const text = 'Hello W0rld 🤣';
    const forwardResult = (
      _.converter.convertForward(text) as SuccessResult<Uint8Array>
    ).result;
    assert(_.converter.convertBackward(forwardResult)).to.haveProperties({
      result: objectThat<BinaryData<string>>().haveProperties({data: text}),
    });
  });

  test('convertBackward', () => {
    should('convert correctly', () => {
      const dataType = DataType.STRING;
      const array = Uint8Array.from([
        dataType,
        DataType.UINT8,
        5,
        72,
        101,
        108,
        108,
        111,
      ]);
      assert(_.converter.convertBackward(array)).to.haveProperties({
        result: objectThat<BinaryData<string>>().haveProperties({
          data: 'Hello',
          length: 8,
        }),
      });
    });

    should('fail if type is not STRING', () => {
      const dataType = DataType.NULL;
      const array = Uint8Array.from([dataType, DataType.UINT8, 5, 72, 105]);
      assert(_.converter.convertBackward(array)).to.haveProperties({
        success: false,
      });
    });

    should('fail if type conversion failed', () => {
      const array = Uint8Array.from([200, DataType.UINT8, 5, 72, 105]);
      assert(_.converter.convertBackward(array)).to.haveProperties({
        success: false,
      });
    });

    should('fail if length conversion failed', () => {
      const array = Uint8Array.from([
        DataType.STRING,
        DataType.NULL,
        5,
        72,
        105,
      ]);
      assert(_.converter.convertBackward(array)).to.haveProperties({
        success: false,
      });
    });
  });

  test('convertForward', () => {
    should('convert correctly', () => {
      assert(_.converter.convertForward('Hello')).to.haveProperties({
        result: iterableThat<number, Uint8Array>().startWith([
          DataType.STRING,
          DataType.UINT8,
          5,
          72,
          101,
          108,
          108,
          111,
        ]),
      });
    });
  });
});

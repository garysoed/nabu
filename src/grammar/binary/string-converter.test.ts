import { assert, match, setup, should, test } from 'gs-testing/export/main';
import { SuccessResult } from '../../base/result';
import { DataType } from './data-type';
import { StringConverter } from './string-converter';

test('grammar.binary.StringConverter', () => {
  let converter: StringConverter;

  setup(() => {
    converter = new StringConverter();
  });

  should(`convert forward and backwards correctly`, () => {
    const text = 'Hello W0rld 🤣';
    const forwardResult = (converter.convertForward(text) as SuccessResult<Uint8Array>).result;
    assert(converter.convertBackward(forwardResult)).to.haveProperties({
      result: match.anyObjectThat().haveProperties({data: text}),
    });
  });

  test('convertBackward', () => {
    should(`convert correctly`, () => {
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
      assert(converter.convertBackward(array)).to.haveProperties({
        result: match.anyObjectThat().haveProperties({data: 'Hello', length: 8}),
      });
    });

    should(`fail if type is not STRING`, () => {
      const dataType = DataType.NULL;
      const array = Uint8Array.from([
        dataType,
        DataType.UINT8,
        5,
        72,
        105,
      ]);
      assert(converter.convertBackward(array)).to.haveProperties({success: false});
    });

    should(`fail if type conversion failed`, () => {
      const array = Uint8Array.from([
        200,
        DataType.UINT8,
        5,
        72,
        105,
      ]);
      assert(converter.convertBackward(array)).to.haveProperties({success: false});
    });

    should(`fail if length conversion failed`, () => {
      const array = Uint8Array.from([
        DataType.STRING,
        DataType.NULL,
        5,
        72,
        105,
      ]);
      assert(converter.convertBackward(array)).to.haveProperties({success: false});
    });
  });

  test('convertForward', () => {
    should(`convert correctly`, () => {
      assert(converter.convertForward('Hello')).to.haveProperties({
        result: match.anyArrayThat().haveExactElements([
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

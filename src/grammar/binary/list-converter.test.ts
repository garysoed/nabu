import { assert, match, setup, should, test } from 'gs-testing/export/main';
import { SuccessResult } from '../../base/result';
import { DataType } from './data-type';
import { ListConverter } from './list-converter';
import { SerializableConverter } from './serializable-converter';

test('grammar.binary.ListConverter', () => {
  let converter: ListConverter;

  setup(() => {
    converter = new ListConverter(new SerializableConverter());
  });

  should(`convert forward and backward correctly`, () => {
    const list = [undefined, null, true, 1.23, 'abc', ['list']];
    const forwardResult = (converter.convertForward(list) as SuccessResult<Uint8Array>).result;
    assert(converter.convertBackward(forwardResult)).to.haveProperties({
      result: match.anyObjectThat().haveProperties({
        data: match.anyArrayThat().haveExactElements([
          undefined,
          null,
          true,
          1.23,
          'abc',
          match.anyArrayThat().haveExactElements(['list']),
        ]),
      }),
    });
  });

  test('convertBackward', () => {
    should(`convert correctly`, () => {
      const array = Uint8Array.from([
        DataType.LIST,
        DataType.UINT8,
        2,
        DataType.UINT8,
        1,
        DataType.BOOLEAN,
        1,
      ]);
      assert(converter.convertBackward(array)).to.haveProperties({
        result: match.anyObjectThat().haveProperties({
          data: match.anyArrayThat().haveExactElements([1, true]),
        }),
      });
    });

    should(`fail if one of the items failed to convert`, () => {
      const array = Uint8Array.from([
        DataType.LIST,
        DataType.UINT8,
        2,
        DataType.UINT8,
        1,
        200,
        1,
      ]);
      assert(converter.convertBackward(array)).to.haveProperties({success: false});
    });

    should(`fail if the length cannot be converted`, () => {
      const array = Uint8Array.from([
        DataType.LIST,
        200,
        2,
        DataType.UINT8,
        1,
        DataType.BOOLEAN,
        1,
      ]);
      assert(converter.convertBackward(array)).to.haveProperties({success: false});
    });

    should(`fail if the type is not LIST`, () => {
      const array = Uint8Array.from([
        DataType.BOOLEAN,
        DataType.UINT8,
        2,
        DataType.UINT8,
        1,
        DataType.BOOLEAN,
        1,
      ]);
      assert(converter.convertBackward(array)).to.haveProperties({success: false});
    });

    should(`fail if the type cannot be converted`, () => {
      const array = Uint8Array.from([
        200,
        DataType.UINT8,
        2,
        DataType.UINT8,
        1,
        DataType.BOOLEAN,
        1,
      ]);
      assert(converter.convertBackward(array)).to.haveProperties({success: false});
    });
  });

  test('convertForward', () => {
    should(`convert correctly`, () => {
      assert(converter.convertForward([1, true])).to.haveProperties({
        result: match.anyArrayThat().haveExactElements([
          DataType.LIST,
          DataType.UINT8,
          2,
          DataType.UINT8,
          1,
          DataType.BOOLEAN,
          1,
        ]),
      });
    });
  });
});

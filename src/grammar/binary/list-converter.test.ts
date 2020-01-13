import { arrayThat, assert, objectThat, setup, should, test } from '@gs-testing';

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
    const list = [undefined, null, true, 1.23, 'abc', ['list'], {a: 1}];
    const forwardResult = (converter.convertForward(list) as SuccessResult<Uint8Array>).result;
    assert(converter.convertBackward(forwardResult)).to.haveProperties({
      result: objectThat().haveProperties({
        data: arrayThat().haveExactElements([
          undefined,
          null,
          true,
          1.23,
          'abc',
          arrayThat().haveExactElements(['list']),
          objectThat().haveProperties({a: 1}),
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
        result: objectThat().haveProperties({
          data: arrayThat().haveExactElements([1, true]),
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
        result: arrayThat().haveExactElements([
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

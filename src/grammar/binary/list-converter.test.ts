import { arrayThat, assert, iterableThat, objectThat, should, test } from 'gs-testing';

import { SuccessResult } from '../../base/result';

import { BinaryData } from './binary-data';
import { DataType } from './data-type';
import { ListConverter } from './list-converter';
import { SerializableConverter } from './serializable-converter';


test(`grammar.binary.ListConverter`, init => {
  const _ = init(() => {
    const converter = new ListConverter(new SerializableConverter());
    return {converter};
  });

  should(`convert forward and backward correctly`, () => {
    const list = [undefined, null, true, 1.23, `abc`, [`list`], {a: 1}];
    const forwardResult = (_.converter.convertForward(list) as SuccessResult<Uint8Array>).result;
    assert(_.converter.convertBackward(forwardResult)).to.haveProperties({
      result: objectThat<BinaryData<readonly unknown[]>>().haveProperties({
        data: arrayThat().haveExactElements([
          undefined,
          null,
          true,
          1.23,
          `abc`,
          arrayThat<string>().haveExactElements([`list`]),
          objectThat<Record<string, unknown>>().haveProperties({a: 1}),
        ]),
      }),
    });
  });

  test(`convertBackward`, () => {
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
      assert(_.converter.convertBackward(array)).to.haveProperties({
        result: objectThat<BinaryData<readonly unknown[]>>().haveProperties({
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
      assert(_.converter.convertBackward(array)).to.haveProperties({success: false});
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
      assert(_.converter.convertBackward(array)).to.haveProperties({success: false});
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
      assert(_.converter.convertBackward(array)).to.haveProperties({success: false});
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
      assert(_.converter.convertBackward(array)).to.haveProperties({success: false});
    });
  });

  test(`convertForward`, () => {
    should(`convert correctly`, () => {
      assert(_.converter.convertForward([1, true])).to.haveProperties({
        result: iterableThat<number, Uint8Array>().startWith([
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

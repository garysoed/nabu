import {arrayThat, assert, iterableThat, objectThat, setup, should, test} from 'gs-testing';

import {SuccessResult} from '../../base/result';

import {BinaryData} from './binary-data';
import {DataType} from './data-type';
import {ObjectConverter} from './object-converter';
import {SerializableConverter} from './serializable-converter';


test('grammar.binary.ObjectConverter', () => {
  const _ = setup(() => {
    const converter = new ObjectConverter(new SerializableConverter());
    return {converter};
  });

  should('convert forward and backward correctly', () => {
    const object = {
      boolean: true,
      list: ['list'],
      null: null,
      number: 1.23,
      object: {a: 1},
      string: 'abc',
      undefined,
    };
    const forwardResult = (_.converter.convertForward(object) as SuccessResult<Uint8Array>).result;
    assert(_.converter.convertBackward(forwardResult)).to.haveProperties({
      result: objectThat<BinaryData<Record<string, unknown>>>().haveProperties({
        data: objectThat<Record<string, unknown>>().haveProperties({
          boolean: true,
          list: arrayThat<string>().haveExactElements(['list']),
          null: null,
          number: 1.23,
          object: objectThat<Record<string, unknown>>().haveProperties({a: 1}),
          string: 'abc',
          undefined,
        }),
      }),
    });
  });

  test('convertBackward', () => {
    should('convert correctly', () => {
      const object = Uint8Array.from([
        DataType.OBJECT,
        // length
        DataType.UINT8,
        2,
        // entry 0
        DataType.STRING,
        // key 0
        // string length
        DataType.UINT8,
        1,
        // string content.
        97,
        // value 0
        DataType.UINT8,
        1,

        // entry 1
        DataType.STRING,
        // key 1
        // string length
        DataType.UINT8,
        1,
        // string content,
        98,
        // value 1
        DataType.UINT8,
        2,
      ]);
      assert(_.converter.convertBackward(object)).to.haveProperties({
        result: objectThat<BinaryData<Record<string, unknown>>>().haveProperties({
          data: objectThat<Record<string, unknown>>().haveProperties({a: 1, b: 2}),
        }),
      });
    });

    should('fail if one of the entry values cannot be converted', () => {
      const object = Uint8Array.from([
        DataType.OBJECT,
        // length
        DataType.UINT8,
        2,
        // entry 0
        DataType.STRING,
        // key 0
        // string length
        DataType.UINT8,
        1,
        // string content.
        97,
        // value 0
        DataType.UINT8,
        1,

        // entry 1
        DataType.STRING,
        // key 1
        // string length
        DataType.UINT8,
        1,
        // string content,
        98,
        // value 1
        200,
        2,
      ]);
      assert(_.converter.convertBackward(object)).to.haveProperties({success: false});
    });

    should('fail if one of the entry keys cannot be converted', () => {
      const object = Uint8Array.from([
        DataType.OBJECT,
        // length
        DataType.UINT8,
        2,
        // entry 0
        DataType.STRING,
        // key 0
        // string length
        DataType.UINT8,
        1,
        // string content.
        97,
        // value 0
        DataType.UINT8,
        1,

        // entry 1
        200,
        // key 1
        // string length
        DataType.UINT8,
        1,
        // string content,
        98,
        // value 1
        DataType.UINT8,
        2,
      ]);
      assert(_.converter.convertBackward(object)).to.haveProperties({success: false});
    });

    should('fail if the length cannot be converted', () => {
      const object = Uint8Array.from([
        DataType.OBJECT,
        // length
        200,
        2,
        // entry 0
        DataType.STRING,
        // key 0
        // string length
        DataType.UINT8,
        1,
        // string content.
        97,
        // value 0
        DataType.UINT8,
        1,

        // entry 1
        DataType.STRING,
        // key 1
        // string length
        DataType.UINT8,
        1,
        // string content,
        98,
        // value 1
        DataType.UINT8,
        2,
      ]);
      assert(_.converter.convertBackward(object)).to.haveProperties({success: false});
    });

    should('fail if the type is not OBJECT', () => {
      const object = Uint8Array.from([
        DataType.UNDEFINED,
      ]);
      assert(_.converter.convertBackward(object)).to.haveProperties({success: false});
    });

    should('fail if the type cannot be converted', () => {
      const object = Uint8Array.from([
        200,
        // length
        DataType.UINT8,
        2,
        // entry 0
        DataType.STRING,
        // key 0
        // string length
        DataType.UINT8,
        1,
        // string content.
        97,
        // value 0
        DataType.UINT8,
        1,

        // entry 1
        DataType.STRING,
        // key 1
        // string length
        DataType.UINT8,
        1,
        // string content,
        98,
        // value 1
        DataType.UINT8,
        2,
      ]);
      assert(_.converter.convertBackward(object)).to.haveProperties({success: false});
    });
  });

  test('convertForward', () => {
    should('convert correctly', () => {
      assert(_.converter.convertForward({a: 1, b: 2})).to.haveProperties({
        result: iterableThat<number, Uint8Array>().startWith([
          DataType.OBJECT,
          // length
          DataType.UINT8,
          2,
          // entry 0
          DataType.STRING,
          // key 0
          // string length
          DataType.UINT8,
          1,
          // string content.
          97,
          // value 0
          DataType.UINT8,
          1,

          // entry 1
          DataType.STRING,
          // key 1
          // string length
          DataType.UINT8,
          1,
          // string content,
          98,
          // value 1
          DataType.UINT8,
          2,
        ]),
      });
    });
  });
});

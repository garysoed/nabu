import { assert, iterableThat, objectThat, should, test } from 'gs-testing';

import { SuccessResult } from '../../base/result';

import { BinaryData } from './binary-data';
import { BooleanConverter } from './boolean-converter';
import { DataType } from './data-type';


test(`grammar.binary.BooleanConverter`, init => {

  const _ = init(() => {
    const converter = new BooleanConverter();
    return {converter};
  });

  should(`convert forward and backwards true correctly`, () => {
    const forwardResult = (_.converter.convertForward(true) as SuccessResult<Uint8Array>).result;
    assert(_.converter.convertBackward(forwardResult)).to.haveProperties({
      result: objectThat<BinaryData<boolean>>().haveProperties({data: true}),
    });
  });

  should(`convert forward and backwards false correctly`, () => {
    const forwardResult = (_.converter.convertForward(false) as SuccessResult<Uint8Array>).result;
    assert(_.converter.convertBackward(forwardResult)).to.haveProperties({
      result: objectThat<BinaryData<boolean>>().haveProperties({data: false}),
    });
  });

  test(`convertBackward`, () => {
    should(`convert true correctly`, () => {
      const dataType = DataType.BOOLEAN;
      const array = Uint8Array.from([dataType, 1]);
      assert(_.converter.convertBackward(array)).to.haveProperties({
        result: objectThat<BinaryData<boolean>>().haveProperties({data: true, length: 2}),
      });
    });

    should(`convert false correctly`, () => {
      const dataType = DataType.BOOLEAN;
      const array = Uint8Array.from([dataType, 0]);
      assert(_.converter.convertBackward(array)).to.haveProperties({
        result: objectThat<BinaryData<boolean>>().haveProperties({data: false, length: 2}),
      });
    });

    should(`fail if the type is not BOOLEAN`, () => {
      const dataType = DataType.NULL;
      const array = Uint8Array.from([dataType]);
      assert(_.converter.convertBackward(array)).to.haveProperties({success: false});
    });

    should(`fail if the type conversion failed`, () => {
      const array = Uint8Array.from([200]);
      assert(_.converter.convertBackward(array)).to.haveProperties({success: false});
    });
  });

  test(`convertForward`, () => {
    should(`convert true correctly`, () => {
      assert(_.converter.convertForward(true)).to.haveProperties({
        result: iterableThat<number, Uint8Array>().startWith([
          DataType.BOOLEAN,
          1,
        ]),
      });
    });

    should(`convert false correctly`, () => {
      assert(_.converter.convertForward(false)).to.haveProperties({
        result: iterableThat<number, Uint8Array>().startWith([
          DataType.BOOLEAN,
          0,
        ]),
      });
    });
  });
});

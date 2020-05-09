import { arrayThat, assert, numberThat, objectThat, should, test } from 'gs-testing';

import { SuccessResult } from '../../base/result';

import { DataType } from './data-type';
import { NumberConverter } from './number-converter';


test('grammar.binary.NumberConverter', init => {
  const _ = init(() => {
    const converter = new NumberConverter();
    return {converter};
  });

  should(`convert forward and backwards -127 correctly`, () => {
    const forwardResult = (_.converter.convertForward(-127) as SuccessResult<Uint8Array>).result;
    assert(_.converter.convertBackward(forwardResult)).to.haveProperties({
      result: objectThat().haveProperties({data: -127}),
    });
  });

  should(`convert forward and backwards -32768 correctly`, () => {
    const forwardResult = (_.converter.convertForward(-0x8000) as SuccessResult<Uint8Array>).result;
    assert(_.converter.convertBackward(forwardResult)).to.haveProperties({
      result: objectThat().haveProperties({data: -0x8000}),
    });
  });

  should(`convert forward and backwards -2147483648 correctly`, () => {
    const forwardResult = (_.converter.convertForward(-0x80000000) as SuccessResult<Uint8Array>)
        .result;
    assert(_.converter.convertBackward(forwardResult)).to.haveProperties({
      result: objectThat().haveProperties({data: -0x80000000}),
    });
  });

  should(`convert forward and backwards -1E38 correctly`, () => {
    const forwardResult = (_.converter.convertForward(-3E38) as SuccessResult<Uint8Array>)
        .result;
    assert(_.converter.convertBackward(forwardResult)).to.haveProperties({
      result: objectThat().haveProperties({
        data: numberThat().beCloseTo(-3E38, -37),
      }),
    });
  });

  should(`convert forward and backwards -4E38 correctly`, () => {
    const forwardResult = (_.converter.convertForward(-4E38) as SuccessResult<Uint8Array>)
        .result;
    assert(_.converter.convertBackward(forwardResult)).to.haveProperties({
      result: objectThat().haveProperties({data: -4E38}),
    });
  });

  should(`convert forward and backwards -1.5 correctly`, () => {
    const forwardResult = (_.converter.convertForward(-1.5) as SuccessResult<Uint8Array>)
        .result;
    assert(_.converter.convertBackward(forwardResult)).to.haveProperties({
      result: objectThat().haveProperties({data: -1.5}),
    });
  });

  should(`convert forward and backwards 255 correctly`, () => {
    const forwardResult = (_.converter.convertForward(255) as SuccessResult<Uint8Array>).result;
    assert(_.converter.convertBackward(forwardResult)).to.haveProperties({
      result: objectThat().haveProperties({data: 255}),
    });
  });

  should(`convert forward and backwards 65535 correctly`, () => {
    const forwardResult = (_.converter.convertForward(0xFFFF) as SuccessResult<Uint8Array>).result;
    assert(_.converter.convertBackward(forwardResult)).to.haveProperties({
      result: objectThat().haveProperties({data: 0xFFFF}),
    });
  });

  should(`convert forward and backwards 4294967295 correctly`, () => {
    const forwardResult = (_.converter.convertForward(0xFFFFFFFF) as SuccessResult<Uint8Array>)
        .result;
    assert(_.converter.convertBackward(forwardResult)).to.haveProperties({
      result: objectThat().haveProperties({data: 0xFFFFFFFF}),
    });
  });

  should(`convert forward and backwards 4E38 correctly`, () => {
    const forwardResult = (_.converter.convertForward(4E38) as SuccessResult<Uint8Array>)
        .result;
    assert(_.converter.convertBackward(forwardResult)).to.haveProperties({
      result: objectThat().haveProperties({data: 4E38}),
    });
  });

  should(`convert forward and backwards 1.5 correctly`, () => {
    const forwardResult = (_.converter.convertForward(1.5) as SuccessResult<Uint8Array>)
        .result;
    assert(_.converter.convertBackward(forwardResult)).to.haveProperties({
      result: objectThat().haveProperties({data: 1.5}),
    });
  });

  test('convertBackward', () => {
    should(`convert float64 correctly`, () => {
      const array = Uint8Array.from([
        DataType.FLOAT64,
        177,
        161,
        22,
        42,
        211,
        206,
        242,
        71,
      ]);
      assert(_.converter.convertBackward(array)).to.haveProperties({
        result: objectThat().haveProperties({data: 4E38, length: 9}),
      });
    });

    should(`convert int16 correctly`, () => {
      const array = Uint8Array.from([
        DataType.INT16,
        0,
        128,
      ]);
      assert(_.converter.convertBackward(array)).to.haveProperties({
        result: objectThat().haveProperties({data: -0x8000, length: 3}),
      });
    });

    should(`convert int32 correctly`, () => {
      const array = Uint8Array.from([
        DataType.INT32,
        0,
        0,
        0,
        128,
      ]);
      assert(_.converter.convertBackward(array)).to.haveProperties({
        result: objectThat().haveProperties({data: -0x80000000, length: 5}),
      });
    });

    should(`convert int8 correctly`, () => {
      const array = Uint8Array.from([
        DataType.INT8,
        129,
      ]);
      assert(_.converter.convertBackward(array)).to.haveProperties({
        result: objectThat().haveProperties({data: -127, length: 2}),
      });
    });

    should(`convert uint16 correctly`, () => {
      const array = Uint8Array.from([
        DataType.UINT16,
        255,
        255,
      ]);
      assert(_.converter.convertBackward(array)).to.haveProperties({
        result: objectThat().haveProperties({data: 0xFFFF, length: 3}),
      });
    });

    should(`convert uint32 correctly`, () => {
      const array = Uint8Array.from([
        DataType.UINT32,
        255,
        255,
        255,
        255,
      ]);
      assert(_.converter.convertBackward(array)).to.haveProperties({
        result: objectThat().haveProperties({data: 0xFFFFFFFF, length: 5}),
      });
    });

    should(`convert uint8 correctly`, () => {
      const array = Uint8Array.from([
        DataType.UINT8,
        255,
      ]);
      assert(_.converter.convertBackward(array)).to.haveProperties({
        result: objectThat().haveProperties({data: 255, length: 2}),
      });
    });

    should(`fail if the type is not a number type`, () => {
      const array = Uint8Array.from([DataType.NULL, 255]);
      assert(_.converter.convertBackward(array)).to.haveProperties({success: false});
    });

    should(`fail if the type conversion failed`, () => {
      const array = Uint8Array.from([200]);
      assert(_.converter.convertBackward(array)).to.haveProperties({success: false});
    });
  });

  test('convertForward', () => {
    should(`convert -127 correctly`, () => {
      assert(_.converter.convertForward(-127)).to.haveProperties({
        result: arrayThat<number>().haveExactElements([
          DataType.INT8,
          129,
        ]),
      });
    });

    should(`convert -32768 correctly`, () => {
      assert(_.converter.convertForward(-0x8000)).to.haveProperties({
        result: arrayThat<number>().haveExactElements([
          DataType.INT16,
          0,
          128,
        ]),
      });
    });

    should(`convert -2147483648 correctly`, () => {
      assert(_.converter.convertForward(-0x80000000)).to.haveProperties({
        result: arrayThat<number>().haveExactElements([
          DataType.INT32,
          0,
          0,
          0,
          128,
        ]),
      });
    });

    should(`convert -4E38 correctly`, () => {
      assert(_.converter.convertForward(-4E38)).to.haveProperties({
        result: arrayThat<number>().haveExactElements([
          DataType.FLOAT64,
          177,
          161,
          22,
          42,
          211,
          206,
          242,
          199,
        ]),
      });
    });

    should(`convert -1.5 correctly`, () => {
      assert(_.converter.convertForward(-1.5)).to.haveProperties({
        result: arrayThat<number>().haveExactElements([
          DataType.FLOAT64,
          0,
          0,
          0,
          0,
          0,
          0,
          248,
          191,
        ]),
      });
    });

    should(`convert 255 correctly`, () => {
      assert(_.converter.convertForward(255)).to.haveProperties({
        result: arrayThat<number>().haveExactElements([
          DataType.UINT8,
          255,
        ]),
      });
    });

    should(`convert 65535 correctly`, () => {
      assert(_.converter.convertForward(0xFFFF)).to.haveProperties({
        result: arrayThat<number>().haveExactElements([
          DataType.UINT16,
          255,
          255,
        ]),
      });
    });

    should(`convert 4294967295 correctly`, () => {
      assert(_.converter.convertForward(0xFFFFFFFF)).to.haveProperties({
        result: arrayThat<number>().haveExactElements([
          DataType.UINT32,
          255,
          255,
          255,
          255,
        ]),
      });
    });

    should(`convert 4E38 correctly`, () => {
      assert(_.converter.convertForward(4E38)).to.haveProperties({
        result: arrayThat<number>().haveExactElements([
          DataType.FLOAT64,
          177,
          161,
          22,
          42,
          211,
          206,
          242,
          71,
        ]),
      });
    });

    should(`convert 1.5 correctly`, () => {
      assert(_.converter.convertForward(1.5)).to.haveProperties({
        result: arrayThat<number>().haveExactElements([
          DataType.FLOAT64,
          0,
          0,
          0,
          0,
          0,
          0,
          248,
          63,
        ]),
      });
    });
  });
});

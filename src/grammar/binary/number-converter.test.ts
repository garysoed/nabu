import { assert, match, setup, should, test } from 'gs-testing/export/main';
import { SuccessResult } from '../../base/result';
import { DataType } from './data-type';
import { NumberConverter } from './number-converter';

test('grammar.binary.NumberConverter', () => {
  let converter: NumberConverter;

  setup(() => {
    converter = new NumberConverter();
  });

  should(`convert forward and backwards -127 correctly`, () => {
    const forwardResult = (converter.convertForward(-127) as SuccessResult<Uint8Array>).result;
    assert(converter.convertBackward(forwardResult)).to.haveProperties({
      result: match.anyObjectThat().haveProperties({data: -127}),
    });
  });

  should(`convert forward and backwards -32768 correctly`, () => {
    const forwardResult = (converter.convertForward(-0x8000) as SuccessResult<Uint8Array>).result;
    assert(converter.convertBackward(forwardResult)).to.haveProperties({
      result: match.anyObjectThat().haveProperties({data: -0x8000}),
    });
  });

  should(`convert forward and backwards -2147483648 correctly`, () => {
    const forwardResult = (converter.convertForward(-0x80000000) as SuccessResult<Uint8Array>)
        .result;
    assert(converter.convertBackward(forwardResult)).to.haveProperties({
      result: match.anyObjectThat().haveProperties({data: -0x80000000}),
    });
  });

  should(`convert forward and backwards -1E38 correctly`, () => {
    const forwardResult = (converter.convertForward(-3E38) as SuccessResult<Uint8Array>)
        .result;
    assert(converter.convertBackward(forwardResult)).to.haveProperties({
      result: match.anyObjectThat().haveProperties({
        data: match.anyNumberThat().beCloseTo(-3E38, -37),
      }),
    });
  });

  should(`convert forward and backwards -4E38 correctly`, () => {
    const forwardResult = (converter.convertForward(-4E38) as SuccessResult<Uint8Array>)
        .result;
    assert(converter.convertBackward(forwardResult)).to.haveProperties({
      result: match.anyObjectThat().haveProperties({data: -4E38}),
    });
  });

  should(`convert forward and backwards -1.5 correctly`, () => {
    const forwardResult = (converter.convertForward(-1.5) as SuccessResult<Uint8Array>)
        .result;
    assert(converter.convertBackward(forwardResult)).to.haveProperties({
      result: match.anyObjectThat().haveProperties({data: -1.5}),
    });
  });

  should(`convert forward and backwards 255 correctly`, () => {
    const forwardResult = (converter.convertForward(255) as SuccessResult<Uint8Array>).result;
    assert(converter.convertBackward(forwardResult)).to.haveProperties({
      result: match.anyObjectThat().haveProperties({data: 255}),
    });
  });

  should(`convert forward and backwards 65535 correctly`, () => {
    const forwardResult = (converter.convertForward(0xFFFF) as SuccessResult<Uint8Array>).result;
    assert(converter.convertBackward(forwardResult)).to.haveProperties({
      result: match.anyObjectThat().haveProperties({data: 0xFFFF}),
    });
  });

  should(`convert forward and backwards 4294967295 correctly`, () => {
    const forwardResult = (converter.convertForward(0xFFFFFFFF) as SuccessResult<Uint8Array>)
        .result;
    assert(converter.convertBackward(forwardResult)).to.haveProperties({
      result: match.anyObjectThat().haveProperties({data: 0xFFFFFFFF}),
    });
  });

  should(`convert forward and backwards 3E38 correctly`, () => {
    const forwardResult = (converter.convertForward(3E38) as SuccessResult<Uint8Array>)
        .result;
    assert(converter.convertBackward(forwardResult)).to.haveProperties({
      result: match.anyObjectThat().haveProperties({
        data: match.anyNumberThat().beCloseTo(3E38, -37),
      }),
    });
  });

  should(`convert forward and backwards 4E38 correctly`, () => {
    const forwardResult = (converter.convertForward(4E38) as SuccessResult<Uint8Array>)
        .result;
    assert(converter.convertBackward(forwardResult)).to.haveProperties({
      result: match.anyObjectThat().haveProperties({data: 4E38}),
    });
  });

  should(`convert forward and backwards 1.5 correctly`, () => {
    const forwardResult = (converter.convertForward(1.5) as SuccessResult<Uint8Array>)
        .result;
    assert(converter.convertBackward(forwardResult)).to.haveProperties({
      result: match.anyObjectThat().haveProperties({data: 1.5}),
    });
  });

  test('convertBackward', () => {
    should(`convert float32 correctly`, () => {
      const array = Uint8Array.from([
        DataType.FLOAT32,
        0,
        0,
        192,
        63,
      ]);
      assert(converter.convertBackward(array)).to.haveProperties({
        result: match.anyObjectThat().haveProperties({data: 1.5, length: 5}),
      });
    });

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
      assert(converter.convertBackward(array)).to.haveProperties({
        result: match.anyObjectThat().haveProperties({data: 4E38, length: 9}),
      });
    });

    should(`convert int16 correctly`, () => {
      const array = Uint8Array.from([
        DataType.INT16,
        0,
        128,
      ]);
      assert(converter.convertBackward(array)).to.haveProperties({
        result: match.anyObjectThat().haveProperties({data: -0x8000, length: 3}),
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
      assert(converter.convertBackward(array)).to.haveProperties({
        result: match.anyObjectThat().haveProperties({data: -0x80000000, length: 5}),
      });
    });

    should(`convert int8 correctly`, () => {
      const array = Uint8Array.from([
        DataType.INT8,
        129,
      ]);
      assert(converter.convertBackward(array)).to.haveProperties({
        result: match.anyObjectThat().haveProperties({data: -127, length: 2}),
      });
    });

    should(`convert uint16 correctly`, () => {
      const array = Uint8Array.from([
        DataType.UINT16,
        255,
        255,
      ]);
      assert(converter.convertBackward(array)).to.haveProperties({
        result: match.anyObjectThat().haveProperties({data: 0xFFFF, length: 3}),
      });
    });

    should(`convert uint32 correctly`, () => {
      const array = Uint8Array.from([
        DataType.UINT32,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
      ]);
      assert(converter.convertBackward(array)).to.haveProperties({
        result: match.anyObjectThat().haveProperties({data: 0xFFFFFFFF, length: 9}),
      });
    });

    should(`convert uint8 correctly`, () => {
      const array = Uint8Array.from([
        DataType.UINT8,
        255,
      ]);
      assert(converter.convertBackward(array)).to.haveProperties({
        result: match.anyObjectThat().haveProperties({data: 255, length: 2}),
      });
    });

    should(`fail if the type is not a number type`, () => {
      const array = Uint8Array.from([DataType.NULL, 255]);
      assert(converter.convertBackward(array)).to.haveProperties({success: false});
    });

    should(`fail if the type conversion failed`, () => {
      const array = Uint8Array.from([200]);
      assert(converter.convertBackward(array)).to.haveProperties({success: false});
    });
  });

  test('convertForward', () => {
    should(`convert -127 correctly`, () => {
      assert(converter.convertForward(-127)).to.haveProperties({
        result: match.anyArrayThat<number>().haveExactElements([
          DataType.INT8,
          129,
        ]),
      });
    });

    should(`convert -32768 correctly`, () => {
      assert(converter.convertForward(-0x8000)).to.haveProperties({
        result: match.anyArrayThat<number>().haveExactElements([
          DataType.INT16,
          0,
          128,
        ]),
      });
    });

    should(`convert -2147483648 correctly`, () => {
      assert(converter.convertForward(-0x80000000)).to.haveProperties({
        result: match.anyArrayThat<number>().haveExactElements([
          DataType.INT32,
          0,
          0,
          0,
          128,
        ]),
      });
    });

    should(`convert -1E38 correctly`, () => {
      assert(converter.convertForward(-1E38)).to.haveProperties({
        result: match.anyArrayThat<number>().haveExactElements([
          DataType.FLOAT32,
          153,
          118,
          150,
          254,
        ]),
      });
    });

    should(`convert -4E38 correctly`, () => {
      assert(converter.convertForward(-4E38)).to.haveProperties({
        result: match.anyArrayThat<number>().haveExactElements([
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
      assert(converter.convertForward(-1.5)).to.haveProperties({
        result: match.anyArrayThat<number>().haveExactElements([
          DataType.FLOAT32,
          0,
          0,
          192,
          191,
        ]),
      });
    });

    should(`convert 255 correctly`, () => {
      assert(converter.convertForward(255)).to.haveProperties({
        result: match.anyArrayThat<number>().haveExactElements([
          DataType.UINT8,
          255,
        ]),
      });
    });

    should(`convert 65535 correctly`, () => {
      assert(converter.convertForward(0xFFFF)).to.haveProperties({
        result: match.anyArrayThat<number>().haveExactElements([
          DataType.UINT16,
          255,
          255,
        ]),
      });
    });

    should(`convert 4294967295 correctly`, () => {
      assert(converter.convertForward(0xFFFFFFFF)).to.haveProperties({
        result: match.anyArrayThat<number>().haveExactElements([
          DataType.UINT32,
          255,
          255,
          255,
          255,
        ]),
      });
    });

    should(`convert 3E38 correctly`, () => {
      assert(converter.convertForward(3E38)).to.haveProperties({
        result: match.anyArrayThat<number>().haveExactElements([
          DataType.FLOAT32,
          230,
          177,
          97,
          127,
        ]),
      });
    });

    should(`convert 4E38 correctly`, () => {
      assert(converter.convertForward(4E38)).to.haveProperties({
        result: match.anyArrayThat<number>().haveExactElements([
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
      assert(converter.convertForward(1.5)).to.haveProperties({
        result: match.anyArrayThat<number>().haveExactElements([
          DataType.FLOAT32,
          0,
          0,
          192,
          63,
        ]),
      });
    });
  });
});

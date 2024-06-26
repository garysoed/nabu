import {Result} from '../../base/result';

import {BinaryConverter} from './binary-converter';
import {BinaryData} from './binary-data';
import {DataType} from './data-type';
import {DataTypeConverter} from './data-type-converter';

/**
 * Converts numbers to uint8array. We don't use float 32 since it tends to lose precision.
 *
 * Format:
 * [type][number]
 */
export class NumberConverter implements BinaryConverter<number> {
  private readonly dataTypeConverter_: DataTypeConverter =
    new DataTypeConverter();

  convertBackward(value: Uint8Array): Result<BinaryData<number>> {
    const typeResult = this.dataTypeConverter_.convertBackward(value);
    if (!typeResult.success) {
      return {success: false};
    }

    let result: BinaryData<number> | null = null;
    const valueRest = value.slice(typeResult.result.length);
    switch (typeResult.result.data) {
      case DataType.FLOAT64: {
        const float64Array = new Float64Array(
          valueRest.slice(0, Float64Array.BYTES_PER_ELEMENT).buffer,
        );
        const data = float64Array[0];
        if (data === undefined) {
          throw new Error('Data cannot be parsed');
        }
        result = {
          data,
          length: typeResult.result.length + float64Array.BYTES_PER_ELEMENT,
        };
        break;
      }
      case DataType.INT16: {
        const int16Array = new Int16Array(
          valueRest.slice(0, Int16Array.BYTES_PER_ELEMENT).buffer,
        );
        const data = int16Array[0];
        if (data === undefined) {
          throw new Error('Data cannot be parsed');
        }
        result = {
          data,
          length: typeResult.result.length + int16Array.BYTES_PER_ELEMENT,
        };
        break;
      }
      case DataType.INT32: {
        const int32Array = new Int32Array(
          valueRest.slice(0, Int32Array.BYTES_PER_ELEMENT).buffer,
        );
        const data = int32Array[0];
        if (data === undefined) {
          throw new Error('Data cannot be parsed');
        }
        result = {
          data,
          length: typeResult.result.length + int32Array.BYTES_PER_ELEMENT,
        };
        break;
      }
      case DataType.INT8: {
        const int8Array = new Int8Array(
          valueRest.slice(0, Int8Array.BYTES_PER_ELEMENT).buffer,
        );
        const data = int8Array[0];
        if (data === undefined) {
          throw new Error('Data cannot be parsed');
        }
        result = {
          data,
          length: typeResult.result.length + int8Array.BYTES_PER_ELEMENT,
        };
        break;
      }
      case DataType.UINT16: {
        const uint16Array = new Uint16Array(
          valueRest.slice(0, Uint16Array.BYTES_PER_ELEMENT).buffer,
        );
        const data = uint16Array[0];
        if (data === undefined) {
          throw new Error('Data cannot be parsed');
        }
        result = {
          data,
          length: typeResult.result.length + uint16Array.BYTES_PER_ELEMENT,
        };
        break;
      }
      case DataType.UINT32: {
        const uint32Array = new Uint32Array(
          valueRest.slice(0, Uint32Array.BYTES_PER_ELEMENT).buffer,
        );
        const data = uint32Array[0];
        if (data === undefined) {
          throw new Error('Data cannot be parsed');
        }
        result = {
          data,
          length: typeResult.result.length + uint32Array.BYTES_PER_ELEMENT,
        };
        break;
      }
      case DataType.UINT8: {
        const uint8Array = new Uint8Array(
          valueRest.slice(0, Uint8Array.BYTES_PER_ELEMENT).buffer,
        );
        const data = uint8Array[0];
        if (data === undefined) {
          throw new Error('Data cannot be parsed');
        }
        result = {
          data,
          length: typeResult.result.length + uint8Array.BYTES_PER_ELEMENT,
        };
        break;
      }
    }

    if (result === null) {
      return {success: false};
    }

    return {result, success: true};
  }

  convertForward(value: number): Result<Uint8Array> {
    const {array, type} = getArrayType(value);

    const dataTypeResult = this.dataTypeConverter_.convertForward(type);
    if (!dataTypeResult.success) {
      return {success: false};
    }

    const result = new Uint8Array([...dataTypeResult.result, ...array]);

    return {result, success: true};
  }
}

function getArrayType(value: number): {array: Uint8Array; type: DataType} {
  const isInt = Number.isInteger(value);
  if (value < 0) {
    if (isInt) {
      if (value >= -0x80) {
        return {
          array: new Uint8Array(new Int8Array([value]).buffer),
          type: DataType.INT8,
        };
      } else if (value >= -0x8000) {
        return {
          array: new Uint8Array(new Int16Array([value]).buffer),
          type: DataType.INT16,
        };
      } else if (value >= -0x80000000) {
        return {
          array: new Uint8Array(new Int32Array([value]).buffer),
          type: DataType.INT32,
        };
      }
    }

    return {
      array: new Uint8Array(new Float64Array([value]).buffer),
      type: DataType.FLOAT64,
    };
  } else {
    if (isInt) {
      if (value <= 0xff) {
        return {
          array: new Uint8Array(new Uint8Array([value]).buffer),
          type: DataType.UINT8,
        };
      } else if (value <= 0xffff) {
        return {
          array: new Uint8Array(new Uint16Array([value]).buffer),
          type: DataType.UINT16,
        };
      } else if (value <= 0xffffffff) {
        return {
          array: new Uint8Array(new Uint32Array([value]).buffer),
          type: DataType.UINT32,
        };
      }
    }

    return {
      array: new Uint8Array(new Float64Array([value]).buffer),
      type: DataType.FLOAT64,
    };
  }
}

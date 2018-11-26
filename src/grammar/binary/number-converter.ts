import { Result } from '../../base/result';
import { BinaryConverter } from './binary-converter';
import { BinaryData } from './binary-data';
import { DataType } from './data-type';
import { DataTypeConverter } from './data-type-converter';

/**
 * Converts numbers to uint8array
 *
 * Format:
 * [type][number]
 */
export class NumberConverter implements BinaryConverter<number> {
  private readonly dataTypeConverter_: DataTypeConverter = new DataTypeConverter();

  convertBackward(value: Uint8Array): Result<BinaryData<number>> {
    const typeResult = this.dataTypeConverter_.convertBackward(value);
    if (!typeResult.success) {
      return {success: false};
    }

    let result: BinaryData<number>|null = null;
    const valueRest = value.slice(typeResult.result.length);
    switch (typeResult.result.data) {
      case DataType.FLOAT32:
        const float32Array = new Float32Array(valueRest.buffer);
        result = {
          data: float32Array[0],
          length: typeResult.result.length + float32Array.BYTES_PER_ELEMENT,
        };
        break;
      case DataType.FLOAT64:
        const float64Array = new Float64Array(valueRest.buffer);
        result = {
          data: float64Array[0],
          length: typeResult.result.length + float64Array.BYTES_PER_ELEMENT,
        };
        break;
      case DataType.INT16:
        const int16Array = new Int16Array(valueRest.buffer);
        result = {
          data: int16Array[0],
          length: typeResult.result.length + int16Array.BYTES_PER_ELEMENT,
        };
        break;
      case DataType.INT32:
        const int32Array = new Int32Array(valueRest.buffer);
        result = {
          data: int32Array[0],
          length: typeResult.result.length + int32Array.BYTES_PER_ELEMENT,
        };
        break;
      case DataType.INT8:
        const int8Array = new Int8Array(valueRest.buffer);
        result = {
          data: int8Array[0],
          length: typeResult.result.length + int8Array.BYTES_PER_ELEMENT,
        };
        break;
      case DataType.UINT16:
        const uint16Array = new Uint16Array(valueRest.buffer);
        result = {
          data: uint16Array[0],
          length: typeResult.result.length + uint16Array.BYTES_PER_ELEMENT,
        };
        break;
      case DataType.UINT32:
        const uint32Array = new Uint32Array(valueRest.buffer);
        result = {
          data: uint32Array[0],
          length: typeResult.result.length + uint32Array.BYTES_PER_ELEMENT,
        };
        break;
      case DataType.UINT8:
        const uint8Array = new Uint8Array(valueRest.buffer);
        result = {
          data: uint8Array[0],
          length: typeResult.result.length + uint8Array.BYTES_PER_ELEMENT,
        };
        break;
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

    const result = new Uint8Array([
      ...dataTypeResult.result,
      ...array,
    ]);

    return {result, success: true};
  }
}

function getArrayType(value: number): {array: Uint8Array, type: DataType} {
  const isInt = Number.isInteger(value);
  if (value < 0) {
    if (isInt) {
      if (value >= -0x80) {
        return {array: new Uint8Array(new Int8Array([value]).buffer), type: DataType.INT8};
      } else if (value >= -0x8000) {
        return {array: new Uint8Array(new Int16Array([value]).buffer), type: DataType.INT16};
      } else if (value >= -0x80000000) {
        return {array: new Uint8Array(new Int32Array([value]).buffer), type: DataType.INT32};
      }
    }

    if (value >= -3.4E38) {
      return {array: new Uint8Array(new Float32Array([value]).buffer), type: DataType.FLOAT32};
    } else {
      return {array: new Uint8Array(new Float64Array([value]).buffer), type: DataType.FLOAT64};
    }
  } else {
    if (isInt) {
      if (value <= 0xFF) {
        return {array: new Uint8Array(new Uint8Array([value]).buffer), type: DataType.UINT8};
      } else if (value <= 0xFFFF) {
        return {array: new Uint8Array(new Uint16Array([value]).buffer), type: DataType.UINT16};
      } else if (value <= 0xFFFFFFFF) {
        return {array: new Uint8Array(new Uint32Array([value]).buffer), type: DataType.UINT32};
      }
    }

    if (value <= 3.4E38) {
      return {array: new Uint8Array(new Float32Array([value]).buffer), type: DataType.FLOAT32};
    } else {
      return {array: new Uint8Array(new Float64Array([value]).buffer), type: DataType.FLOAT64};
    }
  }
}

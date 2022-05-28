import {Result} from '../../base/result';

import {BinaryConverter} from './binary-converter';
import {BinaryData} from './binary-data';
import {DataType} from './data-type';
import {DataTypeConverter} from './data-type-converter';
import {NumberConverter} from './number-converter';

/**
 * Converts string to uint8array
 *
 * Format:
 * [type][length][string]
 */
export class StringConverter implements BinaryConverter<string> {
  private readonly dataTypeConverter_: DataTypeConverter = new DataTypeConverter();
  private readonly numberConverter_: NumberConverter = new NumberConverter();

  convertBackward(value: Uint8Array): Result<BinaryData<string>> {
    const typeResult = this.dataTypeConverter_.convertBackward(value);
    if (!typeResult.success) {
      return {success: false};
    }

    if (typeResult.result.data !== DataType.STRING) {
      return {success: false};
    }

    const typeLength = typeResult.result.length;
    const lengthResult = this.numberConverter_.convertBackward(value.slice(typeLength));
    if (!lengthResult.success) {
      return {success: false};
    }

    const decoder = new TextDecoder();
    const prefixLength = typeLength + lengthResult.result.length;
    const data = decoder.decode(
        value.slice(prefixLength, prefixLength + lengthResult.result.data).buffer);

    return {
      result: {data, length: prefixLength + lengthResult.result.data},
      success: true,
    };
  }

  convertForward(value: string): Result<Uint8Array> {
    const dataTypeResult = this.dataTypeConverter_.convertForward(DataType.STRING);
    if (!dataTypeResult.success) {
      return {success: false};
    }

    const encoder = new TextEncoder();
    const encodedArray = encoder.encode(value);

    const lengthResult = this.numberConverter_.convertForward(encodedArray.length);
    if (!lengthResult.success) {
      return {success: false};
    }

    const array = new Uint8Array([
      ...dataTypeResult.result,
      ...lengthResult.result,
      ...encodedArray,
    ]);

    return {result: array, success: true};
  }
}

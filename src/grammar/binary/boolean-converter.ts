import {Result} from '../../base/result';

import {BinaryConverter} from './binary-converter';
import {BinaryData} from './binary-data';
import {DataType} from './data-type';
import {DataTypeConverter} from './data-type-converter';

/**
 * Converts boolean to uint8array
 *
 * Format:
 * [type][1/0]
 */
export class BooleanConverter implements BinaryConverter<boolean> {
  private readonly dataTypeConverter_: DataTypeConverter =
    new DataTypeConverter();

  convertBackward(value: Uint8Array): Result<BinaryData<boolean>> {
    const typeResult = this.dataTypeConverter_.convertBackward(value);
    if (!typeResult.success) {
      return {success: false};
    }

    if (typeResult.result.data !== DataType.BOOLEAN) {
      return {success: false};
    }

    const isTrue = !!value[typeResult.result.length];

    return {
      result: {data: isTrue, length: typeResult.result.length + 1},
      success: true,
    };
  }

  convertForward(value: boolean): Result<Uint8Array> {
    const dataTypeResult = this.dataTypeConverter_.convertForward(
      DataType.BOOLEAN,
    );
    if (!dataTypeResult.success) {
      return {success: false};
    }

    const array = new Uint8Array([
      ...dataTypeResult.result,
      ...new Uint8Array([value ? 1 : 0]),
    ]);

    return {result: array, success: true};
  }
}

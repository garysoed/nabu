import {Result} from '../../base/result';

import {BinaryConverter} from './binary-converter';
import {BinaryData} from './binary-data';
import {DataType} from './data-type';
import {DataTypeConverter} from './data-type-converter';

/**
 * Converts undefined to uint8array
 *
 * Format:
 * [type]
 */
export class UndefinedConverter implements BinaryConverter<undefined> {
  private readonly dataTypeConverter_: DataTypeConverter = new DataTypeConverter();

  convertBackward(value: Uint8Array): Result<BinaryData<undefined>> {
    const typeResult = this.dataTypeConverter_.convertBackward(value);
    if (!typeResult.success) {
      return {success: false};
    }

    if (typeResult.result.data !== DataType.UNDEFINED) {
      return {success: false};
    }

    return {result: {data: undefined, length: typeResult.result.length}, success: true};
  }

  convertForward(): Result<Uint8Array> {
    const dataTypeResult = this.dataTypeConverter_.convertForward(DataType.UNDEFINED);
    if (!dataTypeResult.success) {
      return {success: false};
    }

    const array = new Uint8Array([
      ...new Uint8Array(dataTypeResult.result),
    ]);

    return {result: array, success: true};
  }
}

import { BinaryConverter } from './binary-converter';
import { BinaryData } from './binary-data';
import { DataType } from './data-type';
import { DataTypeConverter } from './data-type-converter';
import { Result } from '../../base/result';

/**
 * Converts null to uint8array
 *
 * Format:
 * [type]
 */
export class NullConverter implements BinaryConverter<null> {
  private readonly dataTypeConverter_: DataTypeConverter = new DataTypeConverter();

  convertBackward(value: Uint8Array): Result<BinaryData<null>> {
    const typeResult = this.dataTypeConverter_.convertBackward(value);
    if (!typeResult.success) {
      return {success: false};
    }

    if (typeResult.result.data !== DataType.NULL) {
      return {success: false};
    }

    return {result: {data: null, length: typeResult.result.length}, success: true};
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  convertForward(_input: null): Result<Uint8Array> {
    const dataTypeResult = this.dataTypeConverter_.convertForward(DataType.NULL);
    if (!dataTypeResult.success) {
      return {success: false};
    }

    const array = new Uint8Array([
      ...new Uint8Array(dataTypeResult.result),
    ]);

    return {result: array, success: true};
  }
}

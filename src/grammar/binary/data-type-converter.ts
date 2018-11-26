import { Result } from '../../base/result';
import { BinaryConverter } from './binary-converter';
import { BinaryData } from './binary-data';
import { DataType, isADataType } from './data-type';

export class DataTypeConverter implements BinaryConverter<DataType> {
  convertBackward(value: Uint8Array): Result<BinaryData<DataType>> {
    const type = value[0];
    if (!isADataType(type)) {
      return {success: false};
    }

    return {result: {data: type, length: 1}, success: true};
  }

  convertForward(input: DataType): Result<Uint8Array> {
    return {result: Uint8Array.from([input]), success: true};
  }
}

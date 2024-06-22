import {Result} from '../../base/result';

import {BinaryConverter} from './binary-converter';
import {BinaryData} from './binary-data';
import {DataType} from './data-type';
import {DataTypeConverter} from './data-type-converter';
import {NumberConverter} from './number-converter';

/**
 * Converts lists to uint8array.
 *
 * Format:
 * [type][length][entry1][entry2]...[entryN]
 */
export class ListConverter implements BinaryConverter<readonly unknown[]> {
  private readonly dataTypeConverter_: DataTypeConverter =
    new DataTypeConverter();
  private readonly numberConverter_: NumberConverter = new NumberConverter();

  constructor(
    private readonly serializableConverter_: BinaryConverter<unknown>,
  ) {}

  convertBackward(value: Uint8Array): Result<BinaryData<readonly unknown[]>> {
    const typeResult = this.dataTypeConverter_.convertBackward(value);
    if (!typeResult.success) {
      return {success: false};
    }

    if (typeResult.result.data !== DataType.LIST) {
      return {success: false};
    }

    const typeLength = typeResult.result.length;
    const lengthResult = this.numberConverter_.convertBackward(
      value.slice(typeLength),
    );
    if (!lengthResult.success) {
      return {success: false};
    }

    let arrayIndex = typeLength + lengthResult.result.length;
    const array = [];
    for (let i = 0; i < lengthResult.result.data; i++) {
      const itemResult = this.serializableConverter_.convertBackward(
        value.slice(arrayIndex),
      );
      if (!itemResult.success) {
        return {success: false};
      }

      array.push(itemResult.result.data);
      arrayIndex += itemResult.result.length;
    }

    return {result: {data: array, length: arrayIndex}, success: true};
  }

  convertForward(value: readonly unknown[]): Result<Uint8Array> {
    const itemResults = value.map((item) =>
      this.serializableConverter_.convertForward(item),
    );
    const results = [
      this.dataTypeConverter_.convertForward(DataType.LIST),
      this.numberConverter_.convertForward(value.length),
      ...itemResults,
    ];

    let array = new Uint8Array(0);
    for (const result of results) {
      if (!result.success) {
        return {success: false};
      }

      array = new Uint8Array([...array, ...result.result]);
    }

    return {result: array, success: true};
  }
}

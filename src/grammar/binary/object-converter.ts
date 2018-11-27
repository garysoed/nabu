import { Result } from '../../base/result';
import { Serializable, SerializableObject } from '../../base/serializable';
import { BinaryConverter } from './binary-converter';
import { BinaryData } from './binary-data';
import { DataType } from './data-type';
import { DataTypeConverter } from './data-type-converter';
import { NumberConverter } from './number-converter';
import { StringConverter } from './string-converter';

class ObjectEntryConverter implements BinaryConverter<[string, Serializable]> {
  private readonly stringConverter_: StringConverter = new StringConverter();

  constructor(private readonly serializableConverter_: BinaryConverter<Serializable>) { }

  convertBackward(value: Uint8Array): Result<BinaryData<[string, Serializable]>> {
    const keyResult = this.stringConverter_.convertBackward(value);
    if (!keyResult.success) {
      return {success: false};
    }

    const contentResult = this.serializableConverter_.convertBackward(
        value.slice(keyResult.result.length));
    if (!contentResult.success) {
      return {success: false};
    }

    return {
      result: {
        data: [keyResult.result.data, contentResult.result.data],
        length: keyResult.result.length + contentResult.result.length,
      },
      success: true,
    };
  }

  convertForward(value: [string, Serializable]): Result<Uint8Array> {
    const keyResult = this.stringConverter_.convertForward(value[0]);
    if (!keyResult.success) {
      return {success: false};
    }

    const contentResult = this.serializableConverter_.convertForward(value[1]);
    if (!contentResult.success) {
      return {success: false};
    }

    const array = new Uint8Array([
      ...keyResult.result,
      ...contentResult.result,
    ]);

    return {result: array, success: true};
  }
}

export class ObjectConverter implements BinaryConverter<SerializableObject> {
  private readonly dataTypeConverter_: DataTypeConverter = new DataTypeConverter();
  private readonly numberConverter_: NumberConverter = new NumberConverter();
  private readonly objectEntryConverter_: ObjectEntryConverter;

  constructor(serializableConverter: BinaryConverter<Serializable>) {
    this.objectEntryConverter_ = new ObjectEntryConverter(serializableConverter);
  }

  convertBackward(value: Uint8Array): Result<BinaryData<SerializableObject>> {
    const typeResult = this.dataTypeConverter_.convertBackward(value);
    if (!typeResult.success) {
      return {success: false};
    }

    if (typeResult.result.data !== DataType.OBJECT) {
      return {success: false};
    }

    const typeLength = typeResult.result.length;
    const lengthResult = this.numberConverter_.convertBackward(value.slice(typeLength));
    if (!lengthResult.success) {
      return {success: false};
    }

    let arrayIndex = typeLength + lengthResult.result.length;
    const object: SerializableObject = {};
    for (let i = 0; i < lengthResult.result.data; i++) {
      const entryResult = this.objectEntryConverter_.convertBackward(value.slice(arrayIndex));
      if (!entryResult.success) {
        return {success: false};
      }

      const entry = entryResult.result.data;
      object[entry[0]] = entry[1];
      arrayIndex += entryResult.result.length;
    }

    return {result: {data: object, length: arrayIndex}, success: true};
  }

  convertForward(value: SerializableObject): Result<Uint8Array> {
    const entryResults = [];
    for (const key in value) {
      if (!value.hasOwnProperty(key)) {
        continue;
      }

      entryResults.push(this.objectEntryConverter_.convertForward([key, value[key]]));
    }

    const results = [
      this.dataTypeConverter_.convertForward(DataType.OBJECT),
      this.numberConverter_.convertForward(entryResults.length),
      ...entryResults,
    ];

    let array = new Uint8Array(0);
    for (const result of results) {
      if (!result.success) {
        return {success: false};
      }

      array = new Uint8Array([
        ...array,
        ...result.result,
      ]);
    }

    return {result: array, success: true};
  }
}

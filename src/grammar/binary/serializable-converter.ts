import { Result } from '../../base/result';

import { BinaryConverter } from './binary-converter';
import { BinaryData } from './binary-data';
import { BooleanConverter } from './boolean-converter';
import { ListConverter } from './list-converter';
import { NullConverter } from './null-converter';
import { NumberConverter } from './number-converter';
import { ObjectConverter } from './object-converter';
import { StringConverter } from './string-converter';
import { UndefinedConverter } from './undefined-converter';

/**
 * Combines all the different converters.
 */
export class SerializableConverter implements BinaryConverter<unknown> {
  private readonly booleanConverter: BooleanConverter = new BooleanConverter();
  private readonly listConverter: ListConverter = new ListConverter(this);
  private readonly nullConverter: NullConverter = new NullConverter();
  private readonly numberConverter: NumberConverter = new NumberConverter();
  private readonly objectConverter: ObjectConverter = new ObjectConverter(this);
  private readonly stringConverter: StringConverter = new StringConverter();
  private readonly undefinedConverter: UndefinedConverter = new UndefinedConverter();

  convertBackward(value: Uint8Array): Result<BinaryData<unknown>> {
    const converters = [
      this.booleanConverter,
      this.listConverter,
      this.nullConverter,
      this.numberConverter,
      this.objectConverter,
      this.stringConverter,
      this.undefinedConverter,
    ];
    for (const converter of converters) {
      const result = converter.convertBackward(value);
      if (result.success) {
        return result;
      }
    }

    return {success: false};
  }

  convertForward(value: unknown): Result<Uint8Array> {
    if (value === undefined) {
      return this.undefinedConverter.convertForward();
    }

    if (value === null) {
      return this.nullConverter.convertForward(value);
    }

    if (typeof value === 'boolean') {
      return this.booleanConverter.convertForward(value);
    }

    if (typeof value === 'number') {
      return this.numberConverter.convertForward(value);
    }

    if (typeof value === 'string') {
      return this.stringConverter.convertForward(value);
    }

    if (value instanceof Array) {
      return this.listConverter.convertForward(value);
    }

    if (value instanceof Object) {
      return this.objectConverter.convertForward(value as Record<string, unknown>);
    }

    throw new Error(`Unsupported value: ${value}`);
  }
}

import { Converter } from '../../base/converter';
import { Result } from '../../base/result';

import { Base64 } from './base64';
import { SerializableConverter } from './serializable-converter';

class Binary implements Converter<unknown, string> {
  private readonly base64: Base64 = new Base64();
  private readonly serializableConverter: SerializableConverter = new SerializableConverter();

  convertBackward(value: string): Result<unknown> {
    const base64Result = this.base64.convertBackward(value);
    if (!base64Result.success) {
      return {success: false};
    }

    const result = this.serializableConverter.convertBackward(base64Result.result);
    if (!result.success) {
      return {success: false};
    }

    return {result: result.result.data, success: true};
  }

  convertForward(input: unknown): Result<string> {
    const result = this.serializableConverter.convertForward(input);
    if (!result.success) {
      return {success: false};
    }

    return this.base64.convertForward(result.result);
  }
}

export function binary(): Binary {
  return new Binary();
}

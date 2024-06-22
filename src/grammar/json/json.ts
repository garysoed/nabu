import {Converter} from '../../base/converter';
import {Result} from '../../base/result';

class Json implements Converter<unknown, string> {
  convertBackward(value: string): Result<unknown> {
    try {
      return {result: JSON.parse(value), success: true};
    } catch {
      return {success: false};
    }
  }

  convertForward(input: unknown): Result<string> {
    try {
      return {result: JSON.stringify(input), success: true};
    } catch {
      return {success: false};
    }
  }
}

export function json(): Json {
  return new Json();
}

import { Converter } from '../../base/converter';
import { Result } from '../../base/result';
import { Serializable } from '../../base/serializable';

class Json implements Converter<Serializable, string> {
  convertBackward(value: string): Result<Serializable> {
    try {
      return {result: JSON.parse(value), success: true};
    } catch (error) {
      return {success: false};
    }
  }

  convertForward(input: Serializable): Result<string> {
    try {
      return {result: JSON.stringify(input), success: true};
    } catch (error) {
      return {success: false};
    }
  }
}

export function json(): Json {
  return new Json();
}

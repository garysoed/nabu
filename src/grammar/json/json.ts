import { Converter } from '../../base/converter';
import { Serializable } from '../../base/serializable';

class Json implements Converter<Serializable, string> {
  convertBackward(value: string|null|undefined): Serializable {
    if (value === null) {
      return null;
    }

    if (value === undefined) {
      return undefined;
    }

    return JSON.parse(value);
  }

  convertForward(input: Serializable): string|null {
    return JSON.stringify(input);
  }
}

export function json(): Json {
  return new Json();
}

import { Converter } from '../base/converter';
import { SerializableObject } from '../base/serializable';
import { parse as parseHuman } from '../grammar-out/human';
import { render } from './renderer';

class ObjectConverter implements Converter<SerializableObject, string> {
  convertBackward(value: string|null): SerializableObject|null {
    if (!value) {
      return null;
    }

    return parseHuman(value, {startRule: 'object'});
  }

  convertForward(input: SerializableObject|null): string|null {
    if (!input) {
      return null;
    }

    return render(input);
  }
}

export function objectConverter(): ObjectConverter {
  return new ObjectConverter();
}

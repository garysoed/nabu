import { Converter } from '../base/converter';
import { SerializableList } from '../base/serializable';
import { parse as parseHuman } from '../grammar-out/human';
import { render } from './renderer';

class ListConverter implements Converter<SerializableList, string> {
  convertBackward(value: string|null): SerializableList|null {
    if (!value) {
      return null;
    }

    return parseHuman(value, {startRule: 'array'});
  }

  convertForward(input: SerializableList|null): string|null {
    if (!input) {
      return null;
    }

    return render(input);
  }
}

export function listConverter(): ListConverter {
  return new ListConverter();
}

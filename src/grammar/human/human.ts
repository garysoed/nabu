import { Converter } from '../../base/converter';
import { Serializable } from '../../base/serializable';
import { parse } from './parser';
import { render } from './renderer';

class Human implements Converter<Serializable, string> {
  convertBackward(value: string|null): Serializable {
    if (!value) {
      return null;
    }

    return parse(value);
  }

  convertForward(input: Serializable): string|null {
    return render(input);
  }
}

export function human(): Human {
  return new Human();
}

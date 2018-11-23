import { Converter } from '../base/converter';
import { parse as parseHuman } from '../grammar-out/human';
import { render } from './renderer';

class StringConverter implements Converter<string, string> {
  convertBackward(value: string|null): null|string {
    if (!value) {
      return null;
    }

    return parseHuman(value, {startRule: 'string'});
  }

  convertForward(input: null|string): string|null {
    if (!input) {
      return null;
    }

    return render(input);
  }
}

export function stringConverter(): StringConverter {
  return new StringConverter();
}

import { Converter } from '../base/converter';
import { parse as parseHuman } from '../grammar-out/human';
import { render } from './renderer';

class BooleanConverter implements Converter<boolean, string> {
  convertBackward(value: string|null): null|boolean {
    if (!value) {
      return null;
    }

    return parseHuman(value, {startRule: 'boolean'});
  }

  convertForward(input: null|boolean): string|null {
    if (!input) {
      return null;
    }

    return render(input);
  }
}

export function booleanConverter(): BooleanConverter {
  return new BooleanConverter();
}

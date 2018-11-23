import { Converter } from '../base/converter';
import { parse as parseHuman } from '../grammar-out/human';
import { render } from './renderer';

class UndefinedConverter implements Converter<undefined, string> {
  convertBackward(value: string|null): null|undefined {
    if (!value) {
      return null;
    }

    return parseHuman(value, {startRule: 'undefined'});
  }

  convertForward(input: null|undefined): string|null {
    if (input === null) {
      return null;
    }

    return render(input);
  }
}

export function undefinedConverter(): UndefinedConverter {
  return new UndefinedConverter();
}

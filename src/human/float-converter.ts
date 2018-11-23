import { Converter } from '../base/converter';
import { parse as parseHuman } from '../grammar-out/human';
import { render } from './renderer';

class FloatConverter implements Converter<number, string> {
  convertBackward(value: string|null): number|null {
    if (!value) {
      return null;
    }

    return parseHuman(value, {startRule: 'number'});
  }

  convertForward(input: number|null): string|null {
    if (!input) {
      return null;
    }

    return render(input);
  }
}

export function floatConverter(): FloatConverter {
  return new FloatConverter();
}

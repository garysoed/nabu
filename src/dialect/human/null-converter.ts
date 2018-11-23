import { Converter } from '../base/converter';
import { parse as parseHuman } from '../grammar-out/human';
import { render } from './renderer';

class NullConverter implements Converter<null, string> {
  convertBackward(value: string|null): null {
    if (!value) {
      return null;
    }

    return parseHuman(value, {startRule: 'null'});
  }

  convertForward(input: null): string|null {
    return render(input);
  }
}

export function nullConverter(): NullConverter {
  return new NullConverter();
}

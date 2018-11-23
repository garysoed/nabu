import { Converter } from '../../base/converter';
import { Serializable } from '../../base/serializable';
import { parse } from './human';
import { render } from './renderer';

class HumanConverter implements Converter<Serializable, string> {
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

export function humanConverter(): HumanConverter {
  return new HumanConverter();
}

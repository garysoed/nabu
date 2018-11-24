import { Converter } from '../../base/converter';
import { Result } from '../../base/result';
import { Serializable } from '../../base/serializable';
import { parse } from './parser';
import { render } from './renderer';

class Human implements Converter<Serializable, string> {
  convertBackward(value: string): Result<Serializable> {
    try {
      return {result: parse(value), success: true};
    } catch (error) {
      return {success: false};
    }
  }

  convertForward(input: Serializable): Result<string> {
    return {result: render(input), success: true};
  }
}

export function human(): Human {
  return new Human();
}

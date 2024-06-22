import {Converter} from '../../base/converter';
import {Result} from '../../base/result';

import {parse} from './parser';
import {render} from './renderer';

class Human implements Converter<unknown, string> {
  convertBackward(value: string): Result<unknown> {
    try {
      return {result: parse(value), success: true};
    } catch {
      return {success: false};
    }
  }

  convertForward(input: unknown): Result<string> {
    return {result: render(input), success: true};
  }
}

export function human(): Human {
  return new Human();
}

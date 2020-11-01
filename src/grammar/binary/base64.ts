import { Converter } from '../../base/converter';
import { Result } from '../../base/result';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const REVERSE_MAP = new Map<string, number>();
for (let i = 0; i < LETTERS.length; i++) {
  REVERSE_MAP.set(LETTERS[i], i);
}

export class Base64 implements Converter<Uint8Array, string> {
  convertBackward(value: string): Result<Uint8Array> {
    const array = [];
    for (let i = 0; i < value.length; i += 4) {
      const letter0 = value[i];
      const letter1 = value[i + 1];
      const letter2 = value[i + 2];
      const letter3 = value[i + 3];

      const item0 = REVERSE_MAP.get(letter0);
      const item1 = REVERSE_MAP.get(letter1);
      const item2 = letter2 === '=' ? 0 : REVERSE_MAP.get(letter2);
      const item3 = letter3 === '=' ? 0 : REVERSE_MAP.get(letter3);

      if (item3 === undefined || item2 === undefined || item1 === undefined
          || item0 === undefined) {
        return {success: false};
      }

      let code = 0;
      code += item0 << 18;
      code += item1 << 12;
      code += item2 << 6;
      code += item3;

      const digit0 = (code & 0xFF0000) >> 16;
      const digit1 = (code & 0x00FF00) >> 8;
      const digit2 = code & 0x0000FF;

      array.push(digit0);
      if (letter2 !== '=') {
        array.push(digit1);
      }

      if (letter3 !== '=') {
        array.push(digit2);
      }
    }

    return {result: Uint8Array.from(array), success: true};
  }

  convertForward(input: Uint8Array): Result<string> {
    const letters: string[] = [];
    for (let i = 0; i < input.length; i += 3) {
      const item0 = input[i];
      const item1 = input[i + 1];
      const item2 = input[i + 2];

      let code = 0;
      code += item0 << 16;
      code += (item1 || 0) << 8;
      code += item2 || 0;

      const letter0 = (code & 0xFC0000) >> 18;
      const letter1 = (code & 0x03F000) >> 12;
      const letter2 = (code & 0x000FC0) >> 6;
      const letter3 = code & 0X3F;

      letters.push(LETTERS[letter0]);
      letters.push(LETTERS[letter1]);

      if (item1 === undefined) {
        letters.push('=');
      } else {
        letters.push(LETTERS[letter2]);
      }

      if (item2 === undefined) {
        letters.push('=');
      } else {
        letters.push(LETTERS[letter3]);
      }
    }

    return {result: letters.join(''), success: true};
  }
}

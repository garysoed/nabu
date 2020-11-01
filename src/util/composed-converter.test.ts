import { assert, should, test } from 'gs-testing';

import { Converter } from '../base/converter';
import { Result } from '../base/result';

import { compose } from './composed-converter';
import { reverse } from './reversed-converter';

class PostfixConverter implements Converter<string, string> {
  constructor(private readonly postfix_: string) { }

  convertBackward(value: string): Result<string> {
    if (!value.endsWith(this.postfix_)) {
      return {success: false};
    }

    return {result: value.substring(0, value.length - 1), success: true};
  }

  convertForward(value: string): Result<string> {
    return {result: `${value}${this.postfix_}`, success: true};
  }
}

test('util.ComposedConverter', () => {
  test('convertBackward', () => {
    should('convert correctly', () => {
      const converter = compose(
          new PostfixConverter('a'),
          new PostfixConverter('b'),
      );

      assert(converter.convertBackward('cab')).to.haveProperties({result: 'c'});
      assert(converter.convertBackward('abc')).to.haveProperties({success: false});
    });

    should('convert correctly for one converter', () => {
      const converter = compose(new PostfixConverter('a'));

      assert(converter.convertBackward('ca')).to.haveProperties({result: 'c'});
      assert(converter.convertBackward('ab')).to.haveProperties({success: false});
    });
  });

  test('convertForward', () => {
    should('convert correctly', () => {
      const converter = reverse(compose(
          new PostfixConverter('a'),
          new PostfixConverter('b'),
      ));

      assert(converter.convertForward('cab')).to.haveProperties({result: 'c'});
      assert(converter.convertForward('abc')).to.haveProperties({success: false});
    });

    should('convert correctly for one converter', () => {
      const converter = reverse(compose(new PostfixConverter('a')));

      assert(converter.convertForward('ca')).to.haveProperties({result: 'c'});
      assert(converter.convertForward('ab')).to.haveProperties({success: false});
    });
  });
});

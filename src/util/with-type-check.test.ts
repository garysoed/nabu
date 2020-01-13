import { assert, should, test } from '@gs-testing';
import { numberType } from '@gs-types';

import { withTypeCheck } from './with-type-check';

test('@nabu/util/with-type-check', () => {
  test('convertBackward', () => {
    should(`convert correctly`, () => {
      const converter = withTypeCheck(numberType);
      assert(converter.convertBackward(123)).to.haveProperties({result: 123});
    });

  });

  test('convertForward', () => {
    should(`convert correctly if the type is correct`, () => {
      const converter = withTypeCheck(numberType);
      assert(converter.convertForward(123)).to.haveProperties({result: 123});
    });

    should(`fail if the type is incorrect`, () => {
      const converter = withTypeCheck(numberType);
      assert(converter.convertForward('123')).to.haveProperties({success: false});
    });
  });
});

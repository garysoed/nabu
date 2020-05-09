import { assert, should, test } from 'gs-testing';

import { identity } from './identity-converter';

test('util.IdentityConverter', () => {
  test('convertBackward', () => {
    should(`return the same object`, () => {
      const obj = {};
      assert(identity().convertBackward(obj)).to.haveProperties({result: obj});
    });
  });

  test('convertForward', () => {
    should(`return the same object`, () => {
      const obj = {};
      assert(identity().convertForward(obj)).to.haveProperties({result: obj});
    });
  });
});

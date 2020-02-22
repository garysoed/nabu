import { assert, objectThat, should, test } from 'gs-testing';

import { deepClone } from './deep-clone';

test('@nabu/util/deep-clone', () => {
  should('clone the given object', () => {
    const original = {
      a: { b: 2 },
    };
    const clone = deepClone(original);
    assert(clone).to.haveProperties({
      a: objectThat().haveProperties({b: 2}),
    });
    assert(clone).toNot.equal(original);
  });
});

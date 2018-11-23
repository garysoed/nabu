import { assert, match, should, test } from 'gs-testing/export/main';
import { objectConverter } from './object-converter';

test('human.ObjectConverter', () => {
  test('convertBackward', () => {
    should(`convert objects correctly`, () => {
      assert(objectConverter().convertBackward('{a: 1, b: "b"}')).to
          .equal(match.anyObjectThat().haveProperties({
            a: 1,
            b: 'b',
          }));
    });

    should(`return null if value is null`, () => {
      assert(objectConverter().convertBackward(null)).to.beNull();
    });
  });

  test('convertForward', () => {
    should(`convert to string correctly`, () => {
      assert(objectConverter().convertForward({a: 1, b: 'b'})).to.equal('{a: 1, b: "b"}');
    });

    should(`convert to null if value is null`, () => {
      assert(objectConverter().convertForward(null)).to.beNull();
    });
  });
});

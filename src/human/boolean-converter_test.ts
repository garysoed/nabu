import { assert, should, test } from 'gs-testing/export/main';
import { booleanConverter } from './boolean-converter';

test('human.BooleanConverter', () => {
  test('convertBackward', () => {
    should(`convert booleans correctly`, () => {
      assert(booleanConverter().convertBackward('T')).to.equal(true);
    });

    should(`return null if value is null`, () => {
      assert(booleanConverter().convertBackward(null)).to.beNull();
    });
  });

  test('convertForward', () => {
    should(`convert to string correctly`, () => {
      assert(booleanConverter().convertForward(true)).to.equal('T');
    });

    should(`convert to null if value is null`, () => {
      assert(booleanConverter().convertForward(null)).to.beNull();
    });
  });
});

import { assert, should, test } from 'gs-testing/export/main';
import { stringConverter } from './string-converter';

test('human.StringConverter', () => {
  test('convertBackward', () => {
    should(`convert strings correctly`, () => {
      assert(stringConverter().convertBackward('"abc"')).to.equal('abc');
    });

    should(`return null if value is null`, () => {
      assert(stringConverter().convertBackward(null)).to.beNull();
    });
  });

  test('convertForward', () => {
    should(`convert to string correctly`, () => {
      assert(stringConverter().convertForward('abc')).to.equal('"abc"');
    });

    should(`convert to null if value is null`, () => {
      assert(stringConverter().convertForward(null)).to.beNull();
    });
  });
});

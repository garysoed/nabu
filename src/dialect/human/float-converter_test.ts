import { assert, should, test } from 'gs-testing/export/main';
import { floatConverter } from './float-converter';

test('human.FloatConverter', () => {
  test('convertBackward', () => {
    should(`convert floats correctly`, () => {
      assert(floatConverter().convertBackward('1.23')).to.equal(1.23);
    });

    should(`return null if value is null`, () => {
      assert(floatConverter().convertBackward(null)).to.beNull();
    });
  });

  test('convertForward', () => {
    should(`convert to string correctly`, () => {
      assert(floatConverter().convertForward(1.23)).to.equal('1.23');
    });

    should(`convert to null if value is null`, () => {
      assert(floatConverter().convertForward(null)).to.beNull();
    });
  });
});

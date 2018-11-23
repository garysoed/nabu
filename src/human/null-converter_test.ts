import { assert, should, test } from 'gs-testing/export/main';
import { nullConverter } from './null-converter';

test('human.NullConverter', () => {
  test('convertBackward', () => {
    should(`convert null correctly`, () => {
      assert(nullConverter().convertBackward('null')).to.beNull();
    });

    should(`return null if value is null`, () => {
      assert(nullConverter().convertBackward(null)).to.beNull();
    });
  });

  test('convertForward', () => {
    should(`convert to string correctly`, () => {
      assert(nullConverter().convertForward(null)).to.equal('null');
    });
  });
});

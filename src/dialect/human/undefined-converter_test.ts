import { assert, should, test } from 'gs-testing/export/main';
import { undefinedConverter } from './undefined-converter';

test('human.UndefinedConverter', () => {
  test('convertBackward', () => {
    should(`convert undefined correctly`, () => {
      assert(undefinedConverter().convertBackward('undefined')).toNot.beDefined();
    });

    should(`return null if value is null`, () => {
      assert(undefinedConverter().convertBackward(null)).to.beNull();
    });
  });

  test('convertForward', () => {
    should(`convert to string correctly`, () => {
      assert(undefinedConverter().convertForward(undefined)).to.equal('undefined');
    });

    should(`convert to null if value is null`, () => {
      assert(undefinedConverter().convertForward(null)).to.beNull();
    });
  });
});

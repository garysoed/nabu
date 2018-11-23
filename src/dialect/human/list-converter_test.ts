import { assert, match, should, test } from 'gs-testing/export/main';
import { Serializable } from '../base/serializable';
import { listConverter } from './list-converter';

test('human.ListConverter', () => {
  test('convertBackward', () => {
    should(`convert lists correctly`, () => {
      assert(listConverter().convertBackward('[1.23 "test"]')).to
          .equal(match.anyArrayThat<Serializable>().haveExactElements([1.23, 'test']));
    });

    should(`return null if value is null`, () => {
      assert(listConverter().convertBackward(null)).to.beNull();
    });
  });

  test('convertForward', () => {
    should(`convert to string correctly`, () => {
      assert(listConverter().convertForward([1.23, 'test'])).to.equal('[1.23 "test"]');
    });

    should(`convert to null if value is null`, () => {
      assert(listConverter().convertForward(null)).to.beNull();
    });
  });
});

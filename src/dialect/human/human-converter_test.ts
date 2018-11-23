import { assert, match, should, test } from 'gs-testing/export/main';
import { Serializable } from '../../base/serializable';
import { humanConverter } from './human-converter';

test('dialect.human.HumanConverter', () => {
  test('convertBackward', () => {
    should(`parse undefined correctly`, () => {
      assert(humanConverter().convertBackward('undefined')).toNot.beDefined();
    });

    should(`parse null correctly`, () => {
      assert(humanConverter().convertBackward('null')).to.beNull();
    });

    should(`parse booleans correctly`, () => {
      assert(humanConverter().convertBackward('T')).to.equal(true);
    });

    should(`parse strings correctly`, () => {
      assert(humanConverter().convertBackward('"abc"')).to.equal('abc');
    });

    should(`parse numbers correctly`, () => {
      assert(humanConverter().convertBackward('1.23')).to.equal(1.23);
    });

    should(`parse lists correctly`, () => {
      assert(humanConverter().convertBackward('[1.23 "test"]')).to
          .equal(match.anyArrayThat<Serializable>().haveExactElements([1.23, 'test']));
    });

    should(`parse objects correctly`, () => {
      assert(humanConverter().convertBackward('{a: 1, b: "b"}')).to
          .equal(match.anyObjectThat().haveProperties({
            a: 1,
            b: 'b',
          }));
    });

    should(`return null if value is null`, () => {
      assert(humanConverter().convertBackward(null)).to.beNull();
    });
  });

  test('convertForward', () => {
    should(`render undefined correctly`, () => {
      assert(humanConverter().convertForward(undefined)).to.equal('undefined');
    });

    should(`render null correctly`, () => {
      assert(humanConverter().convertForward(null)).to.equal('null');
    });

    should(`render booleans correctly`, () => {
      assert(humanConverter().convertForward(true)).to.equal('T');
    });

    should(`render strings correctly`, () => {
      assert(humanConverter().convertForward('abc')).to.equal('"abc"');
    });

    should(`render numbers correctly`, () => {
      assert(humanConverter().convertForward(1.23)).to.equal('1.23');
    });

    should(`render lists correctly`, () => {
      assert(humanConverter().convertForward([1.23, 'test'])).to.equal('[1.23 "test"]');
    });

    should(`render objects correctly`, () => {
      assert(humanConverter().convertForward({a: 1, b: 'b'})).to.equal('{a: 1, b: "b"}');
    });
  });
});

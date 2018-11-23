import { assert, match, should, test } from 'gs-testing/export/main';
import { Serializable } from '../../base/serializable';
import { human } from './human';

test('grammar.human.Human', () => {
  test('convertBackward', () => {
    should(`parse undefined correctly`, () => {
      assert(human().convertBackward('undefined')).toNot.beDefined();
    });

    should(`parse null correctly`, () => {
      assert(human().convertBackward('null')).to.beNull();
    });

    should(`parse booleans correctly`, () => {
      assert(human().convertBackward('T')).to.equal(true);
    });

    should(`parse strings correctly`, () => {
      assert(human().convertBackward('"abc"')).to.equal('abc');
    });

    should(`parse numbers correctly`, () => {
      assert(human().convertBackward('1.23')).to.equal(1.23);
    });

    should(`parse lists correctly`, () => {
      assert(human().convertBackward('[1.23 "test"]')).to
          .equal(match.anyArrayThat<Serializable>().haveExactElements([1.23, 'test']));
    });

    should(`parse objects correctly`, () => {
      assert(human().convertBackward('{a: 1, b: "b"}')).to
          .equal(match.anyObjectThat().haveProperties({
            a: 1,
            b: 'b',
          }));
    });

    should(`return null if value is null`, () => {
      assert(human().convertBackward(null)).to.beNull();
    });
  });

  test('convertForward', () => {
    should(`render undefined correctly`, () => {
      assert(human().convertForward(undefined)).to.equal('undefined');
    });

    should(`render null correctly`, () => {
      assert(human().convertForward(null)).to.equal('null');
    });

    should(`render booleans correctly`, () => {
      assert(human().convertForward(true)).to.equal('T');
    });

    should(`render strings correctly`, () => {
      assert(human().convertForward('abc')).to.equal('"abc"');
    });

    should(`render numbers correctly`, () => {
      assert(human().convertForward(1.23)).to.equal('1.23');
    });

    should(`render lists correctly`, () => {
      assert(human().convertForward([1.23, 'test'])).to.equal('[1.23 "test"]');
    });

    should(`render objects correctly`, () => {
      assert(human().convertForward({a: 1, b: 'b'})).to.equal('{a: 1, b: "b"}');
    });
  });
});

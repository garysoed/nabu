import { assert, match, should, test } from 'gs-testing/export/main';
import { Serializable } from '../../base/serializable';
import { human } from './human';

test('grammar.human.Human', () => {
  test('convertBackward', () => {
    should(`parse undefined correctly`, () => {
      assert(human().convertBackward('undefined')).to.haveProperties({result: undefined});
    });

    should(`parse null correctly`, () => {
      assert(human().convertBackward('null')).to.haveProperties({result: null});
    });

    should(`parse booleans correctly`, () => {
      assert(human().convertBackward('T')).to.haveProperties({result: true});
    });

    should(`parse strings correctly`, () => {
      assert(human().convertBackward('"abc"')).to.haveProperties({result: 'abc'});
    });

    should(`parse numbers correctly`, () => {
      assert(human().convertBackward('1.23')).to.haveProperties({result: 1.23});
    });

    should(`parse lists correctly`, () => {
      assert(human().convertBackward('[1.23 "test"]')).to.haveProperties({
        result: match.anyArrayThat<Serializable>().haveExactElements([1.23, 'test']),
      });
    });

    should(`parse objects correctly`, () => {
      assert(human().convertBackward('{a: 1, b: "b"}')).to
          .haveProperties({
            result: match.anyObjectThat().haveProperties({
              a: 1,
              b: 'b',
            }),
          });
    });

    should(`fail if failed to parse`, () => {
      assert(human().convertBackward('')).to.haveProperties({success: false});
    });
  });

  test('convertForward', () => {
    should(`render undefined correctly`, () => {
      assert(human().convertForward(undefined)).to.haveProperties({result: 'undefined'});
    });

    should(`render null correctly`, () => {
      assert(human().convertForward(null)).to.haveProperties({result: 'null'});
    });

    should(`render booleans correctly`, () => {
      assert(human().convertForward(true)).to.haveProperties({result: 'T'});
    });

    should(`render strings correctly`, () => {
      assert(human().convertForward('abc')).to.haveProperties({result: '"abc"'});
    });

    should(`render numbers correctly`, () => {
      assert(human().convertForward(1.23)).to.haveProperties({result: '1.23'});
    });

    should(`render lists correctly`, () => {
      assert(human().convertForward([1.23, 'test'])).to.haveProperties({result: '[1.23 "test"]'});
    });

    should(`render objects correctly`, () => {
      assert(human().convertForward({a: 1, b: 'b'})).to.haveProperties({result: '{a: 1, b: "b"}'});
    });
  });
});

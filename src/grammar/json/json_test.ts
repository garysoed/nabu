import { assert, match, should, test } from 'gs-testing/export/main';
import { Serializable } from '../../base/serializable';
import { json } from './json';

test('grammar.human.Json', () => {

  test('convertBackward', () => {
    should(`parse undefined correctly`, () => {
      assert(json().convertBackward(JSON.stringify(undefined))).toNot.beDefined();
    });

    should(`parse null correctly`, () => {
      assert(json().convertBackward(JSON.stringify(null))).to.beNull();
    });

    should(`parse booleans correctly`, () => {
      assert(json().convertBackward(JSON.stringify(true))).to.equal(true);
    });

    should(`parse strings correctly`, () => {
      assert(json().convertBackward(JSON.stringify('abc'))).to.equal('abc');
    });

    should(`parse numbers correctly`, () => {
      assert(json().convertBackward(JSON.stringify(1.23))).to.equal(1.23);
    });

    should(`parse lists correctly`, () => {
      assert(json().convertBackward(JSON.stringify([1.23, 'test']))).to
          .equal(match.anyArrayThat<Serializable>().haveExactElements([1.23, 'test']));
    });

    should(`parse objects correctly`, () => {
      assert(json().convertBackward(JSON.stringify({a: 1, b: 'b'}))).to
          .equal(match.anyObjectThat().haveProperties({
            a: 1,
            b: 'b',
          }));
    });

    should(`return null if value is null`, () => {
      assert(json().convertBackward(null)).to.beNull();
    });
  });

  test('convertForward', () => {
    should(`render undefined correctly`, () => {
      assert(json().convertForward(undefined)).to.equal(JSON.stringify(undefined));
    });

    should(`render null correctly`, () => {
      assert(json().convertForward(null)).to.equal(JSON.stringify(null));
    });

    should(`render booleans correctly`, () => {
      assert(json().convertForward(true)).to.equal(JSON.stringify(true));
    });

    should(`render strings correctly`, () => {
      assert(json().convertForward('abc')).to.equal(JSON.stringify('abc'));
    });

    should(`render numbers correctly`, () => {
      assert(json().convertForward(1.23)).to.equal(JSON.stringify(1.23));
    });

    should(`render lists correctly`, () => {
      assert(json().convertForward([1.23, 'test'])).to.equal(JSON.stringify([1.23, 'test']));
    });

    should(`render objects correctly`, () => {
      assert(json().convertForward({a: 1, b: 'b'})).to.equal(JSON.stringify({a: 1, b: 'b'}));
    });
  });
});

import {arrayThat, assert, objectThat, should, test} from 'gs-testing';

import {json} from './json';

test('grammar.human.Json', () => {

  test('convertBackward', () => {
    should('parse undefined correctly', () => {
      assert(json().convertBackward(JSON.stringify(undefined))).to
          .haveProperties({result: undefined});
    });

    should('parse null correctly', () => {
      assert(json().convertBackward(JSON.stringify(null))).to.haveProperties({result: null});
    });

    should('parse booleans correctly', () => {
      assert(json().convertBackward(JSON.stringify(true))).to.haveProperties({result: true});
    });

    should('parse strings correctly', () => {
      assert(json().convertBackward(JSON.stringify('abc'))).to.haveProperties({result: 'abc'});
    });

    should('parse numbers correctly', () => {
      assert(json().convertBackward(JSON.stringify(1.23))).to.haveProperties({result: 1.23});
    });

    should('parse lists correctly', () => {
      assert(json().convertBackward(JSON.stringify([1.23, 'test']))).to.haveProperties({
        result: arrayThat().haveExactElements([1.23, 'test']),
      });
    });

    should('parse objects correctly', () => {
      assert(json().convertBackward(JSON.stringify({a: 1, b: 'b'}))).to.haveProperties({
        result: objectThat<Record<string, unknown>>().haveProperties({
          a: 1,
          b: 'b',
        }),
      });
    });

    should('fail if parsing failed', () => {
      assert(json().convertBackward('')).to.haveProperties({success: false});
    });
  });

  test('convertForward', () => {
    should('render undefined correctly', () => {
      assert(json().convertForward(undefined)).to
          .haveProperties({result: JSON.stringify(undefined)});
    });

    should('render null correctly', () => {
      assert(json().convertForward(null)).to.haveProperties({result: JSON.stringify(null)});
    });

    should('render booleans correctly', () => {
      assert(json().convertForward(true)).to.haveProperties({result: JSON.stringify(true)});
    });

    should('render strings correctly', () => {
      assert(json().convertForward('abc')).to.haveProperties({result: JSON.stringify('abc')});
    });

    should('render numbers correctly', () => {
      assert(json().convertForward(1.23)).to.haveProperties({result: JSON.stringify(1.23)});
    });

    should('render lists correctly', () => {
      assert(json().convertForward([1.23, 'test'])).to
          .haveProperties({result: JSON.stringify([1.23, 'test'])});
    });

    should('render objects correctly', () => {
      assert(json().convertForward({a: 1, b: 'b'})).to
          .haveProperties({result: JSON.stringify({a: 1, b: 'b'})});
    });

    should('fail if object cannot be stringified', () => {
      const obj: {a?: any} = {};
      obj.a = obj;

      assert(json().convertForward(obj)).to.haveProperties({success: false});
    });
  });
});

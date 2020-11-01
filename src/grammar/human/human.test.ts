import { arrayThat, assert, objectThat, should, test } from 'gs-testing';

import { SuccessResult } from '../../base/result';

import { human } from './human';

test(`grammar.human.Human`, () => {
  test(`convertBackward`, () => {
    should(`parse undefined correctly`, () => {
      assert(human().convertBackward(`undefined`)).to.haveProperties({result: undefined});
    });

    should(`parse null correctly`, () => {
      assert(human().convertBackward(`null`)).to.haveProperties({result: null});
    });

    should(`parse booleans correctly`, () => {
      assert(human().convertBackward(`T`)).to.haveProperties({result: true});
    });

    should(`parse strings correctly`, () => {
      assert(human().convertBackward(`'abc'`)).to.haveProperties({result: `abc`});
    });

    should(`parse numbers correctly`, () => {
      assert(human().convertBackward(`1.23`)).to.haveProperties({result: 1.23});
    });

    should(`parse lists correctly`, () => {
      assert(human().convertBackward(`[1.23 'test']`)).to.haveProperties({
        result: arrayThat().haveExactElements([1.23, `test`]),
      });
    });

    should(`parse objects correctly`, () => {
      assert(human().convertBackward(`{a: 1, b: 'b'}`)).to
          .haveProperties({
            result: objectThat().haveProperties({
              a: 1,
              b: `b`,
            }),
          });
    });

    should(`fail if failed to parse`, () => {
      assert(human().convertBackward(``)).to.haveProperties({success: false});
    });
  });

  test(`convertForward`, () => {
    should(`render undefined correctly`, () => {
      assert(human().convertForward(undefined)).to.haveProperties({result: `undefined`});
    });

    should(`render null correctly`, () => {
      assert(human().convertForward(null)).to.haveProperties({result: `null`});
    });

    should(`render booleans correctly`, () => {
      assert(human().convertForward(true)).to.haveProperties({result: `T`});
    });

    should(`render strings correctly`, () => {
      assert(human().convertForward(`abc`)).to.haveProperties({result: `'abc'`});
    });

    should(`render numbers correctly`, () => {
      assert(human().convertForward(1.23)).to.haveProperties({result: `1.23`});
    });

    should(`render lists correctly`, () => {
      assert(human().convertForward([1.23, `test`])).to.haveProperties({result: `[1.23 'test']`});
    });

    should(`render objects correctly`, () => {
      assert(human().convertForward({a: 1, b: `b`})).to.haveProperties({result: `{a: 1, b: 'b'}`});
    });
  });

  should(`convert forward and backward undefined correctly`, () => {
    const forwardResult = (human().convertForward(undefined) as SuccessResult<string>).result;
    assert(human().convertBackward(forwardResult)).to.haveProperties({result: undefined});
  });

  should(`convert forward and backward null correctly`, () => {
    const forwardResult = (human().convertForward(null) as SuccessResult<string>).result;
    assert(human().convertBackward(forwardResult)).to.haveProperties({result: null});
  });

  should(`convert forward and backward booleans correctly`, () => {
    const forwardResult = (human().convertForward(true) as SuccessResult<string>).result;
    assert(human().convertBackward(forwardResult)).to.haveProperties({result: true});
  });

  should(`convert forward and backward strings correctly`, () => {
    const forwardResult = (human().convertForward(`hello`) as SuccessResult<string>).result;
    assert(human().convertBackward(forwardResult)).to.haveProperties({result: `hello`});
  });

  should(`convert forward and backward numbers correctly`, () => {
    const forwardResult = (human().convertForward(1.234) as SuccessResult<string>).result;
    assert(human().convertBackward(forwardResult)).to.haveProperties({result: 1.234});
  });

  should(`convert forward and backward lists correctly`, () => {
    const forwardResult = (human().convertForward([1.23, `test`]) as SuccessResult<string>).result;
    assert(human().convertBackward(forwardResult)).to.haveProperties({
      result: arrayThat().haveExactElements([1.23, `test`]),
    });
  });

  should(`convert forward and backward objects correctly`, () => {
    const forwardResult = (human().convertForward({a: 1, b: 2}) as SuccessResult<string>).result;
    assert(human().convertBackward(forwardResult)).to.haveProperties({
      result: objectThat().haveProperties({a: 1, b: 2}),
    });
  });
});

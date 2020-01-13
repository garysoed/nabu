import { arrayThat, assert, objectThat, should, test } from '@gs-testing';

import { SuccessResult } from '../../base/result';

import { binary } from './binary';

test('grammar.binary.Binary', () => {
  should(`convert forward and backward undefined correctly`, () => {
    const forwardResult = (binary().convertForward(undefined) as SuccessResult<string>).result;
    assert(binary().convertBackward(forwardResult)).to.haveProperties({result: undefined});
  });

  should(`convert forward and backward null correctly`, () => {
    const forwardResult = (binary().convertForward(null) as SuccessResult<string>).result;
    assert(binary().convertBackward(forwardResult)).to.haveProperties({result: null});
  });

  should(`convert forward and backward booleans correctly`, () => {
    const forwardResult = (binary().convertForward(true) as SuccessResult<string>).result;
    assert(binary().convertBackward(forwardResult)).to.haveProperties({result: true});
  });

  should(`convert forward and backward strings correctly`, () => {
    const forwardResult = (binary().convertForward('hello') as SuccessResult<string>).result;
    assert(binary().convertBackward(forwardResult)).to.haveProperties({result: 'hello'});
  });

  should(`convert forward and backward numbers correctly`, () => {
    const forwardResult = (binary().convertForward(1.234) as SuccessResult<string>).result;
    assert(binary().convertBackward(forwardResult)).to.haveProperties({result: 1.234});
  });

  should(`convert forward and backward lists correctly`, () => {
    const forwardResult = (binary().convertForward([1.23, 'test']) as SuccessResult<string>).result;
    assert(binary().convertBackward(forwardResult)).to.haveProperties({
      result: arrayThat().haveExactElements([1.23, 'test']),
    });
  });

  should(`convert forward and backward objects correctly`, () => {
    const forwardResult = (binary().convertForward({a: 1, b: 2}) as SuccessResult<string>).result;
    assert(binary().convertBackward(forwardResult)).to.haveProperties({
      result: objectThat().haveProperties({a: 1, b: 2}),
    });
  });
});

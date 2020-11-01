import { assert, objectThat, should, test } from 'gs-testing';

import { SuccessResult } from '../../base/result';

import { BinaryData } from './binary-data';
import { SerializableConverter } from './serializable-converter';


test(`grammar.binary.SerializableConverter`, init => {
  const _ = init(() => {
    const converter = new SerializableConverter();
    return {converter};
  });

  should(`convert forward and backward undefined correctly`, () => {
    const forwardResult = (_.converter.convertForward(undefined) as SuccessResult<Uint8Array>)
        .result;
    assert(_.converter.convertBackward(forwardResult)).to.haveProperties({
      result: objectThat<BinaryData<unknown>>().haveProperties({data: undefined}),
    });
  });

  should(`convert forward and backward null correctly`, () => {
    const forwardResult = (_.converter.convertForward(null) as SuccessResult<Uint8Array>).result;
    assert(_.converter.convertBackward(forwardResult)).to.haveProperties({
      result: objectThat<BinaryData<unknown>>().haveProperties({data: null}),
    });
  });

  should(`convert forward and backward boolean correctly`, () => {
    const forwardResult = (_.converter.convertForward(true) as SuccessResult<Uint8Array>).result;
    assert(_.converter.convertBackward(forwardResult)).to.haveProperties({
      result: objectThat<BinaryData<unknown>>().haveProperties({data: true}),
    });
  });

  should(`convert forward and backward number correctly`, () => {
    const forwardResult = (_.converter.convertForward(1.234) as SuccessResult<Uint8Array>).result;
    assert(_.converter.convertBackward(forwardResult)).to.haveProperties({
      result: objectThat<BinaryData<unknown>>().haveProperties({data: 1.234}),
    });
  });

  should(`convert forward and backward string correctly`, () => {
    const text = `Hello W0rld 🤣`;
    const forwardResult = (_.converter.convertForward(text) as SuccessResult<Uint8Array>).result;
    assert(_.converter.convertBackward(forwardResult)).to.haveProperties({
      result: objectThat<BinaryData<unknown>>().haveProperties({data: text}),
    });
  });
});

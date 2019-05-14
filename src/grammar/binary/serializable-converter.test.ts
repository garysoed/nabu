import { assert, match, setup, should, test } from '@gs-testing';
import { SuccessResult } from '../../base/result';
import { SerializableConverter } from './serializable-converter';

test('grammar.binary.SerializableConverter', () => {
  let converter: SerializableConverter;

  setup(() => {
    converter = new SerializableConverter();
  });

  should(`convert forward and backward undefined correctly`, () => {
    const forwardResult = (converter.convertForward(undefined) as SuccessResult<Uint8Array>).result;
    assert(converter.convertBackward(forwardResult)).to.haveProperties({
      result: match.anyObjectThat().haveProperties({data: undefined}),
    });
  });

  should(`convert forward and backward null correctly`, () => {
    const forwardResult = (converter.convertForward(null) as SuccessResult<Uint8Array>).result;
    assert(converter.convertBackward(forwardResult)).to.haveProperties({
      result: match.anyObjectThat().haveProperties({data: null}),
    });
  });

  should(`convert forward and backward boolean correctly`, () => {
    const forwardResult = (converter.convertForward(true) as SuccessResult<Uint8Array>).result;
    assert(converter.convertBackward(forwardResult)).to.haveProperties({
      result: match.anyObjectThat().haveProperties({data: true}),
    });
  });

  should(`convert forward and backward number correctly`, () => {
    const forwardResult = (converter.convertForward(1.234) as SuccessResult<Uint8Array>).result;
    assert(converter.convertBackward(forwardResult)).to.haveProperties({
      result: match.anyObjectThat().haveProperties({data: 1.234}),
    });
  });

  should(`convert forward and backward string correctly`, () => {
    const text = 'Hello W0rld 🤣';
    const forwardResult = (converter.convertForward(text) as SuccessResult<Uint8Array>).result;
    assert(converter.convertBackward(forwardResult)).to.haveProperties({
      result: match.anyObjectThat().haveProperties({data: text}),
    });
  });
});

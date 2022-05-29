import {assert, should, test} from 'gs-testing';
import {of} from 'rxjs';

import {Converter} from '../base/converter';
import {Result} from '../base/result';

import {mapForward} from './map-forward';


const TEST_CONVERTER: Converter<number, number> = {
  convertBackward(value: number): Result<number> {
    if (value > 10) {
      return {success: false};
    }

    return {result: value, success: true};
  },

  convertForward(input: number): Result<number> {
    return this.convertBackward(input);
  },
};

test('@nabu/src/rxjs/map-forward', () => {
  should('convert correctly', () => {
    assert(of(5).pipe(mapForward(TEST_CONVERTER))).to.emitWith(5);
  });

  should('throw error on failure by default', () => {
    assert(of(15).pipe(mapForward(TEST_CONVERTER))).to.emitErrorWithMessage(/cannot be converted/);
  });

  should('use the given failure handler on failure', () => {
    assert(of(15).pipe(mapForward(TEST_CONVERTER, v => of(v % 10)))).to.emitWith(5);
  });
});
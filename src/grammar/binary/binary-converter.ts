import { BinaryData } from './binary-data';
import { Result } from '../../base/result';

export interface BinaryConverter<T> {
  convertBackward(value: Uint8Array): Result<BinaryData<T>>;

  convertForward(value: T): Result<Uint8Array>;
}

import { Serializable } from '../base/serializable';

export function deepClone<S extends Serializable>(target: S): S {
  return JSON.parse(JSON.stringify(target));
}

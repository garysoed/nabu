import { ImmutableSet } from 'gs-tools/export/collect';
import { Converter } from '../base/converter';
import { Serializable } from '../base/serializable';
import { iterableConverter } from './iterable-converter';

export function setConverter<T>(
    itemConverter: Converter<T, Serializable>,
): Converter<ImmutableSet<T>, Serializable> {
  return iterableConverter(
      contents => ImmutableSet.of(contents),
      itemConverter,
  );
}

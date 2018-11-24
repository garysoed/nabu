import { ImmutableList } from 'gs-tools/export/collect';
import { Converter } from '../base/converter';
import { Serializable } from '../base/serializable';
import { iterableConverter } from './iterable-converter';

export function listConverter<T>(itemConverter: Converter<T, Serializable>):
    Converter<ImmutableList<T>, Serializable> {
  return iterableConverter(
      content => ImmutableList.of(content),
      itemConverter,
  );
}

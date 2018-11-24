import { ImmutableMap } from 'gs-tools/export/collect';
import { Converter } from '../base/converter';
import { Serializable } from '../base/serializable';
import { iterableConverter } from './iterable-converter';
import { tupleConverter } from './tuple-converter';

export function mapConverter<K, V>(
    keyConverter: Converter<K, Serializable>,
    valueConverter: Converter<V, Serializable>,
): Converter<ImmutableMap<K, V>, Serializable> {
  return iterableConverter(
      contents => ImmutableMap.of(contents),
      tupleConverter([keyConverter, valueConverter]),
  );
}

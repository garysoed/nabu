import { Serializable, SerializableObject } from '../../base/serializable';

export function render(serializable: Serializable): string {
  if (serializable === undefined) {
    return 'undefined';
  } else if (serializable === null) {
    return 'null';
  } else if (typeof serializable === 'boolean') {
    return renderBoolean(serializable);
  } else if (typeof serializable === 'number') {
    return `${serializable}`;
  } else if (typeof serializable === 'string') {
    return `'${serializable}'`;
  } else if (serializable instanceof Array) {
    return renderArray(serializable);
  } else {
    return renderObject(serializable);
  }
}

function renderArray(value: Serializable[]): string {
  return `[${value.map(item => render(item)).join(' ')}]`;
}

function renderBoolean(value: boolean): string {
  return value ? 'T' : 'F';
}

function renderObject(value: SerializableObject): string {
  const renderedItems = [];
  for (const key of Object.keys(value)) {
    renderedItems.push(`${key}: ${render(value[key])}`);
  }

  return `{${renderedItems.join(', ')}}`;
}

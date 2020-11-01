export function render(serializable: unknown): string {
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
  } else if (serializable instanceof Object) {
    return renderObject(serializable as Record<string, unknown>);
  } else {
    throw new Error(`Unsupported object: ${serializable}`);
  }
}

function renderArray(value: readonly unknown[]): string {
  return `[${value.map(item => render(item)).join(' ')}]`;
}

function renderBoolean(value: boolean): string {
  return value ? 'T' : 'F';
}

function renderObject<O extends Record<string, unknown>>(value: O): string {
  const renderedItems = [];
  for (const key of Object.keys(value)) {
    renderedItems.push(`${key}: ${render(value[key])}`);
  }

  return `{${renderedItems.join(', ')}}`;
}

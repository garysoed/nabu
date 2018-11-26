export enum DataType {
  UNDEFINED = 0,
  NULL,
  BOOLEAN,
  INT8,
  UINT8,
  INT16,
  UINT16,
  INT32,
  UINT32,
  FLOAT32,
  FLOAT64,
  STRING,
  LIST,
  LIST_ENTRY,
  OBJECT,
  OBJECT_ENTRY,
}

const NUMBER_SET = new Set<number>();
for (const key in DataType) {
  if (!DataType.hasOwnProperty(key)) {
    continue;
  }
  NUMBER_SET.add(Number.parseInt(key, 10));
}

export function isADataType(value: number): value is DataType {
  return NUMBER_SET.has(value);
}

interface SerializableObject {
  [key: string]: Serializable;
}

interface SerializableList extends Array<Serializable> { }

export type Serializable = SerializableObject|SerializableList|string|number|boolean|undefined|null;

export interface SerializableObject {
  [key: string]: Serializable;
}

export interface SerializableList extends Array<Serializable> { }

export type Serializable = SerializableObject|SerializableList|string|number|boolean|undefined|null;

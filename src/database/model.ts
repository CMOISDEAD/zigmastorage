export interface Entity {
  id: string;
  [key: string]: any;
}

export interface EntityCollection {
  [key: string]: Entity[];
}

export interface CollectionMethods<T extends Entity> {
  get: (id: string) => Promise<T | undefined>;
  getAll: () => Promise<T[]>;
  create: (entity: Omit<T, 'id'>) => Promise<void>;
  remove: (id: string) => Promise<void>;
}

/**
 * Represents a database where each key is a collection name 
 * and each value provides CRUD methods for that collection.
 */
export type Database<T extends EntityCollection> = {
  [K in keyof T]: CollectionMethods<T[K][number]>;
}

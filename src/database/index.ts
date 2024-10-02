import { v4 as uuidv4 } from 'uuid';
import { Adapter } from '../utils/io';
import type { Database, Entity, EntityCollection, CollectionMethods } from './model';

export async function createStore<T extends EntityCollection>(db_path: string, def: T): Promise<Database<T>> {
  const db = new Adapter(db_path);

  const database: Partial<Database<T>> = {};
  const collections: Array<keyof T> = Object.keys(def) as Array<keyof T>;

  collections.forEach((name) => {
    const methods: CollectionMethods<T[typeof name][number]> = {
      get: async (id: string) => {
        try {
          const data = await db.read<T>();
          if (!data || !data[name]) {
            return undefined
          }
          return data[name].find((entity: Entity) => entity.id === id);
        } catch (error) {
          console.error(error);
          return undefined;
        }
      },
      getAll: async () => {
        try {
          const data = await db.read<T>();
          if (!data || !data[name]) {
            return []
          }
          return data[name];
        } catch (error) {
          console.error(error);
          return [];
        }
      },
      create: async (entity: Omit<Entity, 'id'>) => {
        try {
          const id = uuidv4();
          const data = await db.read<T>();
          if (!data) return;
          if (!data[name]) data[name] = [] as unknown as T[keyof T];
          data[name].push({ id, ...entity } as T[typeof name][number]);
          await db.write(data);
        } catch (error) {
          console.error(error);
        }
      },
      remove: async (id: string) => {
        try {
          const data = await db.read<T>();
          if (!data || !data[name]) {
            throw new Error('Data not found');
          }
          const idx = data[name].findIndex((entity: Entity) => entity.id === id);
          if (idx === -1) throw new Error('Entity not found');
          data[name].splice(idx, 1);
          await db.write(data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    database[name] = methods;
  });

  return database as Database<T>;
}


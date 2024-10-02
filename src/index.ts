import { createStore } from "./database";

interface Post {
  id: string;
  title: string;
  content: string;
}

interface User {
  id: string;
  name: string;
}

type DataInterface = {
  posts: Post[];
  users: User[];
}

const db = await createStore<DataInterface>('db.json', { posts: [], users: [] });

console.log(await db.users.getAll())

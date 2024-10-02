import { createStore } from "../database";
import type { Database } from "../database/model";
import { Adapter } from "../utils/io";

interface User {
  id: string;
  name: string;
}

interface Post {
  id: string
  title: string;
  content: string
}

type DataInterface = {
  users: User[]
  posts: Post[]
}

describe("Database", () => {
  let db: Database<DataInterface>;
  const adapter = new Adapter('db.json');
  const defaultData: DataInterface = {
    users: [],
    posts: []
  }

  beforeEach(async () => {
    await adapter.write(defaultData);
    db = await createStore<DataInterface>('db.json', defaultData);
  })

  test('should return empty arrays for posts and users if database is new', async () => {
    const posts = await db.posts.getAll();
    const users = await db.users.getAll();
    expect(posts).toEqual([]);
    expect(users).toEqual([]);
  });

  test("should get all users (initially empty)", async () => {
    const users = await db.users.getAll();
    expect(users).toHaveLength(0);
    expect(users).toEqual([]);
  })
  test("should create a new user", async () => {
    await db.users.create({ name: 'John Doe' });
    const users = await db.users.getAll();
    expect(users).toHaveLength(1);
    expect(users[0].name).toBe('John Doe');
  })
  test("should remove a user", async () => {
    await db.users.create({ name: 'John Doe' });
    const users = await db.users.getAll();
    expect(users).toHaveLength(1);
    const { id } = users[0];
    await db.users.remove(id);
    const updatedUsers = await db.users.getAll();
    expect(updatedUsers).toHaveLength(0);
    expect(updatedUsers).toEqual([]);
  })

  test("should get all posts (initially empty)", async () => {
    const posts = await db.posts.getAll();
    expect(posts).toHaveLength(0);
    expect(posts).toEqual([]);
  })
  test("should create a new post", async () => {
    const post = { title: 'A new post', content: 'hello content' }
    await db.posts.create(post);
    const posts = await db.posts.getAll();
    expect(posts).toHaveLength(1);
    expect(posts[0].title).toBe(post.title);
    expect(posts[0].content).toBe(post.content);
  })
  test("should remove a post", async () => {
    await db.posts.create({ title: 'remove me', content: "hello content" });
    const posts = await db.posts.getAll();
    expect(posts).toHaveLength(1);
    const { id } = posts[0];
    await db.posts.remove(id);
    const updated = await db.posts.getAll();
    expect(updated).toHaveLength(0);
    expect(updated).toEqual([]);
  })
})

import fs from "node:fs/promises"
import { resolve } from "path";

export class Adapter {
  path: string;

  constructor(path: string) {
    this.path = resolve(process.cwd(), "src", "database", path)
    // this.path = resolve(__dirname, "../", "database", path);
  }

  async read<T>(): Promise<T | null> {
    try {
      const data: string = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(data) as T;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async write(data: any): Promise<void> {
    try {
      await fs.writeFile(this.path, JSON.stringify(data, null, 2))
    } catch (error) {
      console.error(error);
    }
  }

  async exists(): Promise<boolean> {
    try {
      await fs.access(this.path);
      return true;
    } catch (e) {
      return false;
    }
  }
}

// save an item in to localStorage
const save = (key: string, value: any) => {
  const content = JSON.stringify(value);
  window.localStorage.setItem(key, content);
  return value;
};

// return an item from localStorage
const get = (key: string) => {
  const value = window.localStorage.getItem(key);
  if (!value) throw new Error(`no item ${key} found on localStorage`);
  return JSON.parse(value);
};

// remove an item from localStorage
const remove = (key: string) => {
  if (!window.localStorage.getItem(key)) throw new Error("item dont exist");
  window.localStorage.removeItem(key);
};

// remove all items from localStorage
const clear = () => {
  window.localStorage.clear();
};

const isArray = (list: any) => {
  if (!Array.isArray(list)) throw new Error(`is not an array`);
};

// push a value to an item on localStorage
const push = (key: string, value: any) => {
  const list = get(key);
  isArray(list);
  list.push(value);
  save(key, value);
};

// remove an specific value by index from an item in localStorage
const popByIndex = (key: string, index: number) => {
  const list = get(key);
  isArray(list);
  list.filter((_: any, i: number) => i !== index);
  save(key, list);
};

export default {
  get,
  save,
  remove,
  push,
  popByIndex,
  clear,
};

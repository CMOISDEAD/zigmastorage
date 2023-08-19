// save an item in to localStorage
const save = (key: string, value: any) => {
  const content = JSON.stringify(value);
  window.localStorage.setItem(key, content);
  return value;
};

// return an item from localStorage
const get = (key: string) => {
  const value = window.localStorage.getItem(key);
  if (!value) throw new Error("no item with that name");
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

export default {
  get,
  save,
  remove,
  clear,
};

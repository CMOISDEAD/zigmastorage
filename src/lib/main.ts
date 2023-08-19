// local JSON database on localStorage.
// save/update/delete content.
//

// save a value in to the localStorage
const save = (key: string, value: any): boolean => {
  const content = JSON.stringify(value);
  window.localStorage.setItem(key, content);
  return true;
};

// get a value from the localStorage
const get = (key: string) => {
  const value = window.localStorage.getItem(key) || "";
  return JSON.parse(value);
};

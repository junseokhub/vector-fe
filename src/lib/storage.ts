const isBrowser = typeof window !== "undefined";

export const storage = {
  get: (key: string) => (isBrowser ? localStorage.getItem(key) : null),
  set: (key: string, value: string) => isBrowser && localStorage.setItem(key, value),
  remove: (key: string) => isBrowser && localStorage.removeItem(key),
};
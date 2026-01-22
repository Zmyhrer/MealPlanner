export const storage = {
  get: <T>(key: string): T | null => {
    if (typeof window === "undefined") return null;

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    } catch {
      return null;
    }
  },

  set: <T>(key: string, value: T) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  },

  remove: (key: string) => {
    try {
      window.localStorage.removeItem(key);
    } catch {}
  },

  clear: () => {
    try {
      window.localStorage.clear();
    } catch {}
  },
};

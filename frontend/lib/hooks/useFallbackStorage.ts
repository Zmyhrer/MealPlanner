"use client";

import { useState, useEffect, useCallback } from "react";

const memoryStorage = new Map<string, string>();

export function useFallbackStorage<T>(
  key: string,
  initialValue: T,
  options?: {
    serializer?: (value: T) => string;
    deserializer?: (value: string) => T;
  }
) {
  const { serializer = JSON.stringify, deserializer = JSON.parse } =
    options || {};

  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        setStoredValue(deserializer(item));
        return;
      }
    } catch {}

    const memoryItem = memoryStorage.get(key);
    if (memoryItem !== undefined) {
      setStoredValue(deserializer(memoryItem));
    }
  }, [key, deserializer]);

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      setStoredValue((prev) => {
        const next = value instanceof Function ? value(prev) : value;

        try {
          window.localStorage.setItem(key, serializer(next));
        } catch {
          memoryStorage.set(key, serializer(next));
        }

        return next;
      });
    },
    [key, serializer]
  );

  const removeValue = useCallback(() => {
    setStoredValue(initialValue);
    try {
      window.localStorage.removeItem(key);
    } catch {
      memoryStorage.delete(key);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue] as const;
}

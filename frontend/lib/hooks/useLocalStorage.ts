"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options?: {
    serializer?: (value: T) => string;
    deserializer?: (value: string) => T;
    onError?: (error: Error) => void;
  }
) {
  const {
    serializer = JSON.stringify,
    deserializer = JSON.parse,
    onError = (error: Error) => {
      console.error(`[useLocalStorage] Error for key "${key}":`, error);
    },
  } = options || {};

  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const hasHydrated = useRef(false);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        setStoredValue(deserializer(item));
      }
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      onError(err);
    } finally {
      hasHydrated.current = true;
    }
  }, [key, deserializer, onError]);

  useEffect(() => {
    if (!hasHydrated.current) return;

    try {
      window.localStorage.setItem(key, serializer(storedValue));
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      onError(err);
    }
  }, [key, storedValue, serializer, onError]);

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    setStoredValue((prev) => (value instanceof Function ? value(prev) : value));
  }, []);

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      onError(err);
    }
  }, [key, initialValue, onError]);

  return [storedValue, setValue, removeValue] as const;
}

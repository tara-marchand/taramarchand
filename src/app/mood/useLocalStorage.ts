'use client';

import { useState, useEffect } from 'react';

export const useLocalStorage = (key: string, value: string | null) => {
  const [state, setState] = useState<string | null>(value);
  const localStorageValue = window.localStorage.getItem(key);

  useEffect(() => {
    if (localStorageValue) {
      setState(JSON.parse(localStorageValue));
    } else {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, localStorageValue, value]);

  const update = (to: string) => {
    setState(to);
    window.localStorage.setItem(key, JSON.stringify(to));
  };

  const remove = () => {
    setState(null);
    window.localStorage.removeItem(key);
  };

  return { state, remove, update };
};

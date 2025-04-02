import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  // State to store the value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Check if window is available (in case of SSR or other environments)
      if (typeof window !== "undefined") {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      }
      return initialValue;
    } catch (error) {
      console.error("Error reading from localStorage", error);
      return initialValue;
    }
  });

  // Update localStorage whenever the value changes
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      }
    } catch (error) {
      console.error("Error writing to localStorage", error);
    }
  }, [key, storedValue]);

  // Return the stored value and setter function
  return [storedValue, setStoredValue];
}

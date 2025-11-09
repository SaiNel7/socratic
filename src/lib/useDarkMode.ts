import { useEffect, useState } from 'react';

export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage first, default to light mode
    const stored = localStorage.getItem('darkMode');
    if (stored !== null) {
      return stored === 'true';
    }
    return false; // Default to light mode
  });

  useEffect(() => {
    // Update HTML class and localStorage when dark mode changes
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
      console.log('Dark mode enabled');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
      console.log('Dark mode disabled');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return { isDarkMode, toggleDarkMode };
}


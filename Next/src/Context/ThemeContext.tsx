'use client';

import { createContext, useState, ReactNode, FC } from 'react';

// Define the type for the context value
interface ThemeContextType {
  mode: string;
  toggle: () => void;
}

// Create the context with a default value (can be undefined)
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

// Define the ThemeProvider component
const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<string>('light');

  const toggle = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggle }}>
      <div className={`theme ${mode}`}>{children}</div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

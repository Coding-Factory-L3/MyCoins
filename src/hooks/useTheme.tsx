// ThemeContext.tsx
import React, {createContext, useContext, useState, ReactNode} from 'react';

type Theme = 'light' | 'dark';

interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  tertiary: string;
  text: string;
  error?: string;
  switch?: string;
  textButton?: string;
  bottomTab: {
    background: string;
    active: string;
    inactive: string;
    shadow?: string;
  };
}

interface ThemeConfig {
  colors: {
    light: ThemeColors;
    dark: ThemeColors;
  };
}

interface ThemeContextProps {
  theme: Theme;
  currentTheme: ThemeColors;
  toggleTheme: () => void;
}

const defaultThemeConfig: ThemeConfig = {
  colors: {
    light: {
      primary: '#908DB8',
      secondary: '#D0D2E1',
      background: '#EBECF1',
      tertiary: '#A9A9C5',
      text: '#1C1C1C',
      error: '#FF0000',
      switch: '#1C1C1C',
      textButton: '#EBECF1',

      bottomTab: {
        background: '#EBECF1',
        active: '#EBECF1',
        inactive: '#908DB8',
        shadow: '#333252',
      },
    },
    dark: {
      primary: '#2B2B2B',
      secondary: '#3B3B3B',
      background: '#1C1C1C',
      tertiary: '#4B4B4B',
      text: '#EBECF1',
      error: '#FF0000',
      switch: '#EBECF1',
      textButton: '#EBECF1',

      bottomTab: {
        background: '#1C1C1C',
        active: '#EBECF1',
        inactive: '#4B4B4B',
        shadow: '#EBECF1',
      },
    },
  },
};

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
  const [theme, setTheme] = useState<Theme>('light'); // Set the initial theme here
  const [currentTheme, setCurrentTheme] = useState<ThemeColors>(
    defaultThemeConfig.colors.light,
  );

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    setCurrentTheme(defaultThemeConfig.colors[newTheme]);
  };

  return (
    <ThemeContext.Provider value={{theme, currentTheme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

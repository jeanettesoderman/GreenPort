import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });
  
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = (event) => {
    setIsTransitioning(true);
    
    // Get click position for radial transition
    const x = event?.clientX || window.innerWidth / 2;
    const y = event?.clientY || window.innerHeight / 2;
    
    // Create radial mask transition
    document.documentElement.style.setProperty('--transition-x', `${x}px`);
    document.documentElement.style.setProperty('--transition-y', `${y}px`);
    
    // Toggle theme after a brief delay
    setTimeout(() => {
      setTheme(prev => prev === 'dark' ? 'light' : 'dark');
      setTimeout(() => setIsTransitioning(false), 800);
    }, 50);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isTransitioning }}>
      {children}
    </ThemeContext.Provider>
  );
};

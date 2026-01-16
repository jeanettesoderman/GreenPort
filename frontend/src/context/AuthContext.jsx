import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const savedUser = localStorage.getItem('greenport_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  // Guest Demo Login
  const loginAsGuest = () => {
    const guestUser = {
      id: 'guest-001',
      name: 'Demo Client',
      email: 'demo@greenport.io',
      type: 'guest',
      loginTime: new Date().toISOString()
    };
    setUser(guestUser);
    setIsAuthenticated(true);
    localStorage.setItem('greenport_user', JSON.stringify(guestUser));
  };

  // Regular Login (Technical Demo)
  const login = (email, password) => {
    // In a real app, this would call an API
    // For demo purposes, accept any credentials
    const newUser = {
      id: `user-${Date.now()}`,
      name: email.split('@')[0],
      email: email,
      type: 'registered',
      loginTime: new Date().toISOString()
    };
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('greenport_user', JSON.stringify(newUser));
    return { success: true };
  };

  // Create Account (Technical Demo)
  const createAccount = (name, email, password) => {
    // In a real app, this would call an API
    // For demo purposes, just create the account
    const newUser = {
      id: `user-${Date.now()}`,
      name: name,
      email: email,
      type: 'registered',
      loginTime: new Date().toISOString()
    };
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('greenport_user', JSON.stringify(newUser));
    return { success: true };
  };

  // Logout
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('greenport_user');
  };

  const value = {
    user,
    isAuthenticated,
    loginAsGuest,
    login,
    createAccount,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getUser, removeUser, setUser } from '../config/api';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  setAuthUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setAuthUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = getUser();
    if (savedUser) {
      setAuthUser(savedUser);
    }
    setLoading(false);
  }, []);

  const handleSetAuthUser = (newUser: User | null) => {
    if (newUser) {
      setUser(newUser);
      setAuthUser(newUser);
    } else {
      removeUser();
      setAuthUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, setAuthUser: handleSetAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


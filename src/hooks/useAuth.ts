import { useContext } from 'react';
import { AuthContext } from '../types/AuthContextType';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be within AuthProvider');
  return context;
};

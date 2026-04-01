import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUserProfile } from '../api/authApi';

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
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [role, setRole] = useState(localStorage.getItem('role') || null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Verify the user profile on application load if a token exists
  useEffect(() => {
    const verifyUser = async () => {
      if (token) {
        try {
          const userData = await getUserProfile();
          setUser(userData);
          setRole(userData.role);
          localStorage.setItem('role', userData.role);
        } catch (error) {
          // Error is handled by Axios interceptor (logout/redirect)
          console.error('Failed to verify user:', error);
          logout();
        }
      }
      setLoading(false);
    };

    verifyUser();
  }, [token]);

  /**
   * Log in the user and store their state
   */
  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    setRole(userData.role);
    
    localStorage.setItem('token', authToken);
    localStorage.setItem('role', userData.role);
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Redirect based on role
    if (userData.role === 'admin' || userData.role === 'ADMIN') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  /**
   * Log out the user and clear state
   */
  const logout = () => {
    setUser(null);
    setToken(null);
    setRole(null);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const value = {
    user,
    token,
    role,
    loading,
    login,
    logout,
    isAdmin: role === 'admin' || localStorage.getItem('role') === 'admin' || role === 'ADMIN' || localStorage.getItem('role') === 'ADMIN',
    updateUser: (newData) => setUser(prev => ({ ...prev, ...newData }))
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

import React, { createContext, useState, useCallback, useEffect } from 'react';
import { loginUser, registerUser, getCurrentUser as apiGetCurrentUser } from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('authToken') || null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await loginUser({ username, password });

      const newToken = response.access_token;
      localStorage.setItem('authToken', newToken);
      setToken(newToken);

      // Load user profile, but don't fail if it errors
      try {
        const userResponse = await apiGetCurrentUser();
        setUser(userResponse);
      } catch (err) {
        console.warn('Could not load user profile:', err.message);
        // Continue anyway - user is authenticated
      }

      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (name, surname, username, password) => {
    setLoading(true);
    setError(null);
    try {
      await registerUser({
        name,
        surname,
        username,
        password,
      });

      const response = await login(username, password);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [login]);

  const getCurrentUser = useCallback(async () => {
    if (!token) return null;

    setLoading(true);
    try {
      const userResponse = await apiGetCurrentUser();
      setUser(userResponse);
      return userResponse;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [token]);

  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    setToken(null);
    setUser(null);
    setError(null);
  }, []);

  // Initialize user on mount or when token changes if needed
  useEffect(() => {
    if (token && !user) {
      getCurrentUser();
    }
  }, [token, user, getCurrentUser]);

  const value = {
    token,
    user,
    loading,
    error,
    register,
    login,
    logout,
    getCurrentUser,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

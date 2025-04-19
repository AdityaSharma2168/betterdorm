import React, { createContext, useContext, useState, useEffect } from 'react';
import { useApi } from './ApiContext';

// Define the User type
type User = {
  id: string;
  email: string;
  name: string;
  university?: string;
  isVerified: boolean;
  studentId?: string;
};

// Define the AuthContextType
type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  register: (email: string, password: string, name: string, university: string) => Promise<void>;
  logout: () => void;
  verifyEmail: (code: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  verifyTwoFactor: (code: string) => Promise<void>;
};

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  verifyEmail: async () => {},
  forgotPassword: async () => {},
  resetPassword: async () => {},
  verifyTwoFactor: async () => {},
});

// Create the AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const api = useApi();

  // Check for existing session on component mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
      }
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string, rememberMe = false) => {
    setLoading(true);
    setError(null);
    
    try {
      // Validate university email
      if (!email.endsWith('@sjsu.edu')) {
        throw new Error('Please use your university email address (@sjsu.edu)');
      }
      
      // Call the backend API
      const response = await api.post<{ user: User, token: string }>('auth/login', { 
        email, 
        password 
      });
      
      if (response.status === 'error' || !response.data) {
        throw new Error(response.message || 'Login failed');
      }
      
      const { user: userData, token } = response.data;
      setUser(userData);
      
      // Store token and user data if remember me is checked
      if (rememberMe) {
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(userData));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to login');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (email: string, password: string, name: string, university: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Validate university email
      if (!email.endsWith('@sjsu.edu')) {
        throw new Error('Please use your university email address (@sjsu.edu)');
      }
      
      // Validate password strength
      if (password.length < 12) {
        throw new Error('Password must be at least 12 characters long');
      }
      
      if (!/[A-Z]/.test(password)) {
        throw new Error('Password must contain at least one uppercase letter');
      }
      
      if (!/[0-9]/.test(password)) {
        throw new Error('Password must contain at least one number');
      }
      
      if (!/[^A-Za-z0-9]/.test(password)) {
        throw new Error('Password must contain at least one special character');
      }
      
      // Call the backend API
      const response = await api.post<{ user: User, token: string }>('auth/register', {
        email,
        password,
        name,
        university
      });
      
      if (response.status === 'error' || !response.data) {
        throw new Error(response.message || 'Registration failed');
      }
      
      const { user: userData, token } = response.data;
      setUser(userData);
      
      // Store token and user data
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to register');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
  };

  // Email verification function
  const verifyEmail = async (code: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Call the backend API
      const response = await api.post<{ verified: boolean }>('auth/verify-email', { code });
      
      if (response.status === 'error' || !response.data) {
        throw new Error(response.message || 'Failed to verify email');
      }
      
      if (user) {
        const verifiedUser = {
          ...user,
          isVerified: true,
        };
        setUser(verifiedUser);
        localStorage.setItem('user', JSON.stringify(verifiedUser));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to verify email');
    } finally {
      setLoading(false);
    }
  };
  
  // Password reset functions
  const forgotPassword = async (email: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Validate university email
      if (!email.endsWith('@sjsu.edu')) {
        throw new Error('Please use your university email address (@sjsu.edu)');
      }
      
      // Call the backend API
      const response = await api.post<{ success: boolean }>('auth/forgot-password', { email });
      
      if (response.status === 'error') {
        throw new Error(response.message || 'Failed to send password reset email');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send password reset email');
    } finally {
      setLoading(false);
    }
  };
  
  const resetPassword = async (token: string, newPassword: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Validate password strength
      if (newPassword.length < 12) {
        throw new Error('Password must be at least 12 characters long');
      }
      
      if (!/[A-Z]/.test(newPassword)) {
        throw new Error('Password must contain at least one uppercase letter');
      }
      
      if (!/[0-9]/.test(newPassword)) {
        throw new Error('Password must contain at least one number');
      }
      
      if (!/[^A-Za-z0-9]/.test(newPassword)) {
        throw new Error('Password must contain at least one special character');
      }
      
      // Call the backend API
      const response = await api.post<{ success: boolean }>(`auth/reset-password/${token}`, { 
        password: newPassword 
      });
      
      if (response.status === 'error') {
        throw new Error(response.message || 'Failed to reset password');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };
  
  // Two-factor authentication verification
  const verifyTwoFactor = async (code: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Call the backend API
      const response = await api.post<{ success: boolean }>('auth/verify-two-factor', { code });
      
      if (response.status === 'error') {
        throw new Error(response.message || 'Failed to verify 2FA code');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to verify 2FA code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        verifyEmail,
        forgotPassword,
        resetPassword,
        verifyTwoFactor,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
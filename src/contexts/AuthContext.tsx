import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the User type
type User = {
  id: string;
  email: string;
  name: string;
  university: string;
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

// Mock user data for demonstration
const MOCK_USER: User = {
  id: '1',
  email: 'student@sjsu.edu',
  name: 'John Doe',
  university: 'San Jose State University',
  isVerified: true,
};

// Create the AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing session on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('user');
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
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, always return the mock user
      setUser(MOCK_USER);
      
      if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(MOCK_USER));
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
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, create a new user based on the mock user
      const newUser = {
        ...MOCK_USER,
        email,
        name,
        university,
        isVerified: false,
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
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
  };

  // Email verification function
  const verifyEmail = async (code: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (code === '123456') {
        if (user) {
          const verifiedUser = {
            ...user,
            isVerified: true,
          };
          setUser(verifiedUser);
          localStorage.setItem('user', JSON.stringify(verifiedUser));
        }
      } else {
        throw new Error('Invalid verification code');
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
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
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
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
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
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (code !== '123456') {
        throw new Error('Invalid 2FA code');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to verify 2FA code');
    } finally {
      setLoading(false);
    }
  };

  // Create the context value
  const contextValue = {
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
  };

  // Return the provider
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
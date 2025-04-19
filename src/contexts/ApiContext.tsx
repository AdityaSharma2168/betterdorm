import React, { createContext, useContext, ReactNode, useState } from 'react';

// API base URL from environment variable or default
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

// Types for API responses
interface ApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
}

// Types for API context
interface ApiContextType {
  apiUrl: string;
  get: <T>(endpoint: string) => Promise<ApiResponse<T>>;
  post: <T>(endpoint: string, data: any) => Promise<ApiResponse<T>>;
  put: <T>(endpoint: string, data: any) => Promise<ApiResponse<T>>;
  delete: <T>(endpoint: string) => Promise<ApiResponse<T>>;
  isLoading: boolean;
}

// Create the context
const ApiContext = createContext<ApiContextType | undefined>(undefined);

// Provider component
export const ApiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  // Helper to get auth token from localStorage
  const getAuthToken = () => localStorage.getItem('authToken');

  // Base headers for API requests
  const getHeaders = () => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  };

  // Generic fetch function with error handling
  const fetchApi = async <T,>(
    endpoint: string,
    options: RequestInit
  ): Promise<ApiResponse<T>> => {
    try {
      setIsLoading(true);
      const url = `${API_URL}/${endpoint.startsWith('/') ? endpoint.slice(1) : endpoint}`;
      
      const response = await fetch(url, {
        ...options,
        headers: getHeaders(),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return {
          status: 'error',
          message: data.message || 'An error occurred',
        };
      }
      
      return {
        status: 'success',
        data: data.data || data,
      };
    } catch (error) {
      console.error('API error:', error);
      return {
        status: 'error',
        message: error instanceof Error ? error.message : 'An unknown error occurred',
      };
    } finally {
      setIsLoading(false);
    }
  };

  // HTTP methods
  const get = <T,>(endpoint: string) => 
    fetchApi<T>(endpoint, { method: 'GET' });
  
  const post = <T,>(endpoint: string, data: any) => 
    fetchApi<T>(endpoint, { 
      method: 'POST',
      body: JSON.stringify(data),
    });
  
  const put = <T,>(endpoint: string, data: any) => 
    fetchApi<T>(endpoint, { 
      method: 'PUT',
      body: JSON.stringify(data),
    });
  
  const del = <T,>(endpoint: string) => 
    fetchApi<T>(endpoint, { method: 'DELETE' });

  // Context value
  const value = {
    apiUrl: API_URL,
    get,
    post,
    put,
    delete: del,
    isLoading,
  };

  return (
    <ApiContext.Provider value={value}>
      {children}
    </ApiContext.Provider>
  );
};

// Hook for using the API context
export const useApi = () => {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};

export default ApiContext; 
import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Building, ArrowLeft } from 'lucide-react';

const Login: React.FC = () => {
  const { user, login, loading, error } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');

  // If user is already logged in, redirect to home page
  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!showTwoFactor) {
      try {
        await login(email, password, rememberMe);
        // For demo purposes, we'll show the 2FA screen
        setShowTwoFactor(true);
      } catch (err) {
        // Error is handled by the context
      }
    } else {
      // In a real app, we would verify the 2FA code here
      // For demo, we'll just navigate to home if the code is 123456
      if (twoFactorCode === '123456') {
        navigate('/');
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <div className="absolute left-4 top-4">
        <Link to="/" className="flex items-center text-navy-800 hover:text-primary-600 transition-colors">
          <ArrowLeft className="h-5 w-5 mr-1" />
          <span>Back to Home</span>
        </Link>
      </div>
      <div className="mx-auto flex w-full max-w-md flex-col justify-center px-4 py-12 sm:px-6 md:w-full lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link to="/" className="flex items-center justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 text-white">
              <Building className="h-8 w-8" />
            </div>
          </Link>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-navy-900">
            {showTwoFactor ? 'Two-factor Authentication' : 'Sign in to your account'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {showTwoFactor 
              ? 'Enter the verification code sent to your email' 
              : 'Welcome back! Please enter your credentials to continue'}
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="rounded-lg bg-white px-4 py-8 shadow sm:px-10">
            {showTwoFactor ? (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="twoFactorCode" className="block text-sm font-medium text-navy-800">
                    Verification Code
                  </label>
                  <div className="mt-1">
                    <input
                      id="twoFactorCode"
                      name="twoFactorCode"
                      type="text"
                      required
                      value={twoFactorCode}
                      onChange={(e) => setTwoFactorCode(e.target.value)}
                      className="input"
                      placeholder="123456"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <button
                    type="button"
                    className="btn-outline flex items-center text-sm"
                    onClick={() => setShowTwoFactor(false)}
                  >
                    <ArrowLeft className="mr-1 h-4 w-4" />
                    Back
                  </button>
                  <span className="flex-1"></span>
                  <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? 'Verifying...' : 'Verify'}
                  </button>
                </div>
              </form>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-navy-800">
                    University Email
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input"
                      placeholder="student@sjsu.edu"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-navy-800">
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <Link to="/forgot-password" className="font-medium text-primary-600 hover:text-primary-500">
                      Forgot your password?
                    </Link>
                  </div>
                </div>

                {error && (
                  <div className="rounded-md bg-red-50 p-4">
                    <div className="flex">
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">Error</h3>
                        <div className="mt-2 text-sm text-red-700">
                          <p>{error}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <button
                    type="submit"
                    className="btn-primary w-full"
                    disabled={loading}
                  >
                    {loading ? 'Signing in...' : 'Sign in'}
                  </button>
                </div>
              </form>
            )}
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
              Sign up now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
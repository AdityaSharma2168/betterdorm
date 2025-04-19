import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building, ArrowLeft, Send } from 'lucide-react';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // In a real application, you would call your API here
      // For demo purposes, we'll simulate a successful API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      setSuccess(true);
    } catch (err) {
      setError('Failed to send password reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Back button */}
      <div className= "absolute left-4 top-4">
        <Link to="/login" className="flex items-center text-navy-800 hover:text-primary-600 transition-colors">
          <ArrowLeft className="h-5 w-5 mr-1" />
          <span>Back to Login</span>
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
            Forgot your password?
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your university email and we'll send you a link to reset your password
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="rounded-lg bg-white px-4 py-8 shadow sm:px-10">
            {success ? (
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <Send className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-navy-900">Check your email</h3>
                <p className="mt-2 text-sm text-gray-600">
                  We've sent a password reset link to {email}
                </p>
                <div className="mt-6">
                  <Link to="/login" className="btn-primary w-full">
                    Return to login
                  </Link>
                </div>
              </div>
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
                    {loading ? 'Sending...' : 'Send reset link'}
                  </button>
                </div>
              </form>
            )}
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Remember your password?{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
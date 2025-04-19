import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Building, Check, X, ArrowLeft } from 'lucide-react';

const Register: React.FC = () => {
  const { user, register, loading, error } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [university, setUniversity] = useState('San Jose State University');
  const [step, setStep] = useState(1);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  // Password strength check
  const hasMinLength = password.length >= 12;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const passwordsMatch = password === confirmPassword;
  const isValidEmail = email.endsWith('@sjsu.edu');
  
  // If user is already logged in, redirect to home page
  if (user) {
    return <Navigate to="/" replace />;
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      if (isValidEmail) {
        setStep(2);
      }
    } else if (step === 2) {
      if (hasMinLength && hasUppercase && hasNumber && hasSpecial && passwordsMatch) {
        setStep(3);
      }
    } else if (step === 3) {
      if (agreedToTerms) {
        try {
          await register(email, password, name, university);
          navigate('/');
        } catch (err) {
          // Error is handled by the context
        }
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
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Step {step} of 3: {step === 1 ? 'University Details' : step === 2 ? 'Create Password' : 'Personal Information'}
          </p>
        </div>
        
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="rounded-lg bg-white px-4 py-8 shadow sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {step === 1 && (
                <>
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
                        className={`input ${email && !isValidEmail ? 'border-red-500' : ''}`}
                        placeholder="student@sjsu.edu"
                      />
                    </div>
                    {email && !isValidEmail && (
                      <p className="mt-2 text-sm text-red-600">
                        Please use your university email address (@sjsu.edu)
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="university" className="block text-sm font-medium text-navy-800">
                      Select Your University
                    </label>
                    <select
                      id="university"
                      name="university"
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                      className="select mt-1"
                    >
                      <option value="San Jose State University">San Jose State University</option>
                      <option value="Santa Clara University">Santa Clara University</option>
                      <option value="Stanford University">Stanford University</option>
                    </select>
                  </div>
                </>
              )}
              
              {step === 2 && (
                <>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-navy-800">
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input"
                      />
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <p className="text-sm font-medium text-navy-800">Password Requirements:</p>
                      <div className="flex items-center">
                        {hasMinLength ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <X className="h-4 w-4 text-red-500" />
                        )}
                        <span className="ml-2 text-sm text-gray-700">At least 12 characters</span>
                      </div>
                      <div className="flex items-center">
                        {hasUppercase ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <X className="h-4 w-4 text-red-500" />
                        )}
                        <span className="ml-2 text-sm text-gray-700">At least 1 uppercase letter</span>
                      </div>
                      <div className="flex items-center">
                        {hasNumber ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <X className="h-4 w-4 text-red-500" />
                        )}
                        <span className="ml-2 text-sm text-gray-700">At least 1 number</span>
                      </div>
                      <div className="flex items-center">
                        {hasSpecial ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <X className="h-4 w-4 text-red-500" />
                        )}
                        <span className="ml-2 text-sm text-gray-700">At least 1 special character</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-navy-800">
                      Confirm Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`input ${confirmPassword && !passwordsMatch ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {confirmPassword && !passwordsMatch && (
                      <p className="mt-2 text-sm text-red-600">Passwords do not match</p>
                    )}
                  </div>
                </>
              )}
              
              {step === 3 && (
                <>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-navy-800">
                      Full Name
                    </label>
                    <div className="mt-1">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                      I agree to the{' '}
                      <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                </>
              )}
              
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
              
              <div className="flex justify-between">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="btn-outline"
                  >
                    Back
                  </button>
                )}
                <span className={step === 1 ? 'w-full' : ''}></span>
                <button
                  type="submit"
                  className={`btn-primary ${step === 1 ? 'w-full' : ''}`}
                  disabled={loading || (step === 1 && !isValidEmail) || (step === 3 && !agreedToTerms)}
                >
                  {step < 3 ? 'Continue' : loading ? 'Creating Account...' : 'Create Account'}
                </button>
              </div>
            </form>
          </div>
          
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
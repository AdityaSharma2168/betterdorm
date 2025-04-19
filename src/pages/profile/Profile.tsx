import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  User, 
  Lock, 
  CreditCard, 
  Bell, 
  MessageCircle, 
  Heart, 
  Settings,
  Building,
  Check
} from 'lucide-react';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');
  
  if (!user) {
    return null;
  }

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-navy-900">My Account</h1>
          <p className="mt-2 text-navy-600">
            Manage your profile, preferences, and account settings
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row md:space-x-6">
          {/* Sidebar */}
          <div className="mb-6 md:mb-0 md:w-1/4">
            <div className="sticky top-24">
              <div className="mb-6 rounded-lg bg-white p-6 shadow-soft">
                <div className="flex items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                    <User className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-navy-900">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span className="text-sm text-gray-600">Verified Student</span>
                  </div>
                  <div className="mt-1 flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span className="text-sm text-gray-600">Email Verified</span>
                  </div>
                </div>
              </div>
              
              <nav className="overflow-hidden rounded-lg bg-white shadow-soft">
                <button
                  onClick={() => setActiveTab('personal')}
                  className={`flex w-full items-center px-6 py-3 text-left transition ${
                    activeTab === 'personal'
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-navy-800 hover:bg-gray-50'
                  }`}
                >
                  <User className="mr-3 h-5 w-5" />
                  <span>Personal Information</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('security')}
                  className={`flex w-full items-center px-6 py-3 text-left transition ${
                    activeTab === 'security'
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-navy-800 hover:bg-gray-50'
                  }`}
                >
                  <Lock className="mr-3 h-5 w-5" />
                  <span>Security</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('payment')}
                  className={`flex w-full items-center px-6 py-3 text-left transition ${
                    activeTab === 'payment'
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-navy-800 hover:bg-gray-50'
                  }`}
                >
                  <CreditCard className="mr-3 h-5 w-5" />
                  <span>Payment Methods</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`flex w-full items-center px-6 py-3 text-left transition ${
                    activeTab === 'notifications'
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-navy-800 hover:bg-gray-50'
                  }`}
                >
                  <Bell className="mr-3 h-5 w-5" />
                  <span>Notifications</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('saved')}
                  className={`flex w-full items-center px-6 py-3 text-left transition ${
                    activeTab === 'saved'
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-navy-800 hover:bg-gray-50'
                  }`}
                >
                  <Heart className="mr-3 h-5 w-5" />
                  <span>Saved Listings</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('messages')}
                  className={`flex w-full items-center px-6 py-3 text-left transition ${
                    activeTab === 'messages'
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-navy-800 hover:bg-gray-50'
                  }`}
                >
                  <MessageCircle className="mr-3 h-5 w-5" />
                  <span>Messages</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`flex w-full items-center px-6 py-3 text-left transition ${
                    activeTab === 'settings'
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-navy-800 hover:bg-gray-50'
                  }`}
                >
                  <Settings className="mr-3 h-5 w-5" />
                  <span>Account Settings</span>
                </button>
              </nav>
            </div>
          </div>
          
          {/* Main content */}
          <div className="md:w-3/4">
            <div className="rounded-lg bg-white p-6 shadow-soft">
              {activeTab === 'personal' && (
                <div>
                  <h2 className="mb-6 text-xl font-semibold text-navy-900">Personal Information</h2>
                  
                  <div className="mb-6 grid gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-navy-700">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        className="input mt-1"
                        defaultValue="John"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-navy-700">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        className="input mt-1"
                        defaultValue="Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-navy-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="input mt-1"
                        defaultValue={user.email}
                        disabled
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        Your university email cannot be changed
                      </p>
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-navy-700">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        className="input mt-1"
                        defaultValue="(408) 555-1234"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="mb-2 font-medium text-navy-800">Student Verification</h3>
                    <div className="rounded-lg bg-green-50 p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <Check className="h-5 w-5 text-green-400" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-green-800">
                            Verified SJSU Student
                          </p>
                          <p className="mt-1 text-sm text-green-700">
                            Your student status has been verified with San Jose State University.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="mb-2 font-medium text-navy-800">University Information</h3>
                    <div className="rounded-lg border border-gray-200 p-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <p className="text-sm text-gray-500">University</p>
                          <p className="font-medium text-navy-800">San Jose State University</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Student ID</p>
                          <p className="font-medium text-navy-800">********12345</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Academic Year</p>
                          <p className="font-medium text-navy-800">Junior</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Graduation Year</p>
                          <p className="font-medium text-navy-800">2025</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button className="btn-primary">Save Changes</button>
                  </div>
                </div>
              )}
              
              {activeTab === 'security' && (
                <div>
                  <h2 className="mb-6 text-xl font-semibold text-navy-900">Security</h2>
                  
                  <div className="mb-6">
                    <h3 className="mb-4 font-medium text-navy-800">Change Password</h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-navy-700">
                          Current Password
                        </label>
                        <input
                          type="password"
                          id="currentPassword"
                          className="input mt-1"
                        />
                      </div>
                      <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-navy-700">
                          New Password
                        </label>
                        <input
                          type="password"
                          id="newPassword"
                          className="input mt-1"
                        />
                        <p className="mt-1 text-xs text-gray-500">
                          Minimum 12 characters with at least 1 uppercase letter, 1 number, and 1 special character
                        </p>
                      </div>
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-navy-700">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          id="confirmPassword"
                          className="input mt-1"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="mb-4 font-medium text-navy-800">Two-Factor Authentication</h3>
                    <div className="rounded-lg bg-green-50 p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <Check className="h-5 w-5 text-green-400" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-green-800">
                            Two-factor authentication is enabled
                          </p>
                          <p className="mt-1 text-sm text-green-700">
                            Your account is secured with email-based two-factor authentication.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="mb-4 font-medium text-navy-800">Sessions</h3>
                    <div className="rounded-lg border border-gray-200">
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-navy-800">Current Session</p>
                            <p className="text-sm text-gray-500">MacBook Pro • San Jose, CA • Right now</p>
                          </div>
                          <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                            Active
                          </span>
                        </div>
                      </div>
                      <div className="border-t border-gray-200 p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-navy-800">iPhone 13</p>
                            <p className="text-sm text-gray-500">iOS • San Jose, CA • 2 days ago</p>
                          </div>
                          <button className="text-sm font-medium text-red-600 hover:text-red-500">
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button className="btn-primary">Update Password</button>
                  </div>
                </div>
              )}
              
              {activeTab === 'saved' && (
                <div>
                  <h2 className="mb-6 text-xl font-semibold text-navy-900">Saved Listings</h2>
                  
                  <div className="space-y-4">
                    {/* Saved listing card */}
                    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                      <div className="flex flex-col sm:flex-row">
                        <div className="h-48 w-full sm:h-auto sm:w-48">
                          <img
                            src="https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800"
                            alt="Modern Studio Apartment"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col p-4">
                          <div className="mb-auto">
                            <div className="mb-1 flex items-center justify-between">
                              <h3 className="font-semibold text-navy-900">Modern Studio Apartment</h3>
                              <span className="font-bold text-primary-600">$1,800/mo</span>
                            </div>
                            <p className="mb-2 text-sm text-navy-600">0.3 miles to SJSU</p>
                            <div className="flex flex-wrap gap-2 text-xs">
                              <span className="rounded-full bg-gray-100 px-2 py-1 text-navy-700">Studio</span>
                              <span className="rounded-full bg-gray-100 px-2 py-1 text-navy-700">1 Bath</span>
                              <span className="rounded-full bg-gray-100 px-2 py-1 text-navy-700">450 sqft</span>
                            </div>
                          </div>
                          <div className="mt-4 flex items-center justify-between pt-2">
                            <button className="rounded px-2 py-1 text-sm font-medium text-red-600 hover:bg-red-50">
                              Remove
                            </button>
                            <button className="btn-primary text-sm">View Details</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Saved listing card */}
                    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                      <div className="flex flex-col sm:flex-row">
                        <div className="h-48 w-full sm:h-auto sm:w-48">
                          <img
                            src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800"
                            alt="2BR Apartment near Downtown"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col p-4">
                          <div className="mb-auto">
                            <div className="mb-1 flex items-center justify-between">
                              <h3 className="font-semibold text-navy-900">2BR Apartment near Downtown</h3>
                              <span className="font-bold text-primary-600">$2,400/mo</span>
                            </div>
                            <p className="mb-2 text-sm text-navy-600">0.5 miles to SJSU</p>
                            <div className="flex flex-wrap gap-2 text-xs">
                              <span className="rounded-full bg-gray-100 px-2 py-1 text-navy-700">2 Bed</span>
                              <span className="rounded-full bg-gray-100 px-2 py-1 text-navy-700">2 Bath</span>
                              <span className="rounded-full bg-gray-100 px-2 py-1 text-navy-700">850 sqft</span>
                            </div>
                          </div>
                          <div className="mt-4 flex items-center justify-between pt-2">
                            <button className="rounded px-2 py-1 text-sm font-medium text-red-600 hover:bg-red-50">
                              Remove
                            </button>
                            <button className="btn-primary text-sm">View Details</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'messages' && (
                <div>
                  <h2 className="mb-6 text-xl font-semibold text-navy-900">Messages</h2>
                  
                  <div className="mb-6 flex space-x-4">
                    <button className="rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-800">
                      All Messages
                    </button>
                    <button className="rounded-full bg-white px-4 py-2 text-sm font-medium text-navy-800 hover:bg-gray-100">
                      Landlords
                    </button>
                    <button className="rounded-full bg-white px-4 py-2 text-sm font-medium text-navy-800 hover:bg-gray-100">
                      Roommates
                    </button>
                  </div>
                  
                  <div className="overflow-hidden rounded-lg border border-gray-200">
                    {/* Message thread */}
                    <div className="border-b border-gray-200 bg-primary-50 p-4">
                      <div className="flex items-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-200 text-primary-600">
                          <Building className="h-5 w-5" />
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-navy-900">Campus Edge Properties</p>
                            <span className="text-xs text-gray-500">2 hours ago</span>
                          </div>
                          <p className="text-sm text-navy-600 line-clamp-1">
                            Thank you for your interest in our property. When would you like to schedule a viewing?
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Message thread */}
                    <div className="border-b border-gray-200 bg-white p-4 hover:bg-gray-50">
                      <div className="flex items-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-200 text-secondary-600">
                          <User className="h-5 w-5" />
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-navy-900">Alex Johnson</p>
                            <span className="text-xs text-gray-500">Yesterday</span>
                          </div>
                          <p className="text-sm text-navy-600 line-clamp-1">
                            Hey! I saw that we're a 90% match. Would you be interested in looking at apartments together?
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Message thread */}
                    <div className="border-b border-gray-200 bg-white p-4 hover:bg-gray-50">
                      <div className="flex items-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tertiary-200 text-tertiary-600">
                          <Building className="h-5 w-5" />
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-navy-900">University Housing</p>
                            <span className="text-xs text-gray-500">2 days ago</span>
                          </div>
                          <p className="text-sm text-navy-600 line-clamp-1">
                            Your application has been received. Please submit your student ID verification to proceed.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
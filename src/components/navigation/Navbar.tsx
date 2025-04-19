import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Menu, X, User, LogOut, Home, Building, Users, Map, Bell } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 text-white">
                <Building className="h-6 w-6" />
              </div>
              <span className="ml-2 text-xl font-bold text-navy-900">CampusNest</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/" className="rounded-md px-3 py-2 text-sm font-medium text-navy-800 hover:bg-gray-100">
                Home
              </Link>
              <Link to="/listings" className="rounded-md px-3 py-2 text-sm font-medium text-navy-800 hover:bg-gray-100">
                Listings
              </Link>
              <Link to="/roommates" className="rounded-md px-3 py-2 text-sm font-medium text-navy-800 hover:bg-gray-100">
                Roommates
              </Link>
            </div>
          </div>

          {/* User menu */}
          <div className="hidden md:block">
            {user ? (
              <div className="flex items-center space-x-4">
                <button className="relative rounded-full bg-gray-100 p-1 text-gray-500 hover:text-gray-700">
                  <span className="sr-only">View notifications</span>
                  <Bell className="h-6 w-6" />
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-secondary-500 text-xs text-white">
                    2
                  </span>
                </button>
                <Link to="/profile" className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-navy-800 hover:bg-gray-100">
                  <User className="mr-1 h-4 w-4" />
                  {user.name}
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-navy-800 hover:bg-gray-200"
                >
                  <LogOut className="mr-1 h-4 w-4" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="rounded-md px-3 py-2 text-sm font-medium text-navy-800 hover:bg-gray-100">
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="rounded-md bg-primary-500 px-3 py-2 text-sm font-medium text-white hover:bg-primary-600"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center rounded-md p-2 text-navy-800 hover:bg-gray-100 hover:text-navy-900"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              to="/"
              className="flex items-center rounded-md px-3 py-2 text-base font-medium text-navy-800 hover:bg-gray-100"
              onClick={toggleMenu}
            >
              <Home className="mr-2 h-5 w-5" />
              Home
            </Link>
            <Link
              to="/listings"
              className="flex items-center rounded-md px-3 py-2 text-base font-medium text-navy-800 hover:bg-gray-100"
              onClick={toggleMenu}
            >
              <Building className="mr-2 h-5 w-5" />
              Listings
            </Link>
            <Link
              to="/roommates"
              className="flex items-center rounded-md px-3 py-2 text-base font-medium text-navy-800 hover:bg-gray-100"
              onClick={toggleMenu}
            >
              <Users className="mr-2 h-5 w-5" />
              Roommates
            </Link>
          </div>
          <div className="border-t border-gray-200 pb-3 pt-4">
            {user ? (
              <div className="space-y-1 px-2">
                <Link
                  to="/profile"
                  className="flex items-center rounded-md px-3 py-2 text-base font-medium text-navy-800 hover:bg-gray-100"
                  onClick={toggleMenu}
                >
                  <User className="mr-2 h-5 w-5" />
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="flex w-full items-center rounded-md px-3 py-2 text-base font-medium text-navy-800 hover:bg-gray-100"
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-1 px-2">
                <Link
                  to="/login"
                  className="block rounded-md px-3 py-2 text-base font-medium text-navy-800 hover:bg-gray-100"
                  onClick={toggleMenu}
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="block rounded-md bg-primary-500 px-3 py-2 text-base font-medium text-white hover:bg-primary-600"
                  onClick={toggleMenu}
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
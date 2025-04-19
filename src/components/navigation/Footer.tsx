import React from 'react';
import { Link } from 'react-router-dom';
import { Building, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand and description */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
                <Building className="h-6 w-6 text-primary-500" />
              </div>
              <span className="ml-2 text-xl font-bold text-white">CampusNest</span>
            </Link>
            <p className="mt-4 text-sm text-gray-300">
              Find your perfect student housing near SJSU and other universities. We connect students with apartments, dorms, and roommates.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Navigation links */}
          <div className="md:col-span-3">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div>
                <h3 className="text-lg font-semibold text-white">Resources</h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <Link to="/listings" className="text-gray-300 hover:text-white">Housing Listings</Link>
                  </li>
                  <li>
                    <Link to="/roommates" className="text-gray-300 hover:text-white">Find Roommates</Link>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white">University Guide</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white">Renter's Resources</a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Company</h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white">About Us</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white">Careers</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white">Contact</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white">Partnerships</a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Legal</h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white">Terms of Service</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white">Fair Housing</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white">Cookie Policy</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} CampusNest. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
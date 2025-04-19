import React from 'react';
import { Link } from 'react-router-dom';
import { Building, Users, MapPin, Search } from 'lucide-react';
import InteractiveMap from '../components/home/InteractiveMap';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-navy-800 to-navy-900 py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Find Your Perfect Student Housing
            </h1>
            <p className="mt-4 text-xl text-gray-300">
              Connect with apartments, dorms, and roommates near SJSU and other universities.
            </p>
            <div className="mt-8 flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Link
                to="/listings"
                className="btn bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500"
              >
                Browse Listings
              </Link>
              <Link
                to="/roommates"
                className="btn bg-white text-navy-800 hover:bg-gray-100"
              >
                Find Roommates
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Search Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-lg bg-white p-4 shadow-soft sm:p-6">
              <div className="flex flex-col space-y-4">
                <div>
                  <label htmlFor="university" className="block text-sm font-medium text-navy-800">
                    University
                  </label>
                  <select id="university" className="select mt-1">
                    <option>San Jose State University</option>
                    <option>Santa Clara University</option>
                    <option>Stanford University</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="housingType" className="block text-sm font-medium text-navy-800">
                    Housing Type
                  </label>
                  <select id="housingType" className="select mt-1">
                    <option>All Types</option>
                    <option>Apartments</option>
                    <option>Dorms</option>
                    <option>Shared Housing</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="minPrice" className="block text-sm font-medium text-navy-800">
                      Min Price
                    </label>
                    <select id="minPrice" className="select mt-1">
                      <option>No Min</option>
                      <option>$500</option>
                      <option>$1,000</option>
                      <option>$1,500</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="maxPrice" className="block text-sm font-medium text-navy-800">
                      Max Price
                    </label>
                    <select id="maxPrice" className="select mt-1">
                      <option>No Max</option>
                      <option>$1,500</option>
                      <option>$2,000</option>
                      <option>$2,500</option>
                    </select>
                  </div>
                </div>
                <button className="btn-primary w-full">
                  <Search className="mr-2 h-5 w-5" />
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-navy-900">Explore Housing Around SJSU</h2>
              <p className="mt-2 text-lg text-navy-600">
                View available housing options on our interactive map
              </p>
            </div>
            <div className="h-[500px] overflow-hidden rounded-lg shadow-lg">
              <InteractiveMap />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-navy-900">Why Choose CampusNest?</h2>
            <p className="mt-4 text-lg text-navy-600">
              We make finding student housing simple, secure, and stress-free
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow-card">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                <Building className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-navy-900">Verified Listings</h3>
              <p className="text-navy-600">
                All our listings are verified to ensure you're seeing real, available housing options.
              </p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-card">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary-100 text-secondary-600">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-navy-900">Roommate Matching</h3>
              <p className="text-navy-600">
                Our compatibility algorithm helps you find the perfect roommate based on your lifestyle.
              </p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-card">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-tertiary-100 text-tertiary-600">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-navy-900">Campus Proximity</h3>
              <p className="text-navy-600">
                Find housing options sorted by walking distance to your university campus.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-500 to-primary-600 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-white">Ready to find your perfect housing?</h2>
            <p className="mt-4 text-xl text-white/90">
              Join thousands of students who have found their ideal living situation with CampusNest.
            </p>
            <div className="mt-8">
              <Link
                to="/register"
                className="btn bg-white px-6 py-3 text-lg font-medium text-primary-600 hover:bg-gray-100"
              >
                Get Started Today
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
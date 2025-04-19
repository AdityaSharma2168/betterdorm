import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutGrid, List, Map, ChevronDown, Filter, Wifi, Coffee, Dumbbell, Snowflake, Plus } from 'lucide-react';
import ListingCard from '../../components/listings/ListingCard';
import InteractiveMap from '../../components/home/InteractiveMap';

// Define types
interface Listing {
  id: string;
  title: string;
  type: 'apartment' | 'dorm' | 'shared';
  price: number;
  address: string;
  distance: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  available: boolean;
  images: string[];
  amenities: string[];
  rating?: number;
  reviews?: number;
}

type ViewMode = 'grid' | 'list' | 'map';

const Listings: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [filtersOpen, setFiltersOpen] = useState(true);

  // Sample listings data
  const listings: Listing[] = [
    {
      id: '1',
      title: 'Modern Studio Apartment',
      type: 'apartment',
      price: 1800,
      address: '123 South 4th Street, San Jose',
      distance: '0.3 miles to SJSU',
      bedrooms: 0,
      bathrooms: 1,
      sqft: 450,
      available: true,
      images: [
        'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=800',
      ],
      amenities: ['wifi', 'ac', 'gym', 'furnished'],
      rating: 4.5,
      reviews: 23,
    },
    {
      id: '2',
      title: 'Campus Village Dormitory',
      type: 'dorm',
      price: 1500,
      address: 'SJSU Campus, San Jose',
      distance: '0.1 miles to SJSU',
      bedrooms: 1,
      bathrooms: 1,
      sqft: 300,
      available: true,
      images: [
        'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800',
      ],
      amenities: ['wifi', 'furnished', 'mealplan'],
      rating: 4.2,
      reviews: 48,
    },
    {
      id: '3',
      title: '2BR Apartment near Downtown',
      type: 'apartment',
      price: 2400,
      address: '456 North 7th Street, San Jose',
      distance: '0.5 miles to SJSU',
      bedrooms: 2,
      bathrooms: 2,
      sqft: 850,
      available: true,
      images: [
        'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800',
      ],
      amenities: ['wifi', 'ac', 'parking', 'laundry'],
      rating: 4.7,
      reviews: 15,
    },
    {
      id: '4',
      title: 'Shared 4BR House with Students',
      type: 'shared',
      price: 950,
      address: '789 East San Carlos St, San Jose',
      distance: '0.7 miles to SJSU',
      bedrooms: 1,
      bathrooms: 2,
      sqft: 1600,
      available: true,
      images: [
        'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800',
      ],
      amenities: ['wifi', 'ac', 'parking', 'laundry', 'backyard'],
      rating: 4.0,
      reviews: 7,
    },
    {
      id: '5',
      title: 'Luxury 1BR Apartment',
      type: 'apartment',
      price: 2200,
      address: '101 East Santa Clara St, San Jose',
      distance: '0.4 miles to SJSU',
      bedrooms: 1,
      bathrooms: 1,
      sqft: 700,
      available: false,
      images: [
        'https://images.pexels.com/photos/2462015/pexels-photo-2462015.jpeg?auto=compress&cs=tinysrgb&w=800',
      ],
      amenities: ['wifi', 'ac', 'gym', 'pool', 'parking'],
      rating: 4.8,
      reviews: 32,
    },
    {
      id: '6',
      title: 'Economy Dorm Room',
      type: 'dorm',
      price: 1200,
      address: 'SJSU South Campus, San Jose',
      distance: '0.2 miles to SJSU',
      bedrooms: 1,
      bathrooms: 1,
      sqft: 250,
      available: true,
      images: [
        'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800',
      ],
      amenities: ['wifi', 'furnished', 'communal kitchen'],
      rating: 3.9,
      reviews: 41,
    },
  ];

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'wifi':
        return <Wifi className="h-4 w-4" />;
      case 'ac':
        return <Snowflake className="h-4 w-4" />;
      case 'gym':
        return <Dumbbell className="h-4 w-4" />;
      case 'coffee':
        return <Coffee className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex justify-between items-center">
          <div>
          <h1 className="text-3xl font-bold text-navy-900">Student Housing Listings</h1>
          <p className="mt-2 text-navy-600">
            Find apartments, dorms, and shared housing near SJSU
          </p>
          
          </div>
      <Link to="/create-listing" className="btn-primary flex items-center space-x-2">
        <Plus className="h-4 w-4" />
        <span>Create Listing</span>
      </Link>
    </div>
        <div className="flex flex-col md:flex-row md:space-x-6">
          {/* Filters sidebar */}
          <div className="mb-6 md:mb-0 md:w-1/4">
            <div className="rounded-lg bg-white p-5 shadow-soft">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-navy-900">Filters</h2>
                <button 
                  onClick={() => setFiltersOpen(!filtersOpen)}
                  className="md:hidden"
                >
                  <ChevronDown className={`h-5 w-5 transform transition-transform ${filtersOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>

              <div className={`space-y-6 ${filtersOpen ? 'block' : 'hidden md:block'}`}>
                <div>
                  <h3 className="mb-3 font-medium text-navy-800">Housing Type</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" defaultChecked />
                      <span className="ml-2 text-navy-700">Apartments</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" defaultChecked />
                      <span className="ml-2 text-navy-700">Dorms</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" defaultChecked />
                      <span className="ml-2 text-navy-700">Shared Housing</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 font-medium text-navy-800">Price Range</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="minPrice" className="sr-only">Min Price</label>
                      <select id="minPrice" className="select">
                        <option>Min $</option>
                        <option>$500</option>
                        <option>$1,000</option>
                        <option>$1,500</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="maxPrice" className="sr-only">Max Price</label>
                      <select id="maxPrice" className="select">
                        <option>Max $</option>
                        <option>$1,500</option>
                        <option>$2,000</option>
                        <option>$2,500</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 font-medium text-navy-800">Bedrooms</h3>
                  <div className="flex space-x-2">
                    <button className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-white text-navy-700 hover:border-primary-500 hover:text-primary-500">
                      Any
                    </button>
                    <button className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-white text-navy-700 hover:border-primary-500 hover:text-primary-500">
                      1+
                    </button>
                    <button className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-white text-navy-700 hover:border-primary-500 hover:text-primary-500">
                      2+
                    </button>
                    <button className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-white text-navy-700 hover:border-primary-500 hover:text-primary-500">
                      3+
                    </button>
                    <button className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-white text-navy-700 hover:border-primary-500 hover:text-primary-500">
                      4+
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 font-medium text-navy-800">Distance from Campus</h3>
                  <select className="select">
                    <option>Any Distance</option>
                    <option>Under 0.5 miles</option>
                    <option>Under 1 mile</option>
                    <option>Under 2 miles</option>
                    <option>Under 5 miles</option>
                  </select>
                </div>

                <div>
                  <h3 className="mb-3 font-medium text-navy-800">Amenities</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      <span className="ml-2 text-navy-700">Air Conditioning</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      <span className="ml-2 text-navy-700">In-unit Laundry</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      <span className="ml-2 text-navy-700">Parking</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      <span className="ml-2 text-navy-700">Furnished</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      <span className="ml-2 text-navy-700">Gym</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      <span className="ml-2 text-navy-700">Pool</span>
                    </label>
                  </div>
                </div>

                <div className="pt-2">
                  <button className="btn-primary w-full">
                    <Filter className="mr-2 h-4 w-4" />
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="md:w-3/4">
            {/* View controls */}
            <div className="mb-6 flex items-center justify-between rounded-lg bg-white p-3 shadow-soft">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`rounded-md p-2 ${
                    viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  <LayoutGrid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`rounded-md p-2 ${
                    viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  <List className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`rounded-md p-2 ${
                    viewMode === 'map' ? 'bg-primary-100 text-primary-600' : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  <Map className="h-5 w-5" />
                </button>
              </div>

              <div className="flex items-center">
                <span className="mr-2 text-sm text-navy-600">Sort by:</span>
                <select className="select">
                  <option>Price (Low to High)</option>
                  <option>Price (High to Low)</option>
                  <option>Distance to Campus</option>
                  <option>Newest</option>
                  <option>Most Popular</option>
                </select>
              </div>
            </div>

            {/* Listings content */}
            {viewMode === 'map' ? (
              <div className="h-[calc(100vh-300px)] min-h-[500px] rounded-lg overflow-hidden shadow-lg">
                <InteractiveMap />
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid gap-6 md:grid-cols-2 lg:grid-cols-2' : 'space-y-6'}>
                {listings.map((listing) => (
                  <ListingCard 
                    key={listing.id}
                    listing={listing}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listings;
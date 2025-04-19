import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  MapPin, 
  BedDouble, 
  Bath, 
  Square, 
  Calendar, 
  Wifi, 
  Snowflake, 
  Car, 
  Dumbbell, 
  Coffee, 
  Share2, 
  Heart, 
  Star, 
  Ruler, 
  Armchair, 
  ParkingCircle 
} from 'lucide-react';

const ListingDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock listing data
  const listing = {
    id: '1',
    title: 'Modern Studio Apartment near SJSU',
    type: 'apartment',
    price: 1800,
    address: '123 South 4th Street, San Jose, CA 95112',
    distance: '0.3 miles to SJSU',
    bedrooms: 0,
    bathrooms: 1,
    sqft: 450,
    available: true,
    availableFrom: '2023-08-15',
    leaseTerm: '12 months',
    description: 'This modern studio apartment is perfect for SJSU students. Located just a short walk from campus, this unit features updated appliances, high-speed internet, and all utilities included. The building has secured entry, on-site laundry, and a study lounge for residents.',
    images: [
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    amenities: [
      { name: 'High-Speed WiFi', icon: 'wifi' },
      { name: 'Air Conditioning', icon: 'ac' },
      { name: 'Fully Furnished', icon: 'furnished' },
      { name: 'On-site Laundry', icon: 'laundry' },
      { name: 'Study Lounge', icon: 'study' },
      { name: 'Bike Storage', icon: 'bike' },
      { name: 'Utilities Included', icon: 'utilities' },
      { name: 'Pet Friendly', icon: 'pet' },
    ],
    utilities: {
      water: true,
      electricity: true,
      gas: false,
      internet: true,
      cable: false,
      trash: true,
    },
    landlord: {
      name: 'Campus Edge Properties',
      phone: '(408) 555-1234',
      email: 'leasing@campusedge.com',
      responseRate: '98%',
      responseTime: 'within 24 hours',
    },
    reviews: [
      {
        id: '1',
        author: 'Sarah J.',
        date: '2023-05-15',
        rating: 4,
        comment: 'Great location, just minutes from campus. The apartment is small but well designed. Management is responsive to maintenance requests.',
      },
      {
        id: '2',
        author: 'Michael T.',
        date: '2023-03-02',
        rating: 5,
        comment: 'I lived here for two years while at SJSU. Fantastic studio with everything a student needs. Highly recommend!',
      },
      {
        id: '3',
        author: 'Jessica K.',
        date: '2022-12-18',
        rating: 3,
        comment: 'The apartment itself is nice, but can be noisy on weekends due to its downtown location. Good value for the area though.',
      },
    ],
  };

  const getAmenityIcon = (icon: string) => {
    switch (icon) {
      case 'wifi':
        return <Wifi className="h-5 w-5" />;
      case 'ac':
        return <Snowflake className="h-5 w-5" />;
      case 'parking':
        return <Car className="h-5 w-5" />;
      case 'gym':
        return <Dumbbell className="h-5 w-5" />;
      case 'furnished':
        return <Armchair className="h-5 w-5" />;
      case 'laundry':
        return <ParkingCircle className="h-5 w-5" />;
      case 'study':
        return <Coffee className="h-5 w-5" />;
      default:
        return <Coffee className="h-5 w-5" />;
    }
  };

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Image Gallery */}
        <div className="mb-8 overflow-hidden rounded-xl bg-white shadow-soft">
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 md:gap-2 md:p-2">
            <div className="col-span-3 row-span-2">
              <img
                src={listing.images[activeImageIndex]}
                alt={listing.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="hidden md:grid md:grid-rows-2 md:gap-2">
              {listing.images.slice(1, 3).map((image, index) => (
                <div key={index} onClick={() => setActiveImageIndex(index + 1)} className="cursor-pointer">
                  <img
                    src={image}
                    alt={`${listing.title} ${index + 2}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="hidden md:grid md:grid-cols-4 md:gap-2 md:p-2">
            {listing.images.map((image, index) => (
              <div
                key={index}
                onClick={() => setActiveImageIndex(index)}
                className={`cursor-pointer rounded ${activeImageIndex === index ? 'ring-2 ring-primary-500' : ''}`}
              >
                <img
                  src={image}
                  alt={`${listing.title} thumbnail ${index + 1}`}
                  className="h-16 w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* Main content */}
          <div className="md:col-span-2">
            <div className="rounded-xl bg-white p-6 shadow-soft">
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-navy-900 md:text-3xl">{listing.title}</h1>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setIsFavorite(!isFavorite)}
                      className={`rounded-full p-2 ${
                        isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-gray-500'
                      }`}
                    >
                      <Heart className={`h-6 w-6 ${isFavorite ? 'fill-current' : ''}`} />
                    </button>
                    <button className="rounded-full p-2 text-gray-400 hover:text-gray-500">
                      <Share2 className="h-6 w-6" />
                    </button>
                  </div>
                </div>
                <div className="mt-2 flex items-center text-navy-600">
                  <MapPin className="mr-1 h-4 w-4 text-gray-400" />
                  <span>{listing.address}</span>
                </div>
                <p className="mt-1 text-navy-600">{listing.distance}</p>
                <div className="mt-4 flex items-center space-x-2">
                  <span className="rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-800">
                    Studio Apartment
                  </span>
                  {listing.available ? (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                      Available Now
                    </span>
                  ) : (
                    <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800">
                      Not Available
                    </span>
                  )}
                </div>
              </div>

              {/* Details */}
              <div className="mb-6 grid grid-cols-2 gap-4 border-b border-gray-200 pb-6 md:grid-cols-4">
                <div>
                  <p className="text-sm text-gray-500">Bedrooms</p>
                  <div className="mt-1 flex items-center text-navy-800">
                    <BedDouble className="mr-1 h-5 w-5 text-navy-600" />
                    <span className="font-medium">Studio</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Bathrooms</p>
                  <div className="mt-1 flex items-center text-navy-800">
                    <Bath className="mr-1 h-5 w-5 text-navy-600" />
                    <span className="font-medium">{listing.bathrooms}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Area</p>
                  <div className="mt-1 flex items-center text-navy-800">
                    <Square className="mr-1 h-5 w-5 text-navy-600" />
                    <span className="font-medium">{listing.sqft} sqft</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Available From</p>
                  <div className="mt-1 flex items-center text-navy-800">
                    <Calendar className="mr-1 h-5 w-5 text-navy-600" />
                    <span className="font-medium">Aug 15, 2023</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6 border-b border-gray-200 pb-6">
                <h2 className="mb-4 text-xl font-semibold text-navy-900">Description</h2>
                <p className="text-navy-700 leading-relaxed">{listing.description}</p>
              </div>

              {/* Amenities */}
              <div className="mb-6 border-b border-gray-200 pb-6">
                <h2 className="mb-4 text-xl font-semibold text-navy-900">Amenities</h2>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {listing.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                        {getAmenityIcon(amenity.icon)}
                      </div>
                      <span className="text-navy-700">{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Utilities */}
              <div className="mb-6 border-b border-gray-200 pb-6">
                <h2 className="mb-4 text-xl font-semibold text-navy-900">Utilities Included</h2>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  <div className="flex items-center">
                    <div className={`mr-2 h-5 w-5 rounded-full ${listing.utilities.water ? 'bg-green-500' : 'bg-red-500'}`}>
                      {listing.utilities.water && (
                        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-navy-700">Water</span>
                  </div>
                  <div className="flex items-center">
                    <div className={`mr-2 h-5 w-5 rounded-full ${listing.utilities.electricity ? 'bg-green-500' : 'bg-red-500'}`}>
                      {listing.utilities.electricity && (
                        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-navy-700">Electricity</span>
                  </div>
                  <div className="flex items-center">
                    <div className={`mr-2 h-5 w-5 rounded-full ${listing.utilities.gas ? 'bg-green-500' : 'bg-red-500'}`}>
                      {listing.utilities.gas && (
                        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-navy-700">Gas</span>
                  </div>
                  <div className="flex items-center">
                    <div className={`mr-2 h-5 w-5 rounded-full ${listing.utilities.internet ? 'bg-green-500' : 'bg-red-500'}`}>
                      {listing.utilities.internet && (
                        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-navy-700">Internet</span>
                  </div>
                  <div className="flex items-center">
                    <div className={`mr-2 h-5 w-5 rounded-full ${listing.utilities.cable ? 'bg-green-500' : 'bg-red-500'}`}>
                      {listing.utilities.cable && (
                        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-navy-700">Cable TV</span>
                  </div>
                  <div className="flex items-center">
                    <div className={`mr-2 h-5 w-5 rounded-full ${listing.utilities.trash ? 'bg-green-500' : 'bg-red-500'}`}>
                      {listing.utilities.trash && (
                        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-navy-700">Trash</span>
                  </div>
                </div>
              </div>

              {/* Reviews */}
              <div>
                <h2 className="mb-4 text-xl font-semibold text-navy-900">Reviews</h2>
                <div className="mb-4 flex items-center">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${
                          star <= 4 ? 'fill-current text-yellow-500' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 font-medium">4.0 out of 5</span>
                  <span className="ml-2 text-sm text-gray-500">(3 reviews)</span>
                </div>
                <div className="space-y-4">
                  {listing.reviews.map((review) => (
                    <div key={review.id} className="rounded-lg border border-gray-200 p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <div className="font-medium">{review.author}</div>
                        <div className="text-sm text-gray-500">{review.date}</div>
                      </div>
                      <div className="mb-2 flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= review.rating ? 'fill-current text-yellow-500' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-navy-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="sticky top-24">
              {/* Price card */}
              <div className="mb-6 rounded-xl bg-white p-6 shadow-soft">
                <div className="mb-4 text-center">
                  <span className="text-3xl font-bold text-primary-600">${listing.price}</span>
                  <span className="text-navy-600">/month</span>
                </div>
                <div className="mb-6">
                  <p className="flex items-center justify-between text-navy-700">
                    <span>Security Deposit</span>
                    <span className="font-medium">${listing.price}</span>
                  </p>
                  <p className="mt-2 flex items-center justify-between text-navy-700">
                    <span>Lease Term</span>
                    <span className="font-medium">{listing.leaseTerm}</span>
                  </p>
                </div>
                <div className="space-y-3">
                  <button className="btn-primary w-full">Schedule a Tour</button>
                  <button className="btn-outline w-full">Contact Landlord</button>
                </div>
              </div>

              {/* Landlord card */}
              <div className="rounded-xl bg-white p-6 shadow-soft">
                <h3 className="mb-4 text-lg font-semibold text-navy-900">Landlord Information</h3>
                <div className="mb-2 text-navy-700">{listing.landlord.name}</div>
                <div className="mb-4 text-navy-700">
                  <div className="flex items-center justify-between">
                    <span>Response Rate</span>
                    <span className="font-medium">{listing.landlord.responseRate}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <span>Response Time</span>
                    <span className="font-medium">{listing.landlord.responseTime}</span>
                  </div>
                </div>
                <button className="btn-primary w-full">Message</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;
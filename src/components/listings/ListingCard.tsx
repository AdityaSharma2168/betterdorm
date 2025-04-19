import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, BedDouble, Bath, Square, Star } from 'lucide-react';

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

interface ListingCardProps {
  listing: Listing;
  viewMode: 'grid' | 'list';
}

const ListingCard: React.FC<ListingCardProps> = ({ listing, viewMode }) => {
  const {
    id,
    title,
    type,
    price,
    address,
    distance,
    bedrooms,
    bathrooms,
    sqft,
    available,
    images,
    rating,
    reviews,
  } = listing;

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'apartment':
        return 'Apartment';
      case 'dorm':
        return 'Dormitory';
      case 'shared':
        return 'Shared Housing';
      default:
        return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'apartment':
        return 'bg-primary-100 text-primary-800';
      case 'dorm':
        return 'bg-secondary-100 text-secondary-800';
      case 'shared':
        return 'bg-tertiary-100 text-tertiary-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (viewMode === 'list') {
    return (
      <div className="overflow-hidden rounded-lg bg-white shadow-card transition-shadow hover:shadow-lg">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3">
            <div className="relative h-56 w-full md:h-full">
              <img
                src={images[0]}
                alt={title}
                className="h-full w-full object-cover"
              />
              {!available && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <span className="rounded-full bg-red-500 px-4 py-2 font-medium text-white">
                    Not Available
                  </span>
                </div>
              )}
              <div className="absolute left-4 top-4">
                <span className={`rounded-full px-2 py-1 text-xs font-medium ${getTypeColor(type)}`}>
                  {getTypeLabel(type)}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-1 flex-col p-5">
            <div className="mb-2 flex items-start justify-between">
              <h3 className="text-xl font-semibold text-navy-900">{title}</h3>
              <p className="text-lg font-bold text-primary-600">${price}<span className="text-sm font-normal text-gray-500">/mo</span></p>
            </div>
            
            <div className="mb-3 flex items-center text-sm text-navy-600">
              <MapPin className="mr-1 h-4 w-4 text-gray-400" />
              <span>{address}</span>
            </div>
            
            <p className="text-sm text-navy-600">{distance}</p>
            
            <div className="mt-auto flex flex-wrap items-center gap-4 pt-4 text-sm">
              {bedrooms > 0 && (
                <div className="flex items-center">
                  <BedDouble className="mr-1 h-4 w-4 text-gray-400" />
                  <span>{bedrooms} {bedrooms === 1 ? 'Bed' : 'Beds'}</span>
                </div>
              )}
              
              {bathrooms > 0 && (
                <div className="flex items-center">
                  <Bath className="mr-1 h-4 w-4 text-gray-400" />
                  <span>{bathrooms} {bathrooms === 1 ? 'Bath' : 'Baths'}</span>
                </div>
              )}
              
              {sqft > 0 && (
                <div className="flex items-center">
                  <Square className="mr-1 h-4 w-4 text-gray-400" />
                  <span>{sqft} sqft</span>
                </div>
              )}
              
              {rating && (
                <div className="flex items-center ml-auto">
                  <Star className="mr-1 h-4 w-4 fill-current text-yellow-500" />
                  <span>{rating} ({reviews} reviews)</span>
                </div>
              )}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100">
              <Link
                to={`/listings/${id}`}
                className="btn-primary w-full"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-card transition-shadow hover:shadow-lg">
      <div className="relative">
        <div className="relative h-48">
          <img
            src={images[0]}
            alt={title}
            className="h-full w-full object-cover"
          />
          {!available && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-medium text-white">
                Not Available
              </span>
            </div>
          )}
          <div className="absolute left-4 top-4">
            <span className={`rounded-full px-2 py-1 text-xs font-medium ${getTypeColor(type)}`}>
              {getTypeLabel(type)}
            </span>
          </div>
          {rating && (
            <div className="absolute right-4 top-4 flex items-center rounded-full bg-white/90 px-2 py-1 text-xs font-medium">
              <Star className="mr-1 h-3 w-3 fill-current text-yellow-500" />
              <span>{rating}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <div className="mb-2 flex items-start justify-between">
          <h3 className="text-lg font-semibold text-navy-900">{title}</h3>
          <p className="text-lg font-bold text-primary-600">${price}<span className="text-xs font-normal text-gray-500">/mo</span></p>
        </div>
        
        <div className="mb-2 flex items-center text-sm text-navy-600">
          <MapPin className="mr-1 h-4 w-4 text-gray-400" />
          <span className="truncate">{address}</span>
        </div>
        
        <p className="mb-3 text-sm text-navy-600">{distance}</p>
        
        <div className="flex flex-wrap gap-3 text-xs text-gray-600">
          {bedrooms > 0 && (
            <div className="flex items-center">
              <BedDouble className="mr-1 h-3 w-3 text-gray-400" />
              <span>{bedrooms} {bedrooms === 1 ? 'Bed' : 'Beds'}</span>
            </div>
          )}
          
          {bathrooms > 0 && (
            <div className="flex items-center">
              <Bath className="mr-1 h-3 w-3 text-gray-400" />
              <span>{bathrooms} {bathrooms === 1 ? 'Bath' : 'Baths'}</span>
            </div>
          )}
          
          {sqft > 0 && (
            <div className="flex items-center">
              <Square className="mr-1 h-3 w-3 text-gray-400" />
              <span>{sqft} sqft</span>
            </div>
          )}
        </div>
        
        <div className="mt-4">
          <Link
            to={`/listings/${id}`}
            className="btn-primary w-full text-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
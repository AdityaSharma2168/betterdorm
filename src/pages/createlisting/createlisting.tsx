import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Plus, X, Building, Home, Users, Bed, Bath, Square, DollarSign } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const CreateListing: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Form fields
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'apartment' | 'dorm' | 'shared'>('apartment');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');
  const [bedrooms, setBedrooms] = useState('1');
  const [bathrooms, setBathrooms] = useState('1');
  const [sqft, setSqft] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [preview, setPreview] = useState<string[]>([]);

  // Amenities options
  const amenityOptions = [
    { id: 'wifi', label: 'WiFi' },
    { id: 'ac', label: 'Air Conditioning' },
    { id: 'laundry', label: 'In-unit Laundry' },
    { id: 'parking', label: 'Parking' },
    { id: 'furnished', label: 'Furnished' },
    { id: 'gym', label: 'Gym Access' },
    { id: 'pool', label: 'Pool' },
    { id: 'security', label: 'Security System' },
    { id: 'pets', label: 'Pet Friendly' },
    { id: 'utilities', label: 'Utilities Included' },
  ];

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImages([...images, ...newFiles]);
      
      // Create preview URLs
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setPreview([...preview, ...newPreviews]);
    }
  };

  // Remove image
  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    const newPreviews = [...preview];
    URL.revokeObjectURL(newPreviews[index]);
    newPreviews.splice(index, 1);
    setPreview(newPreviews);
  };

  // Toggle amenity
  const toggleAmenity = (amenityId: string) => {
    if (amenities.includes(amenityId)) {
      setAmenities(amenities.filter(a => a !== amenityId));
    } else {
      setAmenities([...amenities, amenityId]);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setError("You must be logged in to create a listing");
      return;
    }
    
    if (images.length === 0) {
      setError("Please upload at least one image");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Create form data
      const formData = new FormData();
      formData.append('title', title);
      formData.append('type', type);
      formData.append('price', price);
      formData.append('address', address);
      formData.append('bedrooms', bedrooms);
      formData.append('bathrooms', bathrooms);
      formData.append('sqft', sqft);
      formData.append('description', description);
      formData.append('amenities', JSON.stringify(amenities));
      
      // Append images
      images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });
      
      // In a real app, you would send this to your backend API
      // const response = await fetch('/api/listings', {
      //   method: 'POST',
      //   body: formData,
      //   headers: {
      //     'Authorization': `Bearer ${user.token}`
      //   }
      // });
      
      // if (!response.ok) throw new Error('Failed to create listing');
      
      // For demo purposes, we'll just simulate a success
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      setSuccess(true);
      
      // Redirect after a moment
      setTimeout(() => {
        navigate('/listings');
      }, 2000);
      
    } catch (err: any) {
      setError(err.message || 'Failed to create listing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 py-8 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header with back button */}
        <div className="mb-8">
          <Link to="/listings" className="inline-flex items-center text-navy-800 hover:text-primary-600 transition-colors mb-4">
            <ArrowLeft className="h-5 w-5 mr-1" />
            <span>Back to Listings</span>
          </Link>
          <h1 className="text-3xl font-bold text-navy-900">Create a New Listing</h1>
          <p className="mt-2 text-navy-600">
            Share your property with student housing seekers
          </p>
        </div>

        {success ? (
          <div className="rounded-lg bg-white p-8 shadow-soft text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <Building className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="mt-4 text-xl font-semibold text-navy-900">Listing Created Successfully!</h2>
            <p className="mt-2 text-navy-600">
              Your listing has been submitted and will be visible on our platform shortly.
            </p>
            <div className="mt-6">
              <Link to="/listings" className="btn-primary">
                Return to Listings
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="rounded-lg bg-white p-6 shadow-soft">
              <h2 className="mb-4 text-xl font-semibold text-navy-900">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-navy-800">
                    Listing Title*
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="input mt-1"
                    placeholder="e.g. Modern Studio Apartment near SJSU"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-navy-800">
                      Property Type*
                    </label>
                    <div className="mt-1 grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setType('apartment')}
                        className={`flex flex-col items-center justify-center rounded-lg border p-3 ${
                          type === 'apartment'
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-300 hover:border-primary-300'
                        }`}
                      >
                        <Building className="h-6 w-6" />
                        <span className="mt-1 text-sm">Apartment</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setType('dorm')}
                        className={`flex flex-col items-center justify-center rounded-lg border p-3 ${
                          type === 'dorm'
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-300 hover:border-primary-300'
                        }`}
                      >
                        <Home className="h-6 w-6" />
                        <span className="mt-1 text-sm">Dorm</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setType('shared')}
                        className={`flex flex-col items-center justify-center rounded-lg border p-3 ${
                          type === 'shared'
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-300 hover:border-primary-300'
                        }`}
                      >
                        <Users className="h-6 w-6" />
                        <span className="mt-1 text-sm">Shared</span>
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-navy-800">
                      Monthly Price ($)*
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="price"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        min="1"
                        className="input mt-1 pl-10"
                        placeholder="e.g. 1500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-navy-800">
                    Property Address*
                  </label>
                  <input
                    id="address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="input mt-1"
                    placeholder="e.g. 123 South 4th Street, San Jose"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <label htmlFor="bedrooms" className="block text-sm font-medium text-navy-800">
                      Bedrooms*
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Bed className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        id="bedrooms"
                        value={bedrooms}
                        onChange={(e) => setBedrooms(e.target.value)}
                        required
                        className="input mt-1 pl-10"
                      >
                        <option value="0">Studio</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5+</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="bathrooms" className="block text-sm font-medium text-navy-800">
                      Bathrooms*
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Bath className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        id="bathrooms"
                        value={bathrooms}
                        onChange={(e) => setBathrooms(e.target.value)}
                        required
                        className="input mt-1 pl-10"
                      >
                        <option value="1">1</option>
                        <option value="1.5">1.5</option>
                        <option value="2">2</option>
                        <option value="2.5">2.5</option>
                        <option value="3">3</option>
                        <option value="3.5">3.5+</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="sqft" className="block text-sm font-medium text-navy-800">
                      Square Feet
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Square className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="sqft"
                        type="number"
                        value={sqft}
                        onChange={(e) => setSqft(e.target.value)}
                        min="1"
                        className="input mt-1 pl-10"
                        placeholder="e.g. 750"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-navy-800">
                    Description*
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows={4}
                    className="input mt-1"
                    placeholder="Describe your property, including nearby facilities, special features, etc."
                  />
                </div>
              </div>
            </div>

            {/* Photos */}
            <div className="rounded-lg bg-white p-6 shadow-soft">
              <h2 className="mb-4 text-xl font-semibold text-navy-900">Photos</h2>
              <p className="mb-4 text-sm text-navy-600">
                Upload high-quality photos of your property. The first photo will be the main image.
              </p>
              
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                {preview.map((url, index) => (
                  <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                    <img src={url} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-white/80 rounded-full p-1 hover:bg-red-100"
                    >
                      <X className="h-4 w-4 text-red-600" />
                    </button>
                    {index === 0 && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs py-1 px-2 text-center">
                        Main Image
                      </div>
                    )}
                  </div>
                ))}
                
                <div className="aspect-video flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-primary-300 transition-colors">
                  <label htmlFor="images" className="flex flex-col items-center cursor-pointer">
                    <Upload className="h-8 w-8 text-gray-400" />
                    <span className="mt-2 text-sm text-gray-500">Upload</span>
                    <input
                      id="images"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="rounded-lg bg-white p-6 shadow-soft">
              <h2 className="mb-4 text-xl font-semibold text-navy-900">Amenities</h2>
              <p className="mb-4 text-sm text-navy-600">
                Select all amenities that apply to your property.
              </p>
              
              <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                {amenityOptions.map((amenity) => (
                  <div key={amenity.id}>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={amenities.includes(amenity.id)}
                        onChange={() => toggleAmenity(amenity.id)}
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-navy-700">{amenity.label}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Error message */}
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

            {/* Submit */}
            <div className="flex justify-end">
              <Link to="/listings" className="btn-outline mr-4">
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary min-w-[150px]"
              >
                {loading ? 'Creating...' : 'Create Listing'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateListing;
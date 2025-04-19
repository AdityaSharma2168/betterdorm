import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Clock, 
  DollarSign, 
  Coffee, 
  Beer, 
  Music, 
  Moon, 
  Sun, 
  Check, 
  MessageCircle 
} from 'lucide-react';

// Define types
interface RoommateProfile {
  id: string;
  name: string;
  age: number;
  gender: string;
  university: string;
  major: string;
  year: string;
  bio: string;
  compatibility: number;
  photo: string;
  lookingFor: string;
  moveInDate: string;
  budget: string;
  preferences: {
    smoking: boolean;
    pets: boolean;
    drinking: boolean;
    guests: boolean;
  };
  lifestyle: {
    cleanliness: number;
    noise: number;
    sleepTime: string;
    wakeTime: string;
    studyHabits: string;
    socialLevel: number;
  };
  verified: boolean;
}

const RoommateMatching: React.FC = () => {
  const [tab, setTab] = useState<'matches' | 'profile'>('matches');
  const [displayMode, setDisplayMode] = useState<'all' | 'liked' | 'matched'>('all');
  
  // Sample roommate profiles
  const roommateProfiles: RoommateProfile[] = [
    {
      id: '1',
      name: 'Alex Johnson',
      age: 21,
      gender: 'Male',
      university: 'SJSU',
      major: 'Computer Science',
      year: 'Junior',
      bio: 'CS major who enjoys coding, gaming, and going to the gym. Looking for a clean and respectful roommate.',
      compatibility: 92,
      photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=800',
      lookingFor: 'Apartment',
      moveInDate: 'August 2023',
      budget: '$800-1200',
      preferences: {
        smoking: false,
        pets: true,
        drinking: true,
        guests: true,
      },
      lifestyle: {
        cleanliness: 4,
        noise: 2,
        sleepTime: '12AM - 1AM',
        wakeTime: '8AM - 9AM',
        studyHabits: 'Evening studier, quiet',
        socialLevel: 3,
      },
      verified: true,
    },
    {
      id: '2',
      name: 'Sophia Martinez',
      age: 20,
      gender: 'Female',
      university: 'SJSU',
      major: 'Business',
      year: 'Sophomore',
      bio: 'Business major who loves coffee shops, reading, and exploring San Jose. Looking for a female roommate with similar interests.',
      compatibility: 85,
      photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800',
      lookingFor: 'Apartment',
      moveInDate: 'August 2023',
      budget: '$900-1300',
      preferences: {
        smoking: false,
        pets: false,
        drinking: true,
        guests: true,
      },
      lifestyle: {
        cleanliness: 5,
        noise: 2,
        sleepTime: '11PM - 12AM',
        wakeTime: '7AM - 8AM',
        studyHabits: 'Morning studier, can work with music',
        socialLevel: 4,
      },
      verified: true,
    },
    {
      id: '3',
      name: 'David Kim',
      age: 22,
      gender: 'Male',
      university: 'SJSU',
      major: 'Engineering',
      year: 'Senior',
      bio: 'Engineering student who enjoys basketball, hiking, and watching movies. Looking for a laid-back roommate.',
      compatibility: 78,
      photo: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=800',
      lookingFor: 'Shared House',
      moveInDate: 'September 2023',
      budget: '$700-1000',
      preferences: {
        smoking: false,
        pets: true,
        drinking: true,
        guests: true,
      },
      lifestyle: {
        cleanliness: 3,
        noise: 3,
        sleepTime: '1AM - 2AM',
        wakeTime: '9AM - 10AM',
        studyHabits: 'Night owl, needs quiet',
        socialLevel: 4,
      },
      verified: true,
    },
    {
      id: '4',
      name: 'Emily Wong',
      age: 19,
      gender: 'Female',
      university: 'SJSU',
      major: 'Psychology',
      year: 'Freshman',
      bio: 'Psychology major who loves art, music, and going to concerts. Looking for a creative and open-minded roommate.',
      compatibility: 73,
      photo: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=800',
      lookingFor: 'Apartment',
      moveInDate: 'August 2023',
      budget: '$800-1100',
      preferences: {
        smoking: false,
        pets: true,
        drinking: true,
        guests: true,
      },
      lifestyle: {
        cleanliness: 3,
        noise: 4,
        sleepTime: '12AM - 1AM',
        wakeTime: '8AM - 9AM',
        studyHabits: 'Studies with music, can be anywhere',
        socialLevel: 5,
      },
      verified: false,
    },
  ];
  
  const getCompatibilityColor = (compatibility: number) => {
    if (compatibility >= 90) return 'text-green-600';
    if (compatibility >= 80) return 'text-green-500';
    if (compatibility >= 70) return 'text-yellow-600';
    if (compatibility >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  const renderLifestyleLevel = (level: number, max: number = 5) => {
    return (
      <div className="flex">
        {Array.from({ length: max }).map((_, i) => (
          <div
            key={i}
            className={`h-2 w-4 rounded-sm ${
              i < level ? 'bg-primary-500' : 'bg-gray-200'
            } ${i > 0 ? 'ml-1' : ''}`}
          ></div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-navy-900">Roommate Matching</h1>
          <p className="mt-2 text-navy-600">
            Find compatible roommates based on your lifestyle and preferences
          </p>
        </div>
        
        {/* Tabs */}
        <div className="mb-8 flex border-b border-gray-200">
          <button
            onClick={() => setTab('matches')}
            className={`pb-4 pt-2 text-sm font-medium ${
              tab === 'matches'
                ? 'border-b-2 border-primary-500 text-primary-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Matches
          </button>
          <button
            onClick={() => setTab('profile')}
            className={`ml-8 pb-4 pt-2 text-sm font-medium ${
              tab === 'profile'
                ? 'border-b-2 border-primary-500 text-primary-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            My Profile
          </button>
        </div>
        
        {tab === 'matches' ? (
          <>
            {/* Filter options */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex space-x-2">
                <button
                  onClick={() => setDisplayMode('all')}
                  className={`rounded-md px-4 py-2 text-sm font-medium ${
                    displayMode === 'all'
                      ? 'bg-primary-100 text-primary-800'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  All Matches
                </button>
                <button
                  onClick={() => setDisplayMode('liked')}
                  className={`rounded-md px-4 py-2 text-sm font-medium ${
                    displayMode === 'liked'
                      ? 'bg-primary-100 text-primary-800'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Liked
                </button>
                <button
                  onClick={() => setDisplayMode('matched')}
                  className={`rounded-md px-4 py-2 text-sm font-medium ${
                    displayMode === 'matched'
                      ? 'bg-primary-100 text-primary-800'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Mutual Matches
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-navy-600">Filter by:</span>
                <select className="select">
                  <option>All Universities</option>
                  <option>SJSU Only</option>
                  <option>Santa Clara University</option>
                </select>
              </div>
            </div>
            
            {/* Roommate profiles */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {roommateProfiles.map((profile) => (
                <div key={profile.id} className="overflow-hidden rounded-xl bg-white shadow-card transition-shadow hover:shadow-lg">
                  {/* Header with photo */}
                  <div className="relative h-48">
                    <img
                      src={profile.photo}
                      alt={profile.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                      <h3 className="text-xl font-semibold">{profile.name}</h3>
                      <p className="text-sm">
                        {profile.age} • {profile.gender} • {profile.major}
                      </p>
                    </div>
                    {profile.verified && (
                      <div className="absolute right-4 top-4 rounded-full bg-white/90 px-2 py-1 text-xs font-medium">
                        <div className="flex items-center">
                          <Check className="mr-1 h-3 w-3 text-green-500" />
                          <span>Verified Student</span>
                        </div>
                      </div>
                    )}
                    <div className="absolute left-4 top-4 rounded-full bg-white/90 px-2 py-1 text-xs font-medium">
                      <div className="flex items-center">
                        <span className={getCompatibilityColor(profile.compatibility)}>
                          {profile.compatibility}% Match
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-4">
                    <p className="mb-4 text-sm text-navy-700 line-clamp-2">{profile.bio}</p>
                    
                    <div className="mb-4 space-y-2">
                      <div className="flex items-center text-sm">
                        <Users className="mr-2 h-4 w-4 text-gray-400" />
                        <span className="text-navy-700">Looking for: {profile.lookingFor}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="mr-2 h-4 w-4 text-gray-400" />
                        <span className="text-navy-700">Move-in: {profile.moveInDate}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <DollarSign className="mr-2 h-4 w-4 text-gray-400" />
                        <span className="text-navy-700">Budget: {profile.budget}</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="mb-2 text-sm font-medium text-navy-800">Lifestyle</p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <div className="mb-1 flex items-center justify-between">
                            <span className="text-gray-600">Cleanliness</span>
                            {renderLifestyleLevel(profile.lifestyle.cleanliness)}
                          </div>
                          <div className="mb-1 flex items-center justify-between">
                            <span className="text-gray-600">Noise Level</span>
                            {renderLifestyleLevel(profile.lifestyle.noise)}
                          </div>
                        </div>
                        <div>
                          <div className="mb-1 flex items-center justify-between">
                            <span className="text-gray-600">Social</span>
                            {renderLifestyleLevel(profile.lifestyle.socialLevel)}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Moon className="mr-1 h-3 w-3" />
                            <span>{profile.lifestyle.sleepTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4 flex flex-wrap gap-1">
                      {!profile.preferences.smoking && (
                        <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700">No Smoking</span>
                      )}
                      {profile.preferences.pets && (
                        <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700">Pet Friendly</span>
                      )}
                      {profile.preferences.guests && (
                        <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700">Guests OK</span>
                      )}
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="btn-primary flex-1">
                        <MessageCircle className="mr-1 h-4 w-4" />
                        Message
                      </button>
                      <button className="btn-outline flex-1">View Profile</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="rounded-xl bg-white p-6 shadow-soft">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-navy-900">Your Roommate Profile</h2>
              <p className="text-navy-600">Complete your profile to get better matches</p>
            </div>
            
            <div className="flex flex-col md:flex-row">
              <div className="mb-6 pr-8 md:mb-0 md:w-1/2">
                <h3 className="mb-4 text-lg font-medium text-navy-800">Basic Information</h3>
                
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-navy-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="input mt-1"
                    defaultValue="Samantha Lee"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label htmlFor="age" className="block text-sm font-medium text-navy-700">
                      Age
                    </label>
                    <input
                      type="number"
                      id="age"
                      className="input mt-1"
                      defaultValue="21"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="gender" className="block text-sm font-medium text-navy-700">
                      Gender
                    </label>
                    <select
                      id="gender"
                      className="select mt-1"
                    >
                      <option>Female</option>
                      <option>Male</option>
                      <option>Non-binary</option>
                      <option>Prefer not to say</option>
                    </select>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="major" className="block text-sm font-medium text-navy-700">
                    Major
                  </label>
                  <input
                    type="text"
                    id="major"
                    className="input mt-1"
                    defaultValue="Psychology"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="year" className="block text-sm font-medium text-navy-700">
                    Year
                  </label>
                  <select
                    id="year"
                    className="select mt-1"
                  >
                    <option>Freshman</option>
                    <option>Sophomore</option>
                    <option selected>Junior</option>
                    <option>Senior</option>
                    <option>Graduate</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="bio" className="block text-sm font-medium text-navy-700">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    rows={4}
                    className="input mt-1"
                    defaultValue="Psychology major who loves hiking, reading, and exploring coffee shops. I'm clean, respectful, and looking for a like-minded roommate."
                  ></textarea>
                </div>
              </div>
              
              <div className="md:w-1/2">
                <h3 className="mb-4 text-lg font-medium text-navy-800">Preferences & Lifestyle</h3>
                
                <div className="mb-4">
                  <label htmlFor="lookingFor" className="block text-sm font-medium text-navy-700">
                    Looking For
                  </label>
                  <select
                    id="lookingFor"
                    className="select mt-1"
                  >
                    <option>Apartment</option>
                    <option>Dorm</option>
                    <option>Shared House</option>
                    <option>Have housing, need roommate</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="moveInDate" className="block text-sm font-medium text-navy-700">
                    Move-in Date
                  </label>
                  <input
                    type="month"
                    id="moveInDate"
                    className="input mt-1"
                    defaultValue="2023-08"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="budget" className="block text-sm font-medium text-navy-700">
                    Monthly Budget
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        type="number"
                        id="budgetMin"
                        className="input mt-1"
                        placeholder="Min"
                        defaultValue="800"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        id="budgetMax"
                        className="input mt-1"
                        placeholder="Max"
                        defaultValue="1200"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <p className="mb-2 text-sm font-medium text-navy-700">Lifestyle Preferences</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        id="smoking"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <label htmlFor="smoking" className="ml-2 block text-sm text-navy-700">
                        Smoking allowed
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="pets"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        defaultChecked
                      />
                      <label htmlFor="pets" className="ml-2 block text-sm text-navy-700">
                        Pets allowed
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="guests"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        defaultChecked
                      />
                      <label htmlFor="guests" className="ml-2 block text-sm text-navy-700">
                        Guests allowed
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <p className="mb-3 text-sm font-medium text-navy-700">Cleanliness Level</p>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    defaultValue="4"
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
                  />
                  <div className="mt-1 flex justify-between text-xs text-navy-600">
                    <span>Relaxed</span>
                    <span>Moderate</span>
                    <span>Very Clean</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <p className="mb-3 text-sm font-medium text-navy-700">Social Level</p>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    defaultValue="3"
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
                  />
                  <div className="mt-1 flex justify-between text-xs text-navy-600">
                    <span>Private</span>
                    <span>Balanced</span>
                    <span>Very Social</span>
                  </div>
                </div>
                
                <button className="btn-primary w-full">
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoommateMatching;
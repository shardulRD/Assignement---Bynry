import React, { useState } from 'react';
import { useProfiles } from '../context/ProfileContext';

const SearchFilter = () => {
  const { 
    searchTerm, 
    setSearchTerm,
    filterCriteria,
    setFilterCriteria 
  } = useProfiles();
  
  const [showFilters, setShowFilters] = useState(false);
  
  // Get all unique interests from profiles
  const { profiles } = useProfiles();
  const allInterests = [...new Set(profiles.flatMap(profile => profile.interests))];
  
  // Get all unique cities
  const allCities = [...new Set(profiles.map(profile => {
    const addressParts = profile.address.split(',');
    return addressParts[addressParts.length - 2]?.trim() || '';
  }))].filter(city => city);
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleCityChange = (e) => {
    setFilterCriteria({
      ...filterCriteria,
      city: e.target.value
    });
  };
  
  const handleInterestChange = (interest) => {
    setFilterCriteria(prev => {
      const updatedInterests = prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest];
        
      return {
        ...prev,
        interests: updatedInterests
      };
    });
  };
  
  const resetFilters = () => {
    setSearchTerm('');
    setFilterCriteria({
      city: '',
      interests: []
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-grow">
          <input
            type="text"
            placeholder="Search profiles..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200"
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
          
          {(searchTerm || filterCriteria.city || filterCriteria.interests.length > 0) && (
            <button
              onClick={resetFilters}
              className="bg-red-100 text-red-800 px-4 py-2 rounded hover:bg-red-200"
            >
              Reset
            </button>
          )}
        </div>
      </div>
      
      {showFilters && (
        <div className="mt-4 pt-4 border-t">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <select
                value={filterCriteria.city}
                onChange={handleCityChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Cities</option>
                {allCities.map(city => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Interests
              </label>
              <div className="flex flex-wrap gap-2">
                {allInterests.map(interest => (
                  <button
                    key={interest}
                    onClick={() => handleInterestChange(interest)}
                    className={`px-2 py-1 text-sm rounded ${
                      filterCriteria.interests.includes(interest)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
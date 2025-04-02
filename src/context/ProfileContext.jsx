import React, { createContext, useContext, useState } from 'react';
import { mockProfiles } from '../data/mockProfiles';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ProfileContext = createContext();

export function useProfiles() {
  return useContext(ProfileContext);
}

export function ProfileProvider({ children }) {
  const [profiles, setProfiles] = useLocalStorage('profiles', mockProfiles);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCriteria, setFilterCriteria] = useState({
    city: '',
    interests: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Add a new profile
  const addProfile = (profile) => {
    const newProfile = {
      ...profile,
      id: Date.now(), // Simple way to generate unique IDs
    };
    setProfiles((prev) => [...prev, newProfile]);
    return newProfile;
  };

  // Update an existing profile
  const updateProfile = (updatedProfile) => {
    setProfiles((prev) =>
      prev.map((profile) =>
        profile.id === updatedProfile.id ? updatedProfile : profile
      )
    );
  };

  // Delete a profile
  const deleteProfile = (id) => {
    setProfiles((prev) => prev.filter((profile) => profile.id !== id));
    if (selectedProfile && selectedProfile.id === id) {
      setSelectedProfile(null);
    }
  };

  // Filter profiles based on search term and criteria
  const filteredProfiles = profiles.filter((profile) => {
    const matchesSearchTerm = searchTerm === '' || 
      profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCity = filterCriteria.city === '' ||
      profile.address.toLowerCase().includes(filterCriteria.city.toLowerCase());
    
    const matchesInterests = filterCriteria.interests.length === 0 ||
      profile.interests.some(interest => 
        filterCriteria.interests.includes(interest));
    
    return matchesSearchTerm && matchesCity && matchesInterests;
  });

  const value = {
    profiles,
    filteredProfiles,
    selectedProfile,
    setSelectedProfile,
    searchTerm,
    setSearchTerm,
    filterCriteria,
    setFilterCriteria,
    isLoading,
    setIsLoading,
    error,
    setError,
    addProfile,
    updateProfile,
    deleteProfile
  };

  return (
    <ProfileContext.Provider value={value}>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80">
            <div className="text-lg font-semibold text-blue-600 animate-pulse">
              Loading...
            </div>
          </div>
        )}

        {error && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-100 text-red-700 px-4 py-2 rounded-lg shadow-md">
            {error}
          </div>
        )}

        {children}
      </div>
    </ProfileContext.Provider>
  );
}

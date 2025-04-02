import React from 'react';
import { useProfiles } from '../context/ProfileContext';
import ProfileList from '../components/ProfileList';
import SearchFilter from '../components/SearchFilter';
import Map from '../components/Map';

const Home = () => {
  const { selectedProfile, filteredProfiles } = useProfiles();
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-gray rounded-2xl shadow-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Profile Map Explorer</h1>
        
        <div className="mb-8">
          <Map 
            profile={selectedProfile} 
            allProfiles={selectedProfile ? [selectedProfile] : filteredProfiles} 
            height="400px" 
          />
        </div>
        
        <div className="mb-6">
          <SearchFilter />
        </div>

        <ProfileList />
      </div>
    </div>
  );
};

export default Home;

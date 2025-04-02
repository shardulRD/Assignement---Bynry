import React from 'react';
import ProfileCard from '../components/ProfileCard';
import { useProfiles } from '../context/ProfileContext';

const ProfileList = () => {
  const { filteredProfiles, isLoading, error } = useProfiles();

  if (isLoading) {
    return <div className="text-center p-4">Loading profiles...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">Error: {error}</div>;
  }

  if (filteredProfiles.length === 0) {
    return <div className="text-center p-4">No profiles found matching your criteria.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProfiles.map(profile => (
        <ProfileCard key={profile.id} profile={profile} />
      ))}
    </div>
  );
};

export default ProfileList;
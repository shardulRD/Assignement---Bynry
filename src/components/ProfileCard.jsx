import React from 'react';
import { Link } from 'react-router-dom';
import { useProfiles } from '../context/ProfileContext';

const ProfileCard = ({ profile }) => {
  const { setSelectedProfile } = useProfiles();
  
  const handleSummaryClick = () => {
    setSelectedProfile(profile);
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden transition transform hover:scale-105 hover:shadow-2xl hover:bg-gray-50">
      <div className="flex flex-col items-center p-6">
        
        {/* Profile Image */}
        <img 
          className="h-32 w-32 rounded-full object-cover border-4 border-gray-200 shadow-md transition-transform duration-200 hover:scale-110"
          src={profile.avatar || "/image1.jpg"}
          alt={`${profile.name}'s avatar`}
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = "/image1.jpg"; 
          }}
        />
        
        {/* Profile Info */}
        <h3 className="text-2xl font-semibold text-gray-900 mt-4">{profile.name}</h3>
        <p className="text-gray-600 mt-2 text-center px-4">{profile.description}</p>
        <p className="text-gray-500 text-sm mt-1">{profile.address}</p>

        {/* Buttons */}
        <div className="mt-6 flex w-full justify-center space-x-4">
          <button
            onClick={handleSummaryClick}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg transform hover:scale-105"
          >
            Show on Map
          </button>
          
          <Link 
            to={`/profile/${profile.id}`} 
            className="bg-gray-100 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-200 transition-all duration-300 shadow-lg transform hover:scale-105"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

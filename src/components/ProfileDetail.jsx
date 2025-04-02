import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useProfiles } from '../context/ProfileContext';
import Map from './Map';
import Loading from './Loading';

const ProfileDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profiles, isLoading, error } = useProfiles();
  
  if (isLoading) {
    return <Loading />;
  }
  
  if (error) {
    return (
      <div className="text-center p-6">
        <div className="text-red-500 mb-4">Error: {error}</div>
        <Link to="/" className="text-blue-500 hover:underline">
          Return to Home
        </Link>
      </div>
    );
  }
  
  const profile = profiles.find(p => p.id === parseInt(id));
  
  if (!profile) {
    return (
      <div className="text-center p-6">
        <div className="text-xl font-semibold mb-4">Profile not found</div>
        <Link to="/" className="text-blue-500 hover:underline">
          Return to Home
        </Link>
      </div>
    );
  }
  
  return (
    <div className="max-w-6xl mx-auto p-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-all duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back
      </button>
      
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden transition-transform hover:scale-105 hover:shadow-2xl">
        <div className="md:flex">
          <div className="md:w-1/3">
            <img
              src={profile.avatar || "https://via.placeholder.com/300x300"}
              alt={`${profile.name}'s avatar`}
              className="w-full h-64 md:h-full object-cover rounded-t-3xl md:rounded-none shadow-lg"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/300x300?text=No+Image";
              }}
            />
          </div>
          
          <div className="md:w-2/3 p-6">
            <h1 className="text-3xl font-semibold text-gray-900">{profile.name}</h1>
            <p className="text-gray-600 mt-2">{profile.description}</p>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-700">Contact Information</h2>
                <ul className="mt-2 space-y-2">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span>{profile.address}</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span>{profile.email}</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span>{profile.phone}</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold text-gray-700">Interests</h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {profile.interests.map(interest => (
                    <span
                      key={interest}
                      className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
                
                <h2 className="text-lg font-semibold text-gray-700 mt-4">Social Links</h2>
                <div className="mt-2 space-y-1">
                  {Object.entries(profile.socialLinks).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={`https://${url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-blue-600 hover:text-blue-800 transition-all duration-200"
                    >
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Location</h2>
          <Map profile={profile} height="300px" />
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;

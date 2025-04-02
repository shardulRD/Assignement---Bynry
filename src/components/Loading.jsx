import React from 'react';

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-screen bg-gray-100">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
      {/* Message */}
      <p className="text-lg font-medium text-gray-700">{message}</p>
      {/* Add a subtle fade-in effect for the message */}
    </div>
  );
};

export default Loading;

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useProfiles } from '../../context/ProfileContext';

const ProfileForm = ({ profile, onCancel }) => {
  const { addProfile, updateProfile } = useProfiles();
  const isEditing = !!profile;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Set default values for the form
  const defaultValues = isEditing ? {
    ...profile,
    // Convert interests and social links for form handling
    interests: profile.interests.join(', '),
    linkedin: profile.socialLinks.linkedin || '',
    github: profile.socialLinks.github || '',
    twitter: profile.socialLinks.twitter || '',
    // Add other social platforms as needed
  } : {
    name: '',
    avatar: '',
    description: '',
    address: '',
    email: '',
    phone: '',
    interests: '',
    linkedin: '',
    github: '',
    twitter: '',
    // Default coordinates (can be updated when address is geocoded)
    coordinates: [0, 0]
  };

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      // Format the data
      const formattedProfile = {
        ...(isEditing && { id: profile.id }),
        name: data.name,
        avatar: data.avatar,
        description: data.description,
        address: data.address,
        coordinates: data.coordinates, // In a real app, you'd geocode the address
        email: data.email,
        phone: data.phone,
        interests: data.interests.split(',').map(i => i.trim()).filter(i => i),
        socialLinks: {
          linkedin: data.linkedin,
          github: data.github,
          twitter: data.twitter,
          // Add other social platforms as needed
        },
        // If this is a new profile, add a totalUsers field (for demo)
        ...(isEditing ? {} : { totalUsers: Math.floor(Math.random() * 1000) + 100 })
      };

      // For real implementation, you might want to geocode the address here
      // For this demo, we'll use random coordinates if not editing
      if (!isEditing) {
        // Generate random-ish coordinates (for demo only)
        formattedProfile.coordinates = [
          Math.random() * 180 - 90, // latitude
          Math.random() * 360 - 180  // longitude
        ];
      }

      if (isEditing) {
        updateProfile(formattedProfile);
      } else {
        addProfile(formattedProfile);
      }

      // Call the onCancel function to go back to the profiles list
      onCancel();
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-6">
        {isEditing ? 'Edit Profile' : 'Add New Profile'}
      </h2>

      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 rounded">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Avatar URL
            </label>
            <input
              type="text"
              {...register('avatar')}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/avatar.jpg"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              rows="3"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              {...register('address', { required: 'Address is required' })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="123 Main St, City, State"
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="text"
              {...register('phone')}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="(555) 123-4567"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Interests (comma separated)
            </label>
            <input
              type="text"
              {...register('interests')}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Coding, Reading, Travel"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              LinkedIn
            </label>
            <input
              type="text"
              {...register('linkedin')}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="linkedin.com/in/username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              GitHub
            </label>
            <input
              type="text"
              {...register('github')}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="github.com/username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Twitter
            </label>
            <input
              type="text"
              {...register('twitter')}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="twitter.com/username"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              isEditing ? 'Update Profile' : 'Create Profile'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
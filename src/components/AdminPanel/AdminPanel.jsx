import React, { useState } from "react";
import { useProfiles } from "../../context/ProfileContext";
import ProfileForm from "./ProfileForm";

const AdminPanel = () => {
  const { profiles, deleteProfile } = useProfiles();
  const [editingProfile, setEditingProfile] = useState(null);
  const [isAddingProfile, setIsAddingProfile] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [profileToDelete, setProfileToDelete] = useState(null);

  const handleEdit = (profile) => {
    setEditingProfile(profile);
    setIsAddingProfile(false);
  };

  const handleAddNew = () => {
    setEditingProfile(null);
    setIsAddingProfile(true);
  };

  const handleCancel = () => {
    setEditingProfile(null);
    setIsAddingProfile(false);
  };

  const confirmDelete = (profile) => {
    setProfileToDelete(profile);
    setIsDeleteConfirmOpen(true);
  };

  const handleDelete = () => {
    if (profileToDelete) {
      deleteProfile(profileToDelete.id);
      setIsDeleteConfirmOpen(false);
      setProfileToDelete(null);
    }
  };

  const cancelDelete = () => {
    setIsDeleteConfirmOpen(false);
    setProfileToDelete(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <button
            onClick={handleAddNew}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add New Profile
          </button>
        </div>

        {(isAddingProfile || editingProfile) ? (
          <ProfileForm profile={editingProfile} onCancel={handleCancel} />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  {["Profile", "Description", "Location", "Actions"].map(
                    (header) => (
                      <th
                        key={header}
                        className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {profiles.map((profile, index) => (
                  <tr
                    key={profile.id}
                    className={`hover:bg-gray-50 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-12 w-12 flex-shrink-0">
                          <img
                            className="h-12 w-12 rounded-full object-cover border border-gray-300"
                            src={profile.avatar || "https://via.placeholder.com/150"}
                            alt=""
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/150?text=?";
                            }}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {profile.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {profile.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {profile.description}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {profile.address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-3">
                      <button
                        onClick={() => handleEdit(profile)}
                        className="text-indigo-600 hover:text-indigo-900 transition duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => confirmDelete(profile)}
                        className="text-red-600 hover:text-red-900 transition duration-200"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete confirmation modal */}
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-6 text-gray-700">
              Are you sure you want to delete the profile for{" "}
              <span className="font-semibold text-red-600">
                {profileToDelete?.name}
              </span>
              ? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;

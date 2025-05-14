import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function UserProfile() {
  const { user } = useSelector((state) => state.auth);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    phoneNumber: user.phoneNumber,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleToggleEdit = () => {
    setEditMode((prev) => !prev);
  };

  const handleSave = () => {
    // tutaj można dodać zapytanie do API lub dispatch do Redux
    setEditMode(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-2xl space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-800">User Profile</h2>
          <button
            onClick={handleToggleEdit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition"
          >
            {editMode ? "Cancel" : "Edit"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-500 mb-1">Username</label>
            {editMode ? (
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            ) : (
              <p className="text-gray-800 font-medium">{user.username}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-500 mb-1">Email</label>
            {editMode ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            ) : (
              <p className="text-gray-800 font-medium">{user.email}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-500 mb-1">Phone Number</label>
            {editMode ? (
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            ) : (
              <p className="text-gray-800 font-medium">{user.phoneNumber}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-500 mb-1">Roles</label>
            <ul className="text-gray-800 font-medium list-disc list-inside">
              {user.roles.map((role, index) => (
                <li key={index}>{role}</li>
              ))}
            </ul>
          </div>
        </div>

        {editMode && (
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl text-sm font-semibold transition"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

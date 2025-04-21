import React, { useState } from "react";
import { Upload } from "lucide-react";
import Avatar from "../../assets/Avatar.png";

const ProfileSettings = () => {
  const [profileData, setProfileData] = useState({
    name: "Sam",
    email: "sam@gmail.com",
    phone: "+1 23232324223",
    profileImage: Avatar,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("Saving profile data:", profileData);
    // Handle save functionality here
  };

  return (
    <div className="max-w-7xl font-inter p-4 md:p-[40px] overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 mb-2">
          Profile Settings
        </h1>
      </div>

      <div className="p-6 bg-white">
        {/* Profile Information Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-4 h-8 rounded-[4px] bg-purple-300`}></div>
            <h2 className="text-sm font-medium">Profile information</h2>
          </div>

          {/* Profile Picture */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-8">
            <div className="relative">
              <img
                src={profileData.profileImage}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover"
              />
            </div>

            {/* For mobile: flex-col (stacked vertically), For desktop: flex-row (original layout) */}
            <div className="flex flex-col md:flex-row gap-3 mt-4 md:mt-0">
              <button className="flex items-center justify-center gap-2 bg-black text-white px-3 py-1.5 text-sm rounded-lg">
                <Upload size={14} />
                <span>Upload new picture</span>
              </button>

              <button className="border border-gray-300 px-3 py-1.5 text-sm rounded-lg text-gray-700">
                Remove
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-6 max-w-lg">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-gray-500 text-sm mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={profileData.name}
                onChange={handleInputChange}
                className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-gray-500 text-sm mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
                className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>

            {/* Phone Number Field */}
            <div>
              <label
                htmlFor="phone"
                className="block text-gray-500 text-sm mb-2"
              >
                Number
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={profileData.phone}
                onChange={handleInputChange}
                className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div>
          <button
            onClick={handleSave}
            className="bg-black text-white px-4 py-2 text-sm rounded-lg hover:bg-gray-800 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;

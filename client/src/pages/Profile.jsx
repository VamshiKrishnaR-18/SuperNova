import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/api';

const Profile = () => {
  const { user, logout } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await apiService.getProfile();
      if (response.success) {
        setProfileData(response.user);
      }
    } catch (error) {
      console.error('Failed to load profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-10 py-20">
        <div className="flex justify-center items-center h-64">
          <div className="text-xl">Loading profile...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto flex gap-8 px-10 py-20">
      {/* Sidebar */}
      <aside className="w-1/4 sticky top-20 h-[80vh] w-[220px] overflow-y-auto bg-white shadow-md rounded-lg p-6">
        {/* Profile Picture */}
        <div className="text-center mb-6">
          <img
            src={profileData?.picture || '/images/default-avatar.png'}
            alt="User Avatar"
            className="w-24 h-24 rounded-full mx-auto shadow-lg border-2 border-gray-300"
          />
          <h2 className="text-2xl font-semibold mt-4 text-gray-800">
            {profileData?.fullname || user?.fullname}
          </h2>
          <p className="text-sm text-gray-500">
            {profileData?.email || user?.email}
          </p>
          <button 
            onClick={handleLogout}
            className="text-red-500 mt-4 block hover:text-red-600 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          <a href="#profile" className="block py-2 px-3 rounded-md bg-blue-100 text-blue-700 font-medium">
            Profile Information
          </a>
          <a href="#orders" className="block py-2 px-3 rounded-md text-gray-700 hover:bg-gray-100">
            Order History
          </a>
          <a href="#settings" className="block py-2 px-3 rounded-md text-gray-700 hover:bg-gray-100">
            Account Settings
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="w-3/4">
        <div className="bg-white shadow-md rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-6">Profile Information</h1>
          
          {/* Profile Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="p-3 bg-gray-50 rounded-md border">
                {profileData?.fullname || user?.fullname}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="p-3 bg-gray-50 rounded-md border">
                {profileData?.email || user?.email}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Number
              </label>
              <div className="p-3 bg-gray-50 rounded-md border">
                {profileData?.contact || 'Not provided'}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Member Since
              </label>
              <div className="p-3 bg-gray-50 rounded-md border">
                {profileData?.createdAt ? new Date(profileData.createdAt).toLocaleDateString() : 'N/A'}
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Cart Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-800">Items in Cart</h3>
                <p className="text-2xl font-bold text-blue-600">
                  {profileData?.cart?.length || 0}
                </p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium text-green-800">Total Orders</h3>
                <p className="text-2xl font-bold text-green-600">
                  {profileData?.orders?.length || 0}
                </p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-medium text-purple-800">Account Status</h3>
                <p className="text-lg font-semibold text-purple-600">Active</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="border-t pt-6 mt-6">
            <div className="flex gap-4">
              <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors">
                Edit Profile
              </button>
              <button className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;

import React from 'react';
import { useNavigate } from 'react-router-dom';
      
const Profile = ({ user, setUser }) => {
  const navigate = useNavigate();
        
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');    
    navigate('/');
  };

  return (  
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-900 text-white rounded-2xl shadow-lg">

      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
      <p><strong>Username:</strong> {user?.username}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <button
        onClick={handleLogout}
        className="mt-6 bg-red-600 hover:bg-red-500 px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;

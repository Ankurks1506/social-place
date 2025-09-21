import React, { useState, useEffect } from 'react'; // Import React, useState, useEffect for state and lifecycle
 // Import Tailwind CSS styles
 import { useNavigate,Link } from 'react-router-dom';
import './influencerSignup.css';

const Profile = () => { // Define Profile component
  const [profileData, setProfileData] = useState(null); // State to store fetched profile data
  const [error, setError] = useState(''); // State for error messages

  // Fetch profile data on mount
  useEffect(() => { // Run on component mount
    fetchProfile(); // Call fetchProfile
  }, []); // Empty dependency array for mount-only

  // Fetch profile data from backend
  const fetchProfile = async () => { // Async function to fetch data
    const token = localStorage.getItem('token'); // Get JWT from localStorage
    if (!token) { // Check if token exists
      setError('You must be logged in to view your profile'); // Set error
      return;
    }
    try { // Try block for error handling
      const response = await fetch('http://localhost:5000/influencers/me', { // GET user's influencer profile
        headers: { Authorization: `Bearer ${token}` } // Include JWT in header
      });
      if (response.ok) { // Check if response is successful
        const data = await response.json(); // Parse response
        setProfileData(data); // Set profile data
        setError(''); // Clear errors
      } else { // Handle error
        const errorData = await response.json(); // Parse error response
        setError(errorData.message || 'Failed to fetch profile'); // Set error message
        setProfileData(null); // Clear profile data
      }
    } catch (err) { // Catch network errors
      setError('Server error, please try again later'); // Set error message
      setProfileData(null); // Clear profile data
    }
  };

  return ( // Render JSX
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-teal-900 text-white flex flex-col items-center justify-center p-6 relative mb-4"> 
      <h2 className="text-2xl font-bold mb-4">Influencer Profile</h2> 
      
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {profileData && ( // Conditionally render profile data
        <div className="border p-4 rounded"> 
          <h3 className="text-lg font-semibold">{profileData.accountName}</h3>
          <img
            src={`http://localhost:5000${profileData.profileImage}`} // Image URL from backend
            alt="Profile" // Alt text
            className="w-32 h-32 object-cover rounded-full my-2" // Styling
          />
          <p><strong>Email:</strong> {profileData.email}</p> 
          <p><strong>YouTube:</strong> <a href={profileData.youtubeLink} className="text-blue-500">{profileData.youtubeLink}</a></p> 
          <p><strong>Instagram:</strong> <a href={profileData.instagramLink} className="text-blue-500">{profileData.instagramLink}</a></p> 
          <p><strong>Followers:</strong> {profileData.followers}</p> 
          <p><strong>Category:</strong> {profileData.category}</p>
        </div>
      )}

      <button
        
        className="mb-4 text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-xl px-8 py-4 text-center " // Styling
      >
        <Link to="/home" >HOME</Link>
        
        
      </button>
    </div>
  ); // Close return
};

export default Profile; // Export component
import React, { useState, useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom';



const NavBar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState('');

  // Check login status and fetch user email on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp * 1000 < Date.now()) {
          localStorage.removeItem('token');
          setUserEmail(null);
          return;
        }
        // Fetch user email
        fetch('https://social-place-backend.vercel.app/me', {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Failed to fetch user email data');
          })
          .then(data => setUserEmail(data.email))
          .catch(err => {
            setError('Failed to fetch email data');
            localStorage.removeItem('token');
            setUserEmail(null);
          });
      } catch (err) {
        setError('Invalid token');
        localStorage.removeItem('token');
        setUserEmail(null);
      }
      try {
        
        // Fetch user email
        fetch('http://localhost:5000/influencers/me', {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Failed to fetch user profile data');
          })
          .then(data => setUserProfile(data))
          .catch(err => {
            //setError('NO INFLUENCER PROFILE');
            
            setUserProfile(null);
          });
      } catch (err) {
        
        setUserEmail(null);
      }

      
      
    }
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserEmail(null);
    setIsDropdownOpen(false);
    navigate('/');
  };

  const handleLogin = () => {
    setIsDropdownOpen(false);
    navigate('/signin');
  };

  return (
    
    <div className="flex flex-row-reverse space-x-4 space-x-reverse ...">
      
     
       
      
      <div className="bg-gray-800 text-white p-4 rounded-lg  ">
        
        
        <div className="relative">
          
          <button
            onClick={toggleDropdown}
            className="flex items-center focus:outline-none"
            aria-label="User menu"
          >
            <div className="text-xl font-bold">User profile</div>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-mauto text-black rounded-md shadow-lg py-1 z-10">
              {userEmail ? (
                <>
                  <p className="bg-teal-800 text-white p-4 rounded-lg">{userEmail}</p>
                  <button
                    onClick={handleLogout}
                    className="w-full text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 shadow-lg shadow-teal-500/50 font-medium rounded-lg text-xl px-8 py-4 text-center mb-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={handleLogin}
                  className="w-full text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 shadow-lg shadow-teal-500/50 font-medium rounded-lg text-xl px-8 py-4 text-center mb-2"
                >
                  Login
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      {error && (
        <p className="text-red-500 text-center mt-2">{error}</p>
      )}
      
      <button className="bg-gray-800 text-white p-4 rounded-lg text-xl font-bold ">{userProfile ? (
                <>
                  <Link to="/profile" >Influencer Profile</Link>
                </>
              ) : (
                <Link to="/influencersignup" >create Influencer Profile</Link>
              )}</button>
      
    </div>

  );
};

export default NavBar;

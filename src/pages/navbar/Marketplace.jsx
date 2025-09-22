
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfluencerProfile from '../influencersingnup/InfluencerProfiles'; // Assuming this component exists as previously provided


const Marketplace = () => {
  const [influencers, setInfluencers] = useState([]); // State to store all influencers
  const [selectedFollowers, setSelectedFollowers] = useState([]); // State to store selected follower options
  const [selectedCategories, setSelectedCategories] = useState([]); // State to store selected category options
  const [filteredInfluencers, setFilteredInfluencers] = useState([]); // State to store filtered influencers

  // Arrays of options for filters
  const followerOptions = ['100k', '500k', '1million', '5million', '10million'];
  const categoryOptions = ['tech', 'gaming', 'entertainment'];

  // Fetch all influencers on component mount
  useEffect(() => {
    axios.get('https://social-place-backend.vercel.app/influencerprofile')
      .then(res => {
        setInfluencers(res.data); // Update state with fetched data
        setFilteredInfluencers(res.data); // Initially show all influencers
      })
      .catch(err => console.error('Error fetching influencers:', err)); // Log errors
  }, []);

  // Effect to filter influencers based on selected followers and categories
  useEffect(() => {
    if (selectedFollowers.length === 0 && selectedCategories.length === 0) {
      setFilteredInfluencers(influencers); // Show all if no selections
    } else {
      // Filter influencers matching any selected follower count and/or category
      const filtered = influencers.filter(inf => 
        (selectedFollowers.length === 0 || selectedFollowers.some(option => 
          inf.followers.toLowerCase() === option.toLowerCase())) &&
        (selectedCategories.length === 0 || selectedCategories.some(cat => 
          inf.category.toLowerCase() === cat.toLowerCase()))
      );
      setFilteredInfluencers(filtered); // Update filtered list
    }
  }, [selectedFollowers, selectedCategories, influencers]); // Re-run on selection or data change

  // Handler to toggle a follower option
  const handleFollowerToggle = (option) => {
    if (selectedFollowers.includes(option)) {
      setSelectedFollowers(selectedFollowers.filter(f => f !== option)); // Remove if selected
    } else {
      setSelectedFollowers([...selectedFollowers, option]); // Add if not selected
    }
  };

  // Handler to toggle a category option
  const handleCategoryToggle = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category)); // Remove if selected
    } else {
      setSelectedCategories([...selectedCategories, category]); // Add if not selected
    }
  };

  // Handler to clear all selections
  const handleClearFilters = () => {
    setSelectedFollowers([]); // Reset follower selections
    setSelectedCategories([]); // Reset category selections
  };

  return (
    <div style={{
      background: 'linear-gradient(to bottom, #0f172a, #0c453bff)', // Set gradient background
      minHeight: '100vh', // Ensure full viewport height
      padding: '20px', // Add padding
      color: 'white' // Set text color
    }}>
      <h1 style={{ textAlign: 'center', fontSize: '2.5em', fontWeight: 'bold' }}>Influencers</h1>
      
      {/* Container for multi-select filter buttons */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          {/* Follower filter buttons */}
          {followerOptions.map(option => (
            <button
              key={option}
              onClick={() => handleFollowerToggle(option)} // Toggle follower selection
              style={{
                background: selectedFollowers.includes(option) ? '#46cea8ff' : '#004455ff', // Darker if selected
                color: 'white', // White text
                border: 'none', // No border
                borderRadius: '9999px', // Rounded button
                padding: '10px 20px', // Padding
                margin: '0 5px', // Margin between buttons
                cursor: 'pointer' // Pointer cursor
              }}
            >
              {option}
            </button>
          ))}
        </div>
        <div style={{ marginBottom: '10px' }}>
          {/* Category filter buttons */}
          {categoryOptions.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryToggle(category)} // Toggle category selection
              style={{
                background: selectedCategories.includes(category) ?'#46cea8ff' : '#004455ff', // Darker if selected
                color: 'white', // White text
                border: 'none', // No border
                borderRadius: '9999px', // Rounded button
                padding: '10px 20px', // Padding
                margin: '0 5px', // Margin between buttons
                cursor: 'pointer' // Pointer cursor
              }}
            >
              {category}
            </button>
          ))}
        </div>
        {/* Clear button to reset filters */}
        <button
          onClick={handleClearFilters} // Clear all selections
          style={{
            background: '#5fa1ffff', // Gray background
            color: 'white', // White text
            border: 'none', // No border
            borderRadius: '9999px', // Rounded
            padding: '8px 16px', // Smaller padding
            cursor: 'pointer' // Pointer cursor
          }}
        >
          Clear 
        </button>
      </div>

      {/* Display filtered influencers */}
      <div style={{
        display: 'flex', // Use flexbox
        flexWrap: 'wrap', // Allow wrapping
        justifyContent: 'center', // Center items
        gap: '20px' // Space between cards
      }}>
        {filteredInfluencers.map(inf => (
          <InfluencerProfile key={inf.id} influencer={inf} /> // Render profile component
        ))}
      </div>
    </div>
  );
};

export default Marketplace;

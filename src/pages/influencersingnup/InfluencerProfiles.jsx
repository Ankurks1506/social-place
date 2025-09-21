import React from 'react';

const InfluencerProfile = ({ influencer }) => {
  return (
     <div > 

      
      {/*error && <p className="text-red-500 mb-4">{error}</p>*/}
      {influencer && ( // Conditionally render profile data
        <div className="border p-4 rounded"> 
          <h3 className="text-lg font-semibold">{influencer.accountName}</h3>
          <img
            src={`http://localhost:5000${influencer.profileImage}`} // Image URL from backend
            alt="Profile" // Alt text
            className="w-32 h-32 object-cover rounded-full my-2" // Styling
          />
          <p><strong>Email:</strong> {influencer.email}</p> 
          <p><strong>YouTube:</strong> <a href={influencer.youtubeLink} className="text-blue-500">{influencer.youtubeLink}</a></p> 
          <p><strong>Instagram:</strong> <a href={influencer.instagramLink} className="text-blue-500">{influencer.instagramLink}</a></p> 
          <p><strong>Followers:</strong> {influencer.followers}</p> 
          <p><strong>Category:</strong> {influencer.category}</p>
        </div>
      )}

    
    </div>
  );
};

export default InfluencerProfile;
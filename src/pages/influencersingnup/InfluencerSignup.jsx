import React, { useState } from 'react'; // Import React and useState for form state
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import "./influencerSignup.css"


const InfluencerSignup = () => { // Define signup form component
  const navigate = useNavigate(); // Initialize navigation hook
  // Initialize form state
  const [formData, setFormData] = useState({ // State for form fields
    youtubeLink: '', // YouTube link
    instagramLink: '', // Instagram link
    accountName: '', // Account name
    email: '', // Email address
    profileImage: null, // Profile image file
    followers: '', // Followers dropdown
    category: '' // Category dropdown
  });
  const [error, setError] = useState(''); // State for error messages
  const [success, setSuccess] = useState(''); // State for success messages

  // Handle input changes
  const handleChange = (e) => { // Change handler for inputs
    const { name, value, files } = e.target; // Destructure event target
    if (name === 'profileImage' && files[0]) { // If file input
      setFormData(prev => ({ ...prev, [name]: files[0] })); // Update state with file
    } else { // For text/select inputs
      setFormData(prev => ({ ...prev, [name]: value })); // Update state with value
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => { // Async submit handler
    e.preventDefault(); // Prevent page reload
    setError(''); // Clear previous errors
    setSuccess(''); // Clear previous success

    // Get JWT from localStorage
    const token = localStorage.getItem('token'); // Retrieve token
    if (!token) { // Check if token exists
      setError('You must be logged in to create a profile'); // Set error
      return;
    }

    // Create FormData for API request
    const formDataToSend = new FormData(); // Initialize FormData
    formDataToSend.append('youtubeLink', formData.youtubeLink); // Append YouTube link
    formDataToSend.append('instagramLink', formData.instagramLink); // Append Instagram link
    formDataToSend.append('accountName', formData.accountName); // Append account name
    formDataToSend.append('email', formData.email); // Append email
    formDataToSend.append('profileImage', formData.profileImage); // Append profile image file
    formDataToSend.append('followers', formData.followers); // Append followers
    formDataToSend.append('category', formData.category); // Append category

    try { // Try API call
      const response = await fetch('https://social-place-backend.vercel.app/influencers', { // POST to backend
        method: 'POST', // HTTP method
        headers: { Authorization: `Bearer ${token}` }, // Include JWT in header
        body: formDataToSend // Send FormData
      });
      if (response.ok) { // Check if response is successful
        setSuccess('Account created successfully!'); // Set success message
        setFormData({ // Reset form
          youtubeLink: '',
          instagramLink: '',
          accountName: '',
          email: '',
          profileImage: null,
          followers: '',
          category: ''
        });
        setTimeout(() => navigate('/profile'), 1000); // Navigate to /profile after 1s delay
      } else { // Handle error
        const errorData = await response.json(); // Parse error response
        setError(errorData.message || 'Failed to create account'); // Set error message
      }
    } catch (err) { // Catch network errors
      setError('Server error, please try again later'); // Set error message
    }
  };

  return ( // Render JSX
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-teal-900 text-white flex flex-col items-center justify-center p-6 relative"> 
      <h2 className="text-teal-400 text-5xl font-bold mb-6">INFLUENCER SINGNUP</h2> 
      <h2 className="text-white-400 text-3xl font-bold mb-6">THIS FEATURE IS NOT PUBLIC RIGHT NOW</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>} 
      <form onSubmit={handleSubmit} className="space-y-4"> 
        <label className="block text-left text-teal-300 mb-2">Youtube channel link</label>
        <input // YouTube link input
          type="url" // URL type
          name="youtubeLink" // Name for handler
          value={formData.youtubeLink} // Controlled input
          onChange={handleChange} // Bind change handler
          placeholder="YouTube Account Link" // Placeholder
          className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 " // Tailwind styling
          required // Required field
        />
        <label className="block text-left text-teal-300 mb-2">Instagram account link</label>
        <input // Instagram link input
          type="url" // URL type
          name="instagramLink" // Name
          value={formData.instagramLink} // Controlled
          onChange={handleChange} // Bind handler
          placeholder="Instagram Account Link" // Placeholder
          className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          required // Required
        />
        <label className="block text-left text-teal-300 mb-2">Account name</label>
        <input // Account name input
          type="text" // Text type
          name="accountName" // Name
          value={formData.accountName} // Controlled
          onChange={handleChange} // Bind handler
          placeholder="Account Name" // Placeholder
          className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" // Styling
          required // Required
        />
        <label className="block text-left text-teal-300 mb-2">Email(contact for brand promotions)</label>
        <input // Email input (new field)
          type="email" // Email type for validation
          name="email" // Name
          value={formData.email} // Controlled
          onChange={handleChange} // Bind handler
          placeholder="Email Address" // Placeholder
          className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" // Styling
          required // Required
        />
        <label className="text-teal-300">Profile image</label>
        <input // Profile image input
          type="file" // File type
          name="profileImage" // Name
          onChange={handleChange} // Bind handler
          accept="image/*" // Accept images only
          className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" // Styling
          required // Required
        />
        <label className="block text-left text-teal-300 mb-2">Instagram account link</label>
        <select // Followers dropdown
          name="followers" // Name
          value={formData.followers} // Controlled
          onChange={handleChange} // Bind handler
          className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" // Styling
          required // Required
        >
          <option value="">Select Followers</option> // Default option
          <option value="100k">100k</option> // 100k option
          <option value="500k">500k</option> // 500k
          <option value="1million">1 Million</option> // 1M
          <option value="5million">5 Million</option> // 5M
          <option value="10million">10 Million</option> // 10M
        </select>
        <label className="block text-left text-teal-300 mb-2">Instagram account link</label>
        <select // Category dropdown
          name="category" // Name
          value={formData.category} // Controlled
          onChange={handleChange} // Bind handler
          className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" // Styling
          required // Required
        >
          <option value="">Select Category</option> 
          <option value="tech">Tech</option> 
          <option value="entertainment">Entertainment</option> 
          <option value="gaming">Gaming</option> 
        </select>
        <button // Submit button
          type="submit" // Submit type
          className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-blue-600" // Styling
        >
          Sign Up 
        </button>
      </form>
    </div> // Close container
  ); // Close return
};

export default InfluencerSignup; // Export component

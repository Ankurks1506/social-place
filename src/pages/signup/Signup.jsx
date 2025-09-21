
import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';



const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setSuccess('Account created successfully! Please log in.');
        setFormData({ email: '', password: '' });
        setTimeout(() => navigate('/signin'), 1000); // Redirect to Home
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Signup failed');
      }
    } catch (err) {
      setError('Server error, please try again later');
    }
  };
  
   

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-teal-900 text-white flex flex-col items-center justify-center p-6 relative">
      {/* Navigation */}
      <nav className="w-full max-w-5xl flex justify-between items-center py-4 px-6">
        <div className="text-xl font-bold flex items-center">
          <span className="text-teal-400"><img className="w-10 h-10" src="logo.png" alt="" /></span> social place
        </div>
        
      </nav>

      {/* Signup Form Section */}
      <div>
        
        <h1 className="text-5xl font-bold mb-6">
          <span className="text-teal-400"> Create Your Account </span>
        </h1>
        <form onSubmit={handleSubmit} >
          <div className="mb-4">
            <label htmlFor="name" className="block text-left text-teal-300 mb-2">Username</label>
            <input
              type="text"
              name="username"
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter"
              onChange={handleChange}
              
            />
          </div>
         
          <div className="mb-4">
            <label htmlFor="email" className="block text-left text-teal-300 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter your email"
              onChange={handleChange}
            
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-left text-teal-300 mb-2">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter your password"
              onChange={handleChange}
        
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 shadow-lg shadow-teal-500/50 font-medium rounded-lg text-xl px-8 py-4 text-center mb-2"
          >
            Sign Up
          </button>
          <p className="text-sm text-gray-400 mt-4">
            Already have an account? <Link to="/signin" className="text-teal-300 hover:underline">Sign in</Link>
          </p>
        </form>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute w-64 h-64 bg-teal-600 rounded-full opacity-30 -top-20 -left-20"></div>
        <div className="absolute w-96 h-96 bg-teal-700 rounded-full opacity-20 -bottom- 1 right-200"></div>
      </div>
    </div>
   
  )
}

export default Signup

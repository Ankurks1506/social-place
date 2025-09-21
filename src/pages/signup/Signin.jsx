import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import "./Signup.css"

const Signin = () => {

  const [formData, setFormData] = useState({ email: '', password: '' });  // State for email/password only
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/login', formData);  // Posts to login endpoint
      localStorage.setItem('token', res.data.token);  // Stores token
      navigate('/home');  // Redirects
    } catch (err) {
      alert(err.response.data.msg);
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
          <span className="text-teal-400"> Sign in your acount </span>
        </h1>
        <form onSubmit={handleSubmit}>
         
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
            Sign In
          </button>
          <p className="text-sm text-gray-400 mt-4">
            Don't have an account? <Link to="/signup" className="text-teal-300 hover:underline">Sign up</Link>
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

export default Signin
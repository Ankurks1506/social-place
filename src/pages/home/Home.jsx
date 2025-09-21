import React from "react";
import { useNavigate, Link } from 'react-router-dom';
import "./Home.css"



const Home = () => 
   {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-teal-900 text-white flex flex-col items-center justify-center p-6 relative">

      <nav className="max-w-7xl mx-full flex justify-between items-center py-4">
        <div className="text-xl font-bold flex items-center fontsize-100">
        <img className="w-20 h-20" src="logo.png" alt="" /> <h1 className="text-3xl font-bold mb-4">
          <span className="text-teal-400">SOCIAL PLACE</span>
        </h1>
        
        
        </div>
    
        
      </nav>
      <div className="absolute w-64 h-64 bg-teal-600 rounded-full opacity-30 -top-20 -left-20"></div>
      <div className="absolute w-96 h-96 bg-teal-700 rounded-full opacity-20 right-20"></div>
        


      <div className="text-center mt-16 relative z-10">
      
        <h1 className="text-5xl font-bold mb-4">

          <span  className="hover:text-teal-100">CONNECT INFLUENCERS TO BRANDS</span>
        </h1>
          
      </div>
      <div className="text-center mt-16 relative z-10">
      <button type="button" className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-xl px-8 py-4 text-center me-2 mb-2">
         <Link to="/signup" >Sign up</Link>
      </button>

      <button type="button" className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-xl px-8 py-4 text-center me-2 mb-2">
           <Link to="/signin" >Sign in</Link>
      </button>
      </div>


     
    </div>
  );
}


export default Home
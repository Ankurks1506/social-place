import React from 'react'
import "./Landing.css"
import { CgProfile } from "react-icons/cg";
import NavBar from '../navbar/Navbar';
import Market from '../marketplace/market';
import { useNavigate,Link } from 'react-router-dom';



const Header = () => (


  <header className="flex justify-between items-center p-4 ">
    <div ><img className="w-20 h-20" src="logo.png" alt="" /></div>
    
      
       
          
          
     
      
    
    <NavBar/>
     {/*<Navbar/> */}
     
    
  
    
    
    

  </header>
);





const Landing = () => {
  
  
  return (
    <div className="bg-gradient-to-b from-teal-900 to-black min-h-screen text-white">
      <Header />
      <main className="flex flex-col items-center text-center py-10">
        <h1 className="text-5xl font-bold mb-4">SOCIAL PLACE</h1>
        <p className="text-gray-300 mb-8">DIRECTLY CONNECT BRANDS,PROMOTERS AND MARKETING TEAMS TO INFLUENCERS NO MIDDLEMAN</p>
        <button className="bg-gray-200 hover:bg-gray-300 text-teal-900 font-bold py-3 px-6 rounded-lg mb-10"><Link to="/marketplace">MARKETPLACE</Link></button>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
          
        </div>
      </main>
      <Market/>
      
    </div>
   
  )
  
}

export default Landing
import './App.css'
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/home/Home';

import Signup from './pages/signup/Signup';
import Signin from './pages/signup/Signin';
import Landing from './pages/landing/Landing';
import InfluencerSignup from './pages/influencersingnup/InfluencerSignup';
import CreatorProfile from './pages/influencersingnup/CreatorProfile';
import Market from './pages/marketplace/market';






function App() {

 const router = createBrowserRouter([
    {
      path: "/",
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/signup",
          element: <Signup/>,
        },
        {
          path: "/signin",
          element: <Signin/>,
        },
        {
          path: "/home",
          element: <Landing/>,
        },
        {
          path: "/influencersignup",
          element: <InfluencerSignup/>,
        },
        {
          path: "/profile",
          element: <CreatorProfile/>,
        },
        {
          path: "/marketplace",
          element: <Market/>,
        },
        
       
      ],
    },
  ]);

  function ProtectedRoute({ children }) {
  // Get token from localStorage (set on login)
  const token = localStorage.getItem('token');
  // If no token, redirect to login; else render children
  return token ? children : <Navigate to="/login" />;
  }

  

  return <RouterProvider router={router} />;
}



export default App

/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Provider } from 'react-redux';

import './App.scss'
import { 
  HomePage,
  DescriptionPage,
} from './pages'

import { store } from './states';

function App() {

  const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  const googleMapsApiKey = import.meta.env.GOOGLE_MAPS_API_KEY;
  const hereAppId = import.meta.env.GOOGLE_MAPS_APP_ID;
  const hereApiKey = import.meta.env.GOOGLE_MAPS_API_KEY;

  if (!publishableKey) {
    throw new Error("Missing Publishable Key")
  }

  useEffect(() => {
    

    const getLocation = () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            console.log(latitude, " " ,longitude)
            
            // GET CITY NAME USING HERE API
            // const data = getCityName(12.9141, 74.8560);
            // return res.status(200).json(data);
            // STORE LOCATION IN DATABASE
            // storeLocationInDatabase(latitude, longitude);
          },
          (error) => {
            console.error('Error getting location:'+ error.message);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    const userLocation = localStorage.getItem("userLocation")
    if(!userLocation) {
      getLocation();
    }
  }, []);

  const ClerkProviderWithRoutes = () => {
    const navigate = useNavigate();
  
    return (
      <ClerkProvider
        publishableKey={publishableKey}
        navigate={(to) => navigate(to)}>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
          <Routes>
            <Route path="/DescriptionPage" element={<DescriptionPage />} />
          </Routes>
        </ClerkProvider>
      );
  }

  return (
    <>
    <Provider store={store}>
      <BrowserRouter>
        <ClerkProviderWithRoutes />
      </BrowserRouter>
    </Provider>
    </>
    )
}

export default App

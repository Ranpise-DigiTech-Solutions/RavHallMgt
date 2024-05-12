/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

import './App.scss'
import { 
  HomePage,
  DescriptionPage,
  } from './pages'
import {
  fetchCitiesOfCountryData,
  fetchEventTypesData,
  fetchVendorTypesData,
  fetchCountriesData
} from "./states/Data";
import { ProfileForm, Dashboard,MyCart, Notification, Favorites, SettingsComponent, HallForm } from './components';


function App() {

  const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  const googleMapsApiKey = import.meta.env.GOOGLE_MAPS_API_KEY;
  const hereAppId = import.meta.env.GOOGLE_MAPS_APP_ID;
  const hereApiKey = import.meta.env.GOOGLE_MAPS_API_KEY;

  const dispatch = useDispatch();

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

  useEffect(()=> {

    try {
      const fetchData = () => {
        dispatch(fetchCitiesOfCountryData("India"));
        dispatch(fetchEventTypesData);
        dispatch(fetchVendorTypesData);
        dispatch(fetchCountriesData);
      };
      fetchData();
    } catch(error) {
      console.error("Couldn't fetch data :- ", error.message);
    }

  }, [dispatch]);

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
          <Routes>
            <Route path="/ProfileForm" element={<ProfileForm />} />
          </Routes>
          <Routes>
            <Route path="/Dashboard" element={<Dashboard />} />
          </Routes>
          <Routes>
            <Route path="/YourCart" element={<MyCart />} />
          </Routes>
          <Routes>
            <Route path="/Notifications" element={<Notification />} />
          </Routes> 
          <Routes>
            <Route path="/Favourites" element={<Favorites />} />
          </Routes> 
          <Routes>
            <Route path="/Settings" element={<SettingsComponent />} />
          </Routes>
          <Routes>
            <Route path="/ServiceDetails" element={<HallForm />} />
          </Routes>
          
        </ClerkProvider>
      );
  }

  return (
    <>
        <BrowserRouter>
          <ClerkProviderWithRoutes />
        </BrowserRouter>
    </>
    )
}

export default App

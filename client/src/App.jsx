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
  const hereApiId = import.meta.env.GOOGLE_MAPS_API_KEY;
  const hereApiKey = import.meta.env.GOOGLE_MAPS_API_KEY;

  if (!publishableKey) {
    throw new Error("Missing Publishable Key")
  }

  useEffect(() => {
    function getCityName(latitude, longitude) {
      const apiUrl = `https://reverse.geocode.search.hereapi.com/v1/revgeocode?at=${latitude},${longitude}&apiKey=${hereApiId}&appCode=${hereApiKey}`;
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          // if (data.results && data.results.length > 0) {
          //   const addressComponents = data.results[0];
          //   console.log(addressComponents);
          //   // const cityName = addressComponents.find(component => component.types.includes('locality')).long_name;
          //   // const countryName = addressComponents.find(component => component.types.includes('country')).long_name;
          //   // console.log('City Name:', cityName);
          //   // console.log('Country Name:', countryName);
          // } else {
          //   console.error('No address components found in the API response.');
          // }
          const location = data.items[0].address;
          const city = location.city;
          const country = location.countryName;

          console.log(`City: ${city}, Country: ${country}`);
        })
        .catch(error => console.error('Error:', error));
    }

    const getLocation = () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            console.log(latitude, " " ,longitude)
            // getCityName(latitude, longitude);
            // storeLocationInDatabase(latitude, longitude);
          },
          (error) => {
            // console.error('Error getting location:', error);
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

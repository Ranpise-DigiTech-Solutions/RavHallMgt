import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios'

import SearchIcon from '@mui/icons-material/Search';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

import "./SearchBar.scss";

export default function SearchBar() {

  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  const apiURL = `https://countriesnow.space/api/v0.1/countries/cities`;
  const postData = {
    'country' : 'india'
  }

  useEffect(() => {

    const fetchCities = async () => {
      try {

        // await axios.post(apiURL, postData)
        // .then((response) => {
        //   // Handle success
        //   console.log('Response:', response.data.data);
        //   setCities(response.data.data);
        // })
        // .catch((error) => {
        //   // Handle error
        //   console.error('Error:', error);
        // });
        
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();
  }, []);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: 'none',
      padding: 0,
      margin: 0,
      cursor: PointerEvent,
      boxShadow: state.isFocused ? 'none' : provided.boxShadow
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      '& svg': {
        display: 'none', // Hide the default arrow icon
      },
      padding: 10,
    }),
  };

  return (
    <div className="search__container">
      <div className="main__wrapper">
        <div className="title">
          search package
        </div>
        <div className="description">
          Find best Wedding Vendors with, <br /> thousands of trusted Reviews
        </div>
        <div className="sub__wrapper">
          <div className="wrapper">
            <p>Destination</p>
            <div className="input">
              <Select
                styles={customStyles}
                options={cities.map((city) => ({ value: city, label: city }))}
                value={selectedCity}
                onChange={(selectedOption) => setSelectedCity(selectedOption)}
                placeholder="Select or type a city..."
                components={{
                  DropdownIndicator: () => <SearchIcon />
                }}
                isSearchable
              />
            </div>
          </div>
          <div className="wrapper">
            <p>Date</p>
            <div className="input ">
              <input type="date" placeholder="dd-mm-yyyy" />
            </div>
          </div>
          <div className="wrapper">
            <p>Budget</p>
            <div className="input">
            <Select
                styles={customStyles}
                // options={cities.map((city) => ({ value: city, label: city }))}
                // value={selectedCity}
                // onChange={(selectedOption) => setSelectedCity(selectedOption)}
                placeholder="Choose Your Budget..."
                components={{
                  DropdownIndicator: () => <CurrencyRupeeIcon />
                }}
              />
              {/* <CurrencyRupeeIcon/> */}
            </div>
          </div>
          <div className="wrapper">
            <p>Vendor Type</p>
            <div className="input">
              <Select
                styles={customStyles}
                // options={cities.map((city) => ({ value: city, label: city }))}
                // value={selectedCity}
                // onChange={(selectedOption) => setSelectedCity(selectedOption)}
                placeholder="Choose Your Budget..."
                components={{
                  DropdownIndicator: () => <CurrencyRupeeIcon />
                }}
              />
            </div>
          </div>
          <div className="search__icon">
            <button><SearchIcon/></button>
          </div>
        </div>
      </div>
    </div>
  );
}

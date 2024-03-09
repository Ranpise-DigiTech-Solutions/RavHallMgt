import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios'

import SearchIcon from '@mui/icons-material/Search';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';

import "./SearchBar.scss";

export default function SearchBar() {

  const [cities, setCities] = useState([]);
  const [budget, setBudget] = useState(['5L-10L', '10L-20L', '20L-30L']);
  const [vendorType, setVendorType] = useState(['option_1', 'option_2', 'option_3']);
  
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);


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

  const handleDateChange = event => {
    setSelectedDate(event.target.value);
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
        <div className="sub__wrapper_1">
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
              <input type="date" value={selectedDate} placeholder="dd-mm-yyyy" onChange={handleDateChange}/>
            </div>
          </div>
          <div className="wrapper">
            <p>Budget</p>
            <div className="input">
            <Select
                styles={customStyles}
                options={budget.map((val) => ({ value: val, label: val }))}
                value={selectedBudget}
                onChange={(selectedOption) => setSelectedBudget(selectedOption.value)}
                placeholder="Choose Your Budget..."
                components={{
                  DropdownIndicator: () => <CurrencyRupeeIcon />
                }}
              />
            </div>
          </div>
          <div className="wrapper">
            <p>Vendor Type</p>
            <div className="input">
              <Select
                styles={customStyles}
                options={vendorType.map((val) => ({ value: val, label: val }))}
                value={selectedVendor}
                onChange={(selectedOption) => setSelectedVendor(selectedOption.value)}
                placeholder="Choose Vendor Type"
                components={{
                  DropdownIndicator: () => <KeyboardArrowDownIcon />
                }}
              />
            </div>
          </div>
          <div className="search__icon">
            <button><SearchIcon/></button>
          </div>
        </div>
        <div className="sub__wrapper_2">
          {
            selectedCity && 
            <div className="tag">
              <p>{selectedCity}</p>
                <CloseIcon className='icon' onClick={() => setSelectedCity(null)}/>
            </div>
          }
          {
            selectedDate && 
            <div className="tag">
              <p>{selectedDate}</p>
                <CloseIcon className='icon' onClick={() => setSelectedDate('')}/>
            </div>
          }
          {
            selectedBudget && 
            <div className="tag">
              <p>{selectedBudget}</p>
                <CloseIcon className='icon' onClick={() => setSelectedBudget(null)}/>
            </div>
          }
          {
            selectedVendor && 
            <div className="tag">
              <p>{selectedVendor}</p>
                <CloseIcon className='icon' onClick={() => setSelectedVendor(null)}/>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

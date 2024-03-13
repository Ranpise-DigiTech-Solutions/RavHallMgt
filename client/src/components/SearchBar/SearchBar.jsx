/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import axios from 'axios'

import SearchIcon from '@mui/icons-material/Search';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';

import { searchBoxFilterActions } from '../../states/SearchBoxFilter';

import "./SearchBar.scss";

export default function SearchBar() {

  const [cities, setCities] = useState([]);
  const [budget, setBudget] = useState(['5L-10L', '10L-20L', '20L-30L']);
  const [vendorType, setVendorType] = useState([]);
  
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);

  const dispatch = useDispatch();

  // const handleUpdate = () => {
  //   dispatch(searchBoxFilterActions('data1', 'new value for data1'));
  //   dispatch(searchBoxFilterActions('data2', 'new value for data2'));
  // };


  useEffect(() => {

    const fetchCities = async () => {
      try {

        const URL = "http://localhost:8000/eventify_server/countriesNow/";

        await axios.get(URL)
        .then((response) => {
          // Handle success
          setCities(response.data);
          console.log('Response:', typeof(cities));
        })
        .catch((error) => {
          // Handle error
          console.error('Error:', error);
        });
        
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    setVendorType([
      'All Categories',
      'Wedding Venues',
      'Wedding Photographers',
      'Bridal Makeup Artist',
      'Wedding Decorators',
      'Wedding Planners',
      'Bridal Mehendi Artist',
      'Wedding Catering',
      'Wedding Cards',
      'DJ',
      'Wedding Entertainment',
      'Sangeet Choreographers',
      'Pre Wedding Photographers'
    ]);

    fetchCities();
  }, [cities]);

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
                onChange={(selectedOption) => setSelectedCity(selectedOption.value)}
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
          <div className="search__icon" >
            <button>
              <a href="#packages">
                <SearchIcon/>
              </a>
            </button>
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

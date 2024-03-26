import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import axios from "axios";

import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";

import { VirtualizedSelect } from "../../sub-components";
import { searchBoxFilterActions } from "../../states/SearchBoxFilter";

import "./SearchBar.scss";

export default function SearchBar() {
  const [cities, setCities] = useState([]);
  const [eventType, setEventType] = useState([]);
  const [vendorType, setVendorType] = useState([]);

  const searchBoxFilterStore = useSelector((state) => state.searchBoxFilter); // Redux Store which holds all the user selection info. which includes cityName, eventType, bookingDate and vendorType

  const dispatch = useDispatch();

  const handleDateChange = (event) => {
    dispatch(searchBoxFilterActions("bookingDate", event.target.value));
  };

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const URL = "http://localhost:8000/eventify_server/countriesNow/";

        await axios
          .get(URL)
          .then((response) => {
            // Handle success
            setCities(response.data);
          })
          .catch((error) => {
            // Handle error
            console.error("Error:", error);
          });

      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    const fetchEventTypes = async () => {
      try {
        const URL = "http://localhost:8000/eventify_server/eventMaster/";

         await axios
          .get(URL)
          .then((response) => {
            // Handle success
            setEventType(response.data);
          })
          .catch((error) => {
            // Handle error
            console.error("Error:", error);
          });

      } catch (error) {
        console.error("Error Fetching Cities:", error);
      }
    }

    setVendorType([
      "All Categories",
      "Wedding Venues",
      "Wedding Photographers",
      "Bridal Makeup Artist",
      "Wedding Decorators",
      "Wedding Planners",
      "Bridal Mehendi Artist",
      "Wedding Catering",
      "Wedding Cards",
      "DJ",
      "Wedding Entertainment",
      "Sangeet Choreographers",
      "Pre Wedding Photographers",
    ]);

    fetchCities();
    fetchEventTypes();
  }, [cities]);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: "none",
      padding: 0,
      margin: 0,
      cursor: PointerEvent,
      boxShadow: state.isFocused ? "none" : provided.boxShadow,
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      "& svg": {
        display: "none", // Hide the default arrow icon
      },
      padding: 10,
    }),
  };

  return (
    <div className="search__container" id="searchBar">
      <div className="main__wrapper">
        <div className="title">search package</div>
        <div className="description">
          Find best Wedding Vendors with, <br /> thousands of trusted Reviews
        </div>
        <div className="sub__wrapper_1">
          <div className="wrapper">
            <p>Destination</p>
            <div className="input">
              <VirtualizedSelect 
                customStyles={customStyles}
                options={cities.map((city) => ({ value: city, label: city }))}
                value={searchBoxFilterStore.cityName}
                onChange={(selectedOption) => {
                  dispatch(
                    searchBoxFilterActions("cityName", selectedOption.value)
                  ); // Update Details in 'SearchBoxFilter' Redux Store
                }}
                placeholder="Select or type a city..."
              />
            </div>
          </div>
          <div className="wrapper">
            <p>Date</p>
            <div className="input ">
              <input
                type="date"
                value={searchBoxFilterStore.bookingDate}
                placeholder="dd-mm-yyyy"
                onChange={handleDateChange}
              />
            </div>
          </div>
          <div className="wrapper">
            <p>Event Type</p>
            <div className="input">
              <Select
                styles={customStyles}
                options={eventType.map((item) => ({ value: item.event_name, label: item.event_name }))}
                value={searchBoxFilterStore.eventType}
                onChange={(selectedOption) => {
                  dispatch(
                    searchBoxFilterActions("eventType", selectedOption.value)
                  ); // Update Details in 'SearchBoxFilter' Redux Store
                }}
                placeholder="Choose Event Type"
                components={{
                  DropdownIndicator: () => <KeyboardArrowDownIcon />,
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
                value={searchBoxFilterStore.vendorType}
                onChange={(selectedOption) => {
                  dispatch(
                    searchBoxFilterActions("vendorType", selectedOption.value)
                  ); // Update Details in 'SearchBoxFilter' Redux Store
                }}
                placeholder="Choose Vendor Type"
                components={{
                  DropdownIndicator: () => <KeyboardArrowDownIcon />,
                }}
              />
            </div>
          </div>
          <div className="search__icon">
            <button>
              <a href="#packages">
                <SearchIcon />
              </a>
            </button>
          </div>
        </div>
        <div className="sub__wrapper_2">
          {searchBoxFilterStore.cityName && (
            <div className="tag">
              <p>{searchBoxFilterStore.cityName}</p>
              <CloseIcon
                className="icon"
                onClick={() => {
                  dispatch(searchBoxFilterActions("cityName", "")); // Update Details in 'SearchBoxFilter' Redux Store
                }}
              />
            </div>
          )}
          {searchBoxFilterStore.bookingDate && (
            <div className="tag">
              <p>{searchBoxFilterStore.bookingDate}</p>
              <CloseIcon
                className="icon"
                onClick={() => {
                  dispatch(searchBoxFilterActions("bookingDate", "")); // Update Details in 'SearchBoxFilter' Redux Store
                }}
              />
            </div>
          )}
          {searchBoxFilterStore.eventType && (
            <div className="tag">
              <p>{searchBoxFilterStore.eventType}</p>
              <CloseIcon
                className="icon"
                onClick={() => {
                  dispatch(searchBoxFilterActions("eventType", "")); // Update Details in 'SearchBoxFilter' Redux Store
                }}
              />
            </div>
          )}
          {searchBoxFilterStore.vendorType && (
            <div className="tag">
              <p>{searchBoxFilterStore.vendorType}</p>
              <CloseIcon
                className="icon"
                onClick={() => {
                  dispatch(searchBoxFilterActions("vendorType", "")); /// Update Details in 'SearchBoxFilter' Redux Store
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

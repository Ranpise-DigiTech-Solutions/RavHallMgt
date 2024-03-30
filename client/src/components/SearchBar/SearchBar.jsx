import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import SearchIcon from "@mui/icons-material/Search";
// import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import WarningIcon from "@mui/icons-material/Warning";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";

import { VirtualizedSelect } from "../../sub-components";
import { searchBoxFilterActions } from "../../states/SearchBoxFilter";

import {
  fetchCitiesData,
  fetchEventTypesData,
  fetchVendorTypesData,
} from "../../states/Data";
import "./SearchBar.scss";

export default function SearchBar() {
  const data = useSelector((state) => state.data); // CITIES, EVENT_TYPES & VENDOR_TYPES data
  const [eventNotSelectedWarning, setEventNotSelectedWarning] = useState(false);

  const searchBoxFilterStore = useSelector((state) => state.searchBoxFilter); // Redux Store which holds all the user selection info. which includes cityName, eventType, bookingDate and vendorType

  const dispatch = useDispatch();

  const handleDateChange = (event) => {
    dispatch(searchBoxFilterActions("bookingDate", event.target.value));
  };

  useEffect(() => {
    try {
      const fetchData = () => {
        dispatch(fetchCitiesData);
        dispatch(fetchEventTypesData);
        dispatch(fetchVendorTypesData);
      };
      fetchData();
    } catch (error) {
      console.error(error.message);
    }
  }, [dispatch]);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: "none",
      padding: 0,
      margin: 0,
      cursor: "pointer",
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
                options={
                  Array.isArray(data.cities.data)
                    ? data.cities.data.map((city) => ({
                        value: city,
                        label: city,
                      }))
                    : null
                }
                value={
                  searchBoxFilterStore.cityName
                    ? {
                        label: searchBoxFilterStore.cityName,
                        value: searchBoxFilterStore.cityName,
                      }
                    : null
                }
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
                options={
                  Array.isArray(data.eventTypes.data)
                    ? data.eventTypes.data.map((item) => ({
                        value: item.event_name,
                        label: item.event_name,
                      }))
                    : null
                }
                value={
                  searchBoxFilterStore.eventType
                    ? {
                        label: searchBoxFilterStore.eventType,
                        value: searchBoxFilterStore.eventType,
                      }
                    : null
                }
                onChange={(selectedOption) => {
                  dispatch(
                    searchBoxFilterActions("eventType", selectedOption.value)
                  ); // Update Details in 'SearchBoxFilter' Redux Store
                }}
                placeholder="Choose Event Type"
                components={{
                  DropdownIndicator: () => <KeyboardArrowDownIcon />,
                }}
                menuShouldScrollIntoView={false}
                closeMenuOnSelect
                isSearchable
              />
            </div>
          </div>
          <div className="wrapper">
            <p>Vendor Type</p>
            <div className="input">
              <Select
                styles={customStyles}
                options={
                  Array.isArray(data.vendorTypes.data)
                    ? data.vendorTypes.data.map((val) => ({
                        value: val.vendor_type,
                        label: val.vendor_type,
                      }))
                    : null
                }
                value={
                  searchBoxFilterStore.vendorType
                    ? {
                        label: searchBoxFilterStore.vendorType,
                        value: searchBoxFilterStore.vendorType,
                      }
                    : null
                }
                onChange={(selectedOption) => {
                  if (searchBoxFilterStore.eventType) {
                    dispatch(
                      searchBoxFilterActions(
                        "vendorType",
                        selectedOption ? selectedOption.value : ""
                      )
                    ); // Update Details in 'SearchBoxFilter' Redux Store
                  } else {
                    setEventNotSelectedWarning(true);
                  }
                }}
                placeholder="Choose Vendor Type"
                components={{
                  DropdownIndicator: () => <KeyboardArrowDownIcon />,
                }}
                menuShouldScrollIntoView={false}
                closeMenuOnSelect
                isSearchable
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
      {eventNotSelectedWarning && (
        <Dialog
          open={eventNotSelectedWarning}
          onClose={() => setEventNotSelectedWarning(false)}
          className="warningDialog__container"
        >
          <DialogTitle id="alert-dialog-title">
            <WarningIcon className="warning__icon" />
            <p>Warning!</p>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Your event is not selected. Please select an event before
              proceeding!!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setEventNotSelectedWarning(false)}
              color="primary"
              autoFocus
              className="agree__btn"
            >
              ok
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}

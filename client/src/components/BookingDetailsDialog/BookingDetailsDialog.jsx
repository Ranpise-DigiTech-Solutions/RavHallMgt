import "./BookingDetailsDialog.scss";

import { useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import Select from "react-select";

import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import PersonIcon from "@mui/icons-material/Person";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BusinessIcon from "@mui/icons-material/Business";
import PlaceIcon from "@mui/icons-material/Place";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import BedIcon from "@mui/icons-material/Bed";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import EmailIcon from "@mui/icons-material/Email";
import MessageIcon from "@mui/icons-material/Message";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { FaLandmark, FaCar } from "react-icons/fa";
import { GiSandsOfTime } from "react-icons/gi";

export default function BookingDetailsDialog({ open, handleClose, hallData }) {
  const dataStore = useSelector((state) => state.data); // CITIES, EVENT_TYPES & VENDOR_TYPES data
  const bookingInfoStore = useSelector((state) => state.bookingInfo); // user Booking information
  const userInfoStore = useSelector((state) => state.userInfo); // user Authentication information

  const [formProgress, setFormProgress] = useState(0);
  const [formType, setFormType] = useState("FORM_ONE"); // FORM_ONE, FORM_TWO, FORM_THREE, FORM_FOUR
  const [submissionConfirmationDialog, setSubmissionConfirmationDialog] =
    useState(false);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      fontSize: "15px",
      minHeight: "32px",
      padding: 0,
      margin: 0,
      cursor: "pointer",
      border: "none",
      outline: "none",
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
    placeholder: (provided) => ({
      ...provided,
      color: "#999999", // Change the placeholder color here
    }),
  };

  const bookingDetailsTemplate = {
    eventTypeInfo: {
      eventType: "",
      eventTypeId: "",
    },
    guestsCount: null,
    roomsCount: null,
    parkingRequirement: {
      label: "Yes",
      value: true,
    },
    vehiclesCount: null,
    expectedVegRate: null,
    expectedNonVegRate: null,
    vegMenu: [],
    nonVegMenu: [],
    catererRequirement: {
      label: "Yes",
      value: true,
    },
    customerSuggestion: "",
  };

  // object storing user's booking requirements
  const [bookingDetails, setBookingDetails] = useState({
    ...bookingDetailsTemplate,
  });

  const handleSubmissionConfirmationDialogOpen = () => {
    setSubmissionConfirmationDialog(true);
  };

  const handleSubmissionConfirmationDialogClose = () => {
    setSubmissionConfirmationDialog(false);
  };

  const handleBookingDetailsInfo = (key, value) => {
    setBookingDetails((previousInfo) => ({
      ...previousInfo,
      [key]: value,
    }));
  };

  console.log(hallData);

  const handlePrevBtnClick = () => {
    switch (formType) {
      case "FORM_ONE":
        break;
      case "FORM_TWO":
        setFormProgress(0);
        setFormType("FORM_ONE");
        break;
      case "FORM_THREE":
        setFormProgress(25);
        setFormType("FORM_TWO");
        break;
      case "FORM_FOUR":
        setFormProgress(50);
        setFormType("FORM_THREE");
        break;
      default:
        break;
    }
  };

  const handleNextBtnClick = () => {
    switch (formType) {
      case "FORM_ONE":
        setFormProgress(25);
        setFormType("FORM_TWO");
        break;
      case "FORM_TWO":
        setFormProgress(50);
        // validateFormTwo();
        setFormType("FORM_THREE");
        break;
      case "FORM_THREE":
        setFormProgress(75);
        // validateFormThree();
        setFormType("FORM_FOUR");
        break;
      case "FORM_FOUR":
        handleSubmissionConfirmationDialogOpen();
        break;
      default:
        break;
    }
  };

  const handleFormSubmit = () => {
    setFormType("FORM_ONE");
    handleClose();
    try {
    //   const [year, month, day] = bookingInfoStore.bookingDate.split('/').map(Number);
    // const [startHour, startMinute] = bookingInfoStorestartTime.split(':').map(Number);

      // const postData = {
      //   hallId: hallData._id,
      //   hallCity: hallData.hallCity,
      //   vendorTypeId: "6612e8bddfb65ff32fa575f1",
      //   bookingTimeStamp: 
      // }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} keepMounted onClose={()=> {
      setFormType("FORM_ONE");
      handleClose();
    }} maxWidth="md">
      <Dialog
        open={submissionConfirmationDialog}
        onClose={handleSubmissionConfirmationDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Booking ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Before proceeding, please verify that the details entered are
            correct to the best of your knowledge. Click &apos;OK&apos; to
            confirm and proceed with the booking, or &apos;Cancel&apos; to
            review your details once again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmissionConfirmationDialogClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleSubmissionConfirmationDialogClose();
              handleFormSubmit();
            }}
            autoFocus
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      <div className="bookingDetailsMain__container">
        <div>
          <h1 className="heading">booking form</h1>
          <h6 className="sub-heading">Fill in the below details to continue</h6>
        </div>
        <div className="navigationTabs__wrapper">
          <div
            className={`navigationTab ${
              formType !== "FORM_ONE" ? "form__completed" : "current__form"
            }`}
          >
            <div className="tabHeading">hall details</div>
            <div className="wrapper">
              <div className="sub-wrapper">
                <PersonIcon className="icon" />
                <p className="stepCount">step 1</p>
              </div>
              <div className="btn">
                {formType !== "FORM_ONE" ? "Completed" : "Pending"}
              </div>
            </div>
          </div>
          <div
            className={`navigationTab ${
              formType !== "FORM_ONE" &&
              (formType === "FORM_TWO" ? "current__form" : "form__completed")
            }`}
          >
            <div className="tabHeading">preferences</div>
            <div className="wrapper">
              <div className="sub-wrapper">
                <PersonIcon className="icon" />
                <p className="stepCount">step 2</p>
              </div>
              <div className="btn">
                {formType === "FORM_THREE" || formType === "FORM_FOUR"
                  ? "Completed"
                  : "Pending"}
              </div>
            </div>
          </div>
          <div
            className={`navigationTab ${
              formType === "FORM_THREE"
                ? "current__form"
                : formType === "FORM_FOUR" && "form__completed"
            }`}
          >
            <div className="tabHeading">user details</div>
            <div className="wrapper">
              <div className="sub-wrapper">
                <PersonIcon className="icon" />
                <p className="stepCount">step 3</p>
              </div>
              <div className="btn">
                {formType === "FORM_FOUR" ? "Completed" : "Pending"}
              </div>
            </div>
          </div>
          <div
            className={`navigationTab ${
              formType === "FORM_FOUR" && "current__form"
            }`}
          >
            <div className="tabHeading">date & time</div>
            <div className="wrapper">
              <div className="sub-wrapper">
                <PersonIcon className="icon" />
                <p className="stepCount">step 4</p>
              </div>
              <div className="btn">pending</div>
            </div>
          </div>
        </div>
        <div className="form__wrapper">
          {formType === "FORM_ONE" && (
            <div className="container hallDetails__container">
              <div className="inputField__wrapper">
                <div className="title">hall name</div>
                <div className="input__wrapper disabledInput__wrapper">
                  <BusinessIcon className="icon" />
                  <div className="divider"></div>
                  <input
                    type="text"
                    value={hallData?.hallName}
                    className="input"
                    disabled
                    readOnly
                  />
                </div>
              </div>
              <div className="inputFields__wrapper">
                <div className="wrapper">
                  <div className="title">location</div>
                  <div className="input__wrapper disabledInput__wrapper">
                    <PlaceIcon className="icon" />
                    <div className="divider"></div>
                    <input
                      type="text"
                      value={`${hallData?.hallTaluk}, ${hallData?.hallCity}, ${hallData?.hallState}`}
                      className="input"
                      disabled
                      readOnly
                    />
                  </div>
                </div>
                <div className="wrapper">
                  <div className="title">landmark</div>
                  <div className="input__wrapper disabledInput__wrapper">
                    <FaLandmark className="icon" />
                    <div className="divider"></div>
                    <input
                      type="text"
                      value={hallData?.hallLandmark}
                      className="input"
                      disabled
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="inputFields__wrapper">
                <div className="wrapper">
                  <div className="title">seating capacity</div>
                  <div className="input__wrapper disabledInput__wrapper">
                    <EventSeatIcon className="icon" />
                    <div className="divider"></div>
                    <input
                      type="text"
                      value={hallData?.hallCapacity}
                      className="input"
                      disabled
                      readOnly
                    />
                  </div>
                </div>
                <div className="wrapper">
                  <div className="title">No. of Rooms</div>
                  <div className="input__wrapper disabledInput__wrapper">
                    <BedIcon className="icon" />
                    <div className="divider"></div>
                    <input
                      type="text"
                      value={hallData?.hallRooms}
                      className="input"
                      disabled
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="inputFields__wrapper">
                <div className="wrapper">
                  <div className="title">veg food rate</div>
                  <div className="input__wrapper disabledInput__wrapper">
                    <RestaurantIcon className="icon" />
                    <div className="divider"></div>
                    <input
                      type="text"
                      value={hallData?.hallVegRate}
                      className="input"
                      disabled
                      readOnly
                    />
                  </div>
                </div>
                <div className="wrapper">
                  <div className="title">Non-Veg food rate</div>
                  <div className="input__wrapper disabledInput__wrapper">
                    <RestaurantIcon className="icon" />
                    <div className="divider"></div>
                    <input
                      type="text"
                      value={hallData?.hallNonVegRate}
                      className="input"
                      disabled
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="inputField__wrapper half-width">
                <div className="title">Parking Availability</div>
                <div className="input__wrapper disabledInput__wrapper">
                  <LocalParkingIcon className="icon" />
                  <div className="divider"></div>
                  <input
                    type="text"
                    value={hallData?.hallParking ? "Available" : "Unavailable"}
                    className="input"
                    disabled
                    readOnly
                  />
                </div>
              </div>
            </div>
          )}
          {formType === "FORM_TWO" && (
            <div className="container preferences__container">
              <div className="inputFields__wrapper">
                <div className="wrapper">
                  <div className="title">Event Type</div>
                  <div className="input__wrapper">
                    <CurrencyRupeeIcon className="icon" />
                    <div className="divider"></div>
                    <Select
                      styles={customStyles}
                      options={
                        Array.isArray(dataStore.eventTypes.data)
                          ? dataStore.eventTypes.data.map((item) => ({
                              value: item._id,
                              label: item.eventName,
                            }))
                          : null
                      }
                      value={
                        bookingDetails.eventTypeInfo.eventTypeId
                          ? {
                              label: bookingDetails.eventTypeInfo.eventType,
                              value: bookingDetails.eventTypeInfo.eventTypeId,
                            }
                          : null
                      }
                      onChange={(selectedOption) => {
                        const updatedEventInfo = {
                          eventType: selectedOption.label,
                          eventTypeId: selectedOption.value,
                        };
                        handleBookingDetailsInfo(
                          "eventTypeInfo",
                          updatedEventInfo
                        );
                      }}
                      placeholder="Choose Event Type"
                      components={{
                        DropdownIndicator: () => (
                          <KeyboardArrowDownIcon style={{ color: "#007bff" }} />
                        ),
                      }}
                      className="input selectInput"
                      menuShouldScrollIntoView={false}
                      closeMenuOnSelect
                      isSearchable
                    />
                  </div>
                </div>
                <div className="wrapper">
                  <div className="title">Caterer Requirement</div>
                  <div className="input__wrapper">
                    <CurrencyRupeeIcon className="icon" />
                    <div className="divider"></div>
                    <Select
                      styles={customStyles}
                      options={[
                        {
                          value: true,
                          label: "Yes",
                        },
                        {
                          value: false,
                          label: "No",
                        },
                      ]}
                      value={
                        bookingDetails.catererRequirement.value
                          ? {
                              label: bookingDetails.catererRequirement.label,
                              value: bookingDetails.catererRequirement.value,
                            }
                          : null
                      }
                      onChange={(selectedOption) => {
                        const updatedInfo = {
                          label: selectedOption.label,
                          value: selectedOption.value,
                        };
                        handleBookingDetailsInfo(
                          "catererRequirement",
                          updatedInfo
                        );
                      }}
                      placeholder="Do you need a caterer ?"
                      components={{
                        DropdownIndicator: () => (
                          <KeyboardArrowDownIcon style={{ color: "#007bff" }} />
                        ),
                      }}
                      className="input selectInput"
                      menuShouldScrollIntoView={false}
                      closeMenuOnSelect
                      isSearchable={false}
                    />
                  </div>
                </div>
              </div>
              <div className="inputFields__wrapper">
                <div className="wrapper">
                  <div className="title">No. of Guests Required</div>
                  <div className="input__wrapper">
                    <PeopleAltIcon className="icon" />
                    <div className="divider"></div>
                    <input
                      type="number"
                      name="guestsCount"
                      value={bookingDetails.guestsCount}
                      className="input"
                      placeholder="Enter guest count"
                      onChange={(event) =>
                        handleBookingDetailsInfo(
                          "guestsCount",
                          event.target.value
                        )
                      }
                    />
                  </div>
                </div>
                <div className="wrapper">
                  <div className="title">No. of Rooms Required</div>
                  <div className="input__wrapper">
                    <BedIcon className="icon" />
                    <div className="divider"></div>
                    <input 
                      type="number"
                      name="roomCount"
                      value={bookingDetails.roomsCount}
                      className="input"
                      placeholder="Enter room count"
                      onChange={(event)=> handleBookingDetailsInfo("roomsCount", event.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="inputFields__wrapper">
                <div className="wrapper">
                  <div className="title">Parking Requirement</div>
                  <div className="input__wrapper">
                    <LocalParkingIcon className="icon" />
                    <div className="divider"></div>
                    <Select
                      styles={customStyles}
                      options={[
                        {
                          value: true,
                          label: "Yes",
                        },
                        {
                          value: false,
                          label: "No",
                        },
                      ]}
                      value={
                        bookingDetails.parkingRequirement.value
                          ? {
                              label: bookingDetails.parkingRequirement.label,
                              value: bookingDetails.parkingRequirement.value,
                            }
                          : null
                      }
                      onChange={(selectedOption) => {
                        const updatedInfo = {
                          label: selectedOption.label,
                          value: selectedOption.value,
                        };
                        handleBookingDetailsInfo(
                          "parkingRequirement",
                          updatedInfo
                        );
                      }}
                      placeholder="Do your require parking ?"
                      components={{
                        DropdownIndicator: () => (
                          <KeyboardArrowDownIcon style={{ color: "#007bff" }} />
                        ),
                      }}
                      className="input selectInput"
                      menuShouldScrollIntoView={false}
                      closeMenuOnSelect
                      isSearchable={false}
                    />
                  </div>
                </div>
                <div className="wrapper">
                  <div className="title">No. Of Vehicles</div>
                  <div className="input__wrapper">
                    <FaCar className="icon" />
                    <div className="divider"></div>
                    <input 
                      type="number"
                      name="vehiclesCount"
                      value={bookingDetails.vehiclesCount}
                      className="input"
                      placeholder="Enter vehicle count"
                      onChange={(event) => handleBookingDetailsInfo("vehiclesCount", event.target.value)}
                    />
                  </div>
                </div>
              </div>
              {bookingDetails.catererRequirement.value && (
                <>
                  <div className="inputFields__wrapper">
                    <div className="wrapper">
                      <div className="title">Expected Veg Rate/plate</div>
                      <div className="input__wrapper">
                        <CurrencyRupeeIcon className="icon" />
                        <div className="divider"></div>
                        <input 
                          type="number"
                          name="expectedVegRate"
                          value={bookingDetails.expectedVegRate}
                          className="input"
                          placeholder="enter your expected rate/plate"
                          onChange={(event) => handleBookingDetailsInfo("expectedVegRate", event.target.value)}
                        />
                      </div>
                    </div>
                    <div className="wrapper">
                      <div className="title">Expected Non-Veg Rate/plate</div>
                      <div className="input__wrapper">
                        <CurrencyRupeeIcon className="icon" />
                        <div className="divider"></div>
                        <input 
                          type="number"
                          name="expectedNonVegRate"
                          value={bookingDetails.expectedNonVegRate}
                          className="input"
                          placeholder="enter your expected rate/plate"
                          onChange={(event) => handleBookingDetailsInfo("expectedNonVegRate", event.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="inputFields__wrapper">
                    <div className="wrapper">
                      <div className="title">Veg Menu Required</div>
                      <div className="input__wrapper">
                        <RestaurantMenuIcon className="icon" />
                        <div className="textAreaDivider"></div>
                        <textarea
                          type="text"
                          name="vegMenu"
                          value={bookingDetails.vegMenu}
                          placeholder="enter items desired in veg menu"
                          className="input textArea"
                          onChange={(event) => handleBookingDetailsInfo("vegMenu", event.target.value)}
                        />
                      </div>
                    </div>
                    <div className="wrapper">
                      <div className="title">Non-Veg Menu Required</div>
                      <div className="input__wrapper">
                        <RestaurantMenuIcon className="icon" />
                        <div className="textAreaDivider"></div>
                        <textarea
                          type="text"
                          name="nonVegMenu"
                          value={bookingDetails.nonVegMenu}
                          placeholder="enter items desired in veg menu"
                          className="input textArea"
                          onChange={(event) => handleBookingDetailsInfo("nonVegMenu", event.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
          {formType == "FORM_THREE" && (
            <div className="container userDetails__container">
              <div className="inputFields__wrapper">
                <div className="wrapper">
                  <div className="title">First Name</div>
                  <div className="input__wrapper disabledInput__wrapper">
                    <PersonIcon className="icon" />
                    <div className="divider"></div>
                    <input 
                      type="text" 
                      value={userInfoStore.userDetails?.Document?.customerName.split(' ')[0]}
                      className="input"
                      disabled
                      readOnly  
                    />
                  </div>
                </div>
                <div className="wrapper">
                  <div className="title">Last Name</div>
                  <div className="input__wrapper disabledInput__wrapper">
                    <PersonIcon className="icon" />
                    <div className="divider"></div>
                    <input 
                      type="text" 
                      value={userInfoStore.userDetails?.Document?.customerName.split(' ')[1]} 
                      className="input" 
                      disabled  
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="inputField__wrapper">
                <div className="title">Office Contact</div>
                <div className="input__wrapper disabledInput__wrapper">
                  <BusinessIcon className="icon" />
                  <div className="divider"></div>
                  <input
                    type="text"
                    value={userInfoStore.userDetails?.Document?.customerContact}
                    className="input"
                    disabled
                    readOnly
                  />
                </div>
              </div>
              <div className="inputField__wrapper">
                <div className="title">Personal Contact</div>
                <div className="input__wrapper disabledInput__wrapper">
                  <BusinessIcon className="icon" />
                  <div className="divider"></div>
                  <input
                    type="text"
                    value={userInfoStore.userDetails?.Document?.customerContact}
                    className="input"
                    disabled
                    readOnly
                  />
                </div>
              </div>
              <div className="inputField__wrapper">
                <div className="title">Email Id</div>
                <div className="input__wrapper disabledInput__wrapper">
                  <EmailIcon className="icon" />
                  <div className="divider"></div>
                  <input
                    type="text"
                    value={userInfoStore.userDetails?.Document?.customerEmail}
                    className="input"
                    disabled
                    readOnly
                  />
                </div>
              </div>
              <div className="inputField__wrapper">
                <div className="title">Your Message</div>
                <div className="input__wrapper">
                  <MessageIcon className="icon" />
                  <div className="textAreaDivider"></div>
                  <textarea
                    type="text"
                    name="customerSuggestion"
                    value={bookingDetails.customerSuggestion}
                    className="input textArea"
                    placeholder="your message to the hall owner..."
                    onChange={(event)=> handleBookingDetailsInfo("customerSuggestion", event.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
          {formType === "FORM_FOUR" && (
            <div
              className="container dateTime__container"
              style={{ width: "50%" }}
            > 
              <div className="inputField__wrapper">
                <div className="title">Booking Date</div>
                <div className="input__wrapper disabledInput__wrapper">
                  <CalendarMonthIcon className="icon" />
                  <div className="divider"></div>
                  <input
                    type="text"
                    name="bookingDate"
                    value={bookingInfoStore.bookingDate}
                    className="input"
                    disabled
                    readOnly
                  />
                </div>
              </div>
              <div className="inputField__wrapper">
                <div className="title">Start Time</div>
                <div className="input__wrapper disabledInput__wrapper">
                  <AccessAlarmIcon className="icon" />
                  <div className="divider"></div>
                  <input
                    type="text"
                    name="startTime"
                    value={bookingInfoStore.startTime ? bookingInfoStore.startTime : "HH:MM"}
                    className="input"
                    disabled
                  />
                </div>
              </div>
              <div className="inputField__wrapper">
                <div className="title">End Time</div>
                <div className="input__wrapper disabledInput__wrapper">
                  <AccessAlarmIcon className="icon" />
                  <div className="divider"></div>
                  <input
                    type="text"
                    name="endTime"
                    value={bookingInfoStore.endTime ? bookingInfoStore.endTime : "HH:MM"}
                    className="input"
                    disabled
                  />
                </div>
              </div>
              <div className="inputField__wrapper">
                <div className="title">Total Duration</div>
                <div className="input__wrapper disabledInput__wrapper">
                  <GiSandsOfTime className="icon" />
                  <div className="divider"></div>
                  <input
                    name="bookingDuration"
                    type="text"
                    value={bookingInfoStore.bookingDuration ? bookingInfoStore.bookingDuration : "HH:MM"}
                    className="input"
                    disabled
                    readOnly
                  />
                </div>
              </div>
            </div>
          )}
          <div className="lineSeparator"></div>
          <div className="footer__wrapper">
            <div className="progressBar__wrapper">
              <div className="title">
                <p className="mainTitle">Form progress</p>
                <p className="subTitle">{formProgress} % Completed</p>
              </div>
              <div
                className="progressBar"
                role="progressbar"
                aria-valuenow={formProgress}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{
                  width: `${formProgress}%`,
                  backgroundColor: "#007bff",
                  height: "4px",
                }}
              ></div>
            </div>
            <div className="btns__wrapper">
              <div className="caption">* Mandatory Fields</div>
              <button className="btn prevBtn" onClick={handlePrevBtnClick}>
                prev
              </button>
              <button className="btn nextBtn" onClick={handleNextBtnClick}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

BookingDetailsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  hallData: PropTypes.object.isRequired,
};

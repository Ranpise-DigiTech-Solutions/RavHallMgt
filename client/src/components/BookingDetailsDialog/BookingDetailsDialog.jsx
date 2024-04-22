import "./BookingDetailsDialog.scss";

import { useState } from "react";
import PropTypes from "prop-types";

import Dialog from "@mui/material/Dialog";

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
import { FaLandmark, FaCar } from "react-icons/fa";
import { GiSandsOfTime } from "react-icons/gi";

export default function BookingDetailsDialog({ open, handleClose }) {
  const [formProgress, setFormProgress] = useState(0);
  const [formType, setFormType] = useState("FORM_ONE"); // FORM_ONE, FORM_TWO, FORM_THREE, FORM_FOUR

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
        break;
      default:
        break;
    }
  };

  return (
    <Dialog open={open} keepMounted onClose={handleClose} maxWidth="md">
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
                    value={"something"}
                    className="input"
                    disabled
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
                      value={"something"}
                      className="input"
                      disabled
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
                      value={"something"}
                      className="input"
                      disabled
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
                      value={"something"}
                      className="input"
                      disabled
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
                      value={"something"}
                      className="input"
                      disabled
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
                      value={"something"}
                      className="input"
                      disabled
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
                      value={"something"}
                      className="input"
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="inputField__wrapper half-width">
                <div className="title">Parking Avilability</div>
                <div className="input__wrapper disabledInput__wrapper">
                  <LocalParkingIcon className="icon" />
                  <div className="divider"></div>
                  <input
                    type="text"
                    value={"something"}
                    className="input"
                    disabled
                  />
                </div>
              </div>
            </div>
          )}
          {formType === "FORM_TWO" && (
            <div className="container preferences__container">
              <div className="inputFields__wrapper">
                <div className="wrapper">
                  <div className="title">No. of Guests Required</div>
                  <div className="input__wrapper">
                    <PeopleAltIcon className="icon" />
                    <div className="divider"></div>
                    <input type="text" value={"something"} className="input" />
                  </div>
                </div>
                <div className="wrapper">
                  <div className="title">No. of Rooms Required</div>
                  <div className="input__wrapper">
                    <BedIcon className="icon" />
                    <div className="divider"></div>
                    <input type="text" value={"something"} className="input" />
                  </div>
                </div>
              </div>
              <div className="inputFields__wrapper">
                <div className="wrapper">
                  <div className="title">Parking Requirement</div>
                  <div className="input__wrapper">
                    <LocalParkingIcon className="icon" />
                    <div className="divider"></div>
                    <input type="text" value={"something"} className="input" />
                  </div>
                </div>
                <div className="wrapper">
                  <div className="title">No. Of Vehicals</div>
                  <div className="input__wrapper">
                    <FaCar className="icon" />
                    <div className="divider"></div>
                    <input type="text" value={"something"} className="input" />
                  </div>
                </div>
              </div>
              <div className="inputFields__wrapper">
                <div className="wrapper">
                  <div className="title">Expected Veg Rate/plate</div>
                  <div className="input__wrapper">
                    <CurrencyRupeeIcon className="icon" />
                    <div className="divider"></div>
                    <input type="text" value={"something"} className="input" />
                  </div>
                </div>
                <div className="wrapper">
                  <div className="title">Expected Non-Veg Rate/plate</div>
                  <div className="input__wrapper">
                    <CurrencyRupeeIcon className="icon" />
                    <div className="divider"></div>
                    <input type="text" value={"something"} className="input" />
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
                      value={"something"}
                      className="input textArea"
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
                      // value={""}
                      className="input textArea"
                    />
                  </div>
                </div>
              </div>
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
                    <input type="text" value={"something"} className="input" />
                  </div>
                </div>
                <div className="wrapper">
                  <div className="title">Last Name</div>
                  <div className="input__wrapper disabledInput__wrapper">
                    <PersonIcon className="icon" />
                    <div className="divider"></div>
                    <input type="text" value={"something"} className="input" />
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
                    value={"something"}
                    className="input"
                    disabled
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
                    value={"something"}
                    className="input"
                    disabled
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
                    value={"something"}
                    className="input"
                    disabled
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
                    // value={"something"}
                    className="input textArea"
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
                    value={"something"}
                    className="input"
                    disabled
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
                    value={"something"}
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
                    value={"something"}
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
                    type="text"
                    value={"something"}
                    className="input"
                    disabled
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
};

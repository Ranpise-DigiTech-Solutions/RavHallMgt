/* eslint-disable no-unused-vars */
import "./RegistrationForm.scss";
import "react-phone-input-2/lib/style.css";
import React, { useState, useCallback } from "react";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";

import Dialog from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import Slide from "@mui/material/Slide";
import { useTheme } from "@mui/material/styles";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import { FaEdit } from "react-icons/fa";

import { useDropzone } from "react-dropzone";
import PropTypes from "prop-types";

import { Images } from "../../constants";

export default function RegistrationForm({
  open,
  handleClose,
  userType,
  vendorType,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the uploaded files (e.g., display or process them)
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const [formType, setFormType] = useState("FORM_ONE"); //  FORM_ONE, FORM_TWO, FORM_THREE, FORM_FOUR
  const [formContactType, setFormContactType] = useState("PRIMARY"); // PRIMARY or SECONDARY

  const customSelectStyles = {
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
      padding: 0,
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#999999", // Change the placeholder color here
    }),
  };

  const progressBarStyle = {
    position: "relative",
    flex: 1,
    width: "6.5rem",
  };

  const beforeStyle = {
    content: '""',
    position: "absolute",
    top: "-10px",
    left: "0",
    height: "1px",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  };

  const handlePrevBtnClick = () => {
    switch (formType) {
      case "FORM_ONE":
        break;
      case "FORM_TWO":
        setFormType("FORM_ONE");
        break;
      case "FORM_THREE":
        setFormType("FORM_TWO");
        break;
      case "FORM_FOUR":
        setFormType("FORM_THREE");
        break;
      default:
        break;
    }
  };

  const handleNextBtnClick = () => {
    switch (formType) {
      case "FORM_ONE":
        setFormType("FORM_TWO");
        break;
      case "FORM_TWO":
        setFormType("FORM_THREE");
        break;
      case "FORM_THREE":
        if (userType === "CUSTOMER") {
          handleFormSubmit();
          break;
        }
        setFormType("FORM_FOUR");
        break;
      case "FORM_FOUR":
        handleFormSubmit();
        break;
      default:
        break;
    }
  };

  const handleFormContactTypeChange = () => {
    if (formContactType === "PRIMARY") {
      setFormContactType("SECONDARY");
    } else {
      setFormContactType("PRIMARY");
    }
  };

  const handleFormSubmit = async () => {
    alert("Form Submitted!!");
  };

  return (
    <div className="registrationForm__container">
      <Dialog
        // fullScreen={fullScreen}
        open={open}
        // TransitionComponent={Transition}
        keepMounted
        onClose={(event, reason) => {
          if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
            handleClose();
          }
        }}
        // aria-describedby="alert-dialog-slide-description"
        // aria-labelledby="responsive-dialog-title"
        maxWidth="lg"
      >
        <div className="registrationFormMain__wrapper">
          <div className="img__wrapper">
            <div className="companyInfo">
              <img src={Images.logo} alt="EventifyConnect" />
              <p>EventifyConnect</p>
            </div>
            <div className="bgCover">
              <p>
                Let&apos;s get <br /> <span>Started</span>
              </p>
            </div>
            <img
              src={Images.userRegistrationPageBg2}
              alt=""
              style={{
                objectPosition:
                  formType === "FORM_FOUR" ? "center" : "left center",
              }}
            />
          </div>
          <div className="contents__wrapper">
            <div className="formTitle__wrapper">
              <h2 className="form__title">Hall Information</h2>
              <p className="form__sub-title">
                Fill the from to become a part of the team
              </p>
            </div>
            <div className="progressIndicator__wrapper">
              <div className="sub-wrapper currentForm">
                <div className="formNumberIndicator">
                  {formType === "FORM_ONE" ? <span>1</span> : <DoneIcon className="icon"/>}
                </div>
                <p className="tag">Address</p>
              </div>
              <div className="progressBar" style={progressBarStyle}>
                <div
                  style={
                    formType !== "FORM_ONE"
                      ? { ...beforeStyle, backgroundColor: "#007bff" }
                      : beforeStyle
                  }
                ></div>
              </div>
              <div
                className={`sub-wrapper ${
                  formType !== "FORM_ONE" && "currentForm"
                }`}
              >
                <div className="formNumberIndicator">
                  {formType === "FORM_ONE" || formType === "FORM_TWO" ? (
                    <span>2</span>
                  ) : (
                    <DoneIcon />
                  )}
                </div>
                <p className="tag">Register</p>
              </div>
              <div className="progressBar" style={progressBarStyle}>
                <div
                  style={
                    formType !== "FORM_ONE" && formType !== "FORM_TWO"
                      ? { ...beforeStyle, backgroundColor: "#007bff" }
                      : beforeStyle
                  }
                ></div>
              </div>
              <div
                className={`sub-wrapper ${
                  formType !== "FORM_ONE" &&
                  formType !== "FORM_TWO" &&
                  "currentForm"
                }`}
              >
                <div className="formNumberIndicator">
                  {formType !== "FORM_FOUR" ? <span>3</span> : <DoneIcon />}
                </div>
                <p className="tag">Contact</p>
              </div>
              {userType === "VENDOR" && (
                <>
                  <div className="progressBar" style={progressBarStyle}>
                    <div
                      style={
                        formType === "FORM_FOUR"
                          ? { ...beforeStyle, backgroundColor: "#007bff" }
                          : beforeStyle
                      }
                    ></div>
                  </div>
                  <div
                    className={`sub-wrapper ${
                      formType === "FORM_FOUR" && "currentForm"
                    }`}
                  >
                    <div className="formNumberIndicator">
                      {/* {formType === "FORM_FOUR" ? <span>4</span> : <DoneIcon />} */}
                      <span>
                        4
                      </span>
                    </div>
                    <p className="tag">Detailed</p>
                  </div>
                </>
              )}
            </div>
            <form className="form__container">
              {formType === "FORM_ONE" && (
                <div className="userInput__wrapper">
                  {userType === "CUSTOMER" ? (
                    <div className="textField__wrapper">
                      <div className="sub-wrapper">
                        <div className="title">First Name *</div>
                        <input
                          type="text"
                          placeholder="Enter last name"
                          className="input"
                          spellCheck={false}
                        />
                      </div>
                      <div className="sub-wrapper">
                        <div className="title">Last Name *</div>
                        <input
                          type="text"
                          placeholder="Enter last name"
                          className="input"
                          spellCheck={false}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="textField">
                      <label className="title">
                        {vendorType === "Banquet Hall" ? (
                          <span>Hall Name *</span>
                        ) : (
                          <span>Company Name *</span>
                        )}
                      </label>
                      <input
                        type="text"
                        placeholder="Enter hall name"
                        className="input"
                        spellCheck={false}
                      />
                    </div>
                  )}
                  <div className="textField">
                    <div className="title">Address *</div>
                    <input
                      type="text"
                      placeholder="Enter your address"
                      className="input"
                      spellCheck={false}
                    />
                  </div>
                  <div className="textField">
                    <div className="title">Landmark *</div>
                    <input
                      type="text"
                      placeholder="Enter the landmark"
                      className="input"
                      spellCheck={false}
                    />
                  </div>
                  <div className="textField__wrapper">
                    <div className="sub-wrapper">
                      <div className="title">Country *</div>
                      <Select
                        styles={customSelectStyles}
                        placeholder="Select your country"
                        className="selectInput"
                        components={{
                          DropdownIndicator: () => (
                            <KeyboardArrowDownIcon
                              style={{ color: "#007bff" }}
                            />
                          ),
                        }}
                        menuShouldScrollIntoView={false}
                        hideSelectedOptions={false}
                        closeMenuOnSelect
                        isClearable={false}
                        isSearchable
                      />
                    </div>
                    <div className="sub-wrapper">
                      <div className="title">State *</div>
                      <Select
                        styles={customSelectStyles}
                        placeholder="Select your state"
                        className="selectInput"
                        components={{
                          DropdownIndicator: () => (
                            <KeyboardArrowDownIcon
                              style={{ color: "#007bff" }}
                            />
                          ),
                        }}
                        menuShouldScrollIntoView={false}
                        hideSelectedOptions={false}
                        closeMenuOnSelect
                        isClearable={false}
                        isSearchable
                      />
                    </div>
                  </div>
                  <div className="textField__wrapper">
                    <div className="sub-wrapper">
                      <div className="title">City *</div>
                      <Select
                        styles={customSelectStyles}
                        placeholder="Select your city"
                        className="selectInput"
                        components={{
                          DropdownIndicator: () => (
                            <KeyboardArrowDownIcon
                              style={{ color: "#007bff" }}
                            />
                          ),
                        }}
                        menuShouldScrollIntoView={false}
                        hideSelectedOptions={false}
                        closeMenuOnSelect
                        isClearable={false}
                        isSearchable
                      />
                    </div>
                    <div className="taluk sub-wrapper">
                      <div className="title">Taluk *</div>
                      <Select
                        styles={customSelectStyles}
                        placeholder="Select your taluk"
                        className="selectInput"
                        components={{
                          DropdownIndicator: () => (
                            <KeyboardArrowDownIcon
                              style={{ color: "#007bff" }}
                            />
                          ),
                        }}
                        menuShouldScrollIntoView={false}
                        hideSelectedOptions={false}
                        closeMenuOnSelect
                        isClearable={false}
                        isSearchable
                      />
                    </div>
                  </div>
                  <div className="textField pinCode__wrapper">
                    <div className="title">Pincode *</div>
                    <input
                      type="text"
                      placeholder="Enter your pincode"
                      className="input"
                      spellCheck={false}
                    />
                  </div>
                </div>
              )}
              {formType === "FORM_TWO" && (
                <div className="userInput__wrapper registrationDetails__wrapper">
                  {userType === "CUSTOMER" && (
                    <>
                      <div className="profilePic__wrapper">
                        <div className="profilePic">
                          <img
                            alt="Remy Sharp"
                            src={Images.Hall_01}
                            className="avatar"
                          />
                          <div className="icon__wrapper">
                            <AddIcon className="icon" />
                          </div>
                        </div>
                        <button disabled className="profileBtn">
                          Profile Pic
                        </button>
                      </div>
                      <div className="textField">
                        <label className="title">Document Type</label>
                        <Select
                          styles={customSelectStyles}
                          placeholder="Select document type"
                          className="selectInput"
                          components={{
                            DropdownIndicator: () => (
                              <KeyboardArrowDownIcon
                                style={{ color: "#007bff" }}
                              />
                            ),
                          }}
                          menuShouldScrollIntoView={false}
                          hideSelectedOptions={false}
                          closeMenuOnSelect
                          isClearable={false}
                          isSearchable
                        />
                      </div>
                    </>
                  )}
                  <div className="textField">
                    <label className="title">
                      {userType === "CUSTOMER" ? (
                        <span>Document Id</span>
                      ) : (
                        <span>Registration No</span>
                      )}
                    </label>
                    <input
                      type="text"
                      placeholder={
                        userType === "CUSTOMER"
                          ? "Enter document id"
                          : "Enter registration number"
                      }
                      className="input"
                      spellCheck={false}
                    />
                  </div>
                  {userType === "VENDOR" && (
                    <>
                      <div className="textField">
                        <label className="title">Registration Date</label>
                        <input
                          type="date"
                          placeholder="Pick a date"
                          className="input"
                        />
                      </div>
                      {/* <div {...getRootProps()} className="img__dropZone">
                          <input {...getInputProps()} placeholder="Hello"/>
                          <p>Drag & drop an image here, or click to select one</p>
                        </div> */}
                      <div className="img__dropZone">
                        <label className="title">Registration Document </label>
                        <div className="imgUploadArea">
                          <UploadFileIcon className="icon" />
                          <p className="text">
                            Drag file to upload or <span>Browse</span>
                          </p>
                        </div>
                        {/* <button className="uploadBtn">Choose File</button> */}
                      </div>
                    </>
                  )}
                </div>
              )}
              {formType === "FORM_THREE" && (
                <div className="userInput__wrapper contactDetails__wrapper">
                  <div className="formSubTitle__wrapper">
                    <h2 className="formSubTitle">
                      {formContactType === "PRIMARY" ? (
                        <span> Primary </span>
                      ) : (
                        <span>Secondary </span>
                      )}
                      Contact Info
                    </h2>
                    <div
                      className="formSwitchTitle"
                      onClick={handleFormContactTypeChange}
                    >
                      {formContactType === "PRIMARY" ? (
                        <AddIcon className="icon" />
                      ) : (
                        <FaEdit className="icon" />
                      )}
                      <p className="switchTitle">
                        {formContactType === "PRIMARY" ? (
                          <span>Secondary</span>
                        ) : (
                          <span>Primary </span>
                        )}
                        Contact
                      </p>
                    </div>
                  </div>
                  {userType === "VENDOR" && (
                    <div className="textField__wrapper">
                      <div className="sub-wrapper">
                        <label className="title">First Name * </label>
                        <input
                          type="text"
                          placeholder="Pick a date"
                          className="input"
                        />
                      </div>
                      <div className="sub-wrapper">
                        <label className="title">Last Name * </label>
                        <input
                          type="text"
                          placeholder="Pick a date"
                          className="input"
                        />
                      </div>
                    </div>
                  )}
                  <div className="textField">
                    <label className="title">Designation * </label>
                    <input
                      type="text"
                      placeholder="Pick a date"
                      className="input"
                    />
                  </div>
                  <div className="textField">
                    <label className="title">Office Number * </label>
                    <PhoneInput
                      country={"us"}
                      // value={inputValue}
                      // onChange={(value, country) =>
                      //   setInputValue("+" + value)
                      // }
                      inputProps={{
                        name: "phone",
                        required: true,
                        autoFocus: true,
                        placeholder: "Enter phone number",
                      }}
                      inputClass="input"
                    />
                  </div>
                  <div className="textField">
                    <label className="title">Mobile Number * </label>
                    <PhoneInput
                      country={"us"}
                      // value={inputValue}
                      // // eslint-disable-next-line no-unused-vars
                      // onChange={(value, country) =>
                      //   setInputValue("+" + value)
                      // }
                      inputProps={{
                        name: "phone",
                        required: true,
                        autoFocus: true,
                        placeholder: "Enter phone number",
                      }}
                      inputClass="input"
                    />
                  </div>
                  <div className="textField">
                    <label className="title">Email Address *</label>
                    <input
                      type="text"
                      placeholder="Enter email id"
                      className="input"
                    />
                  </div>
                </div>
              )}
              {formType === "FORM_FOUR" && (
                <div className="userInput__wrapper detailedInfo__wrapper">
                  {userType === "VENDOR" && (
                    <>
                      <div className="images__wrapper">
                        <div className="sub-wrapper">
                          <div className="mainImage">
                            <img src={Images.Hall_01} alt="Main Image" />
                          </div>
                          <div className="standbyImages">
                            <div className="image">
                              <img src={Images.Hall_02} alt="" />
                            </div>
                            <div className="image">
                              <img src={Images.Hall_02} alt="" />
                            </div>
                            <div className="image">
                              <img src={Images.Hall_02} alt="" />
                            </div>
                            <div className="image">
                              <img src={Images.Hall_02} alt="" />
                              {userType === "VENDOR" &&
                                vendorType === "Banquet Hall" && (
                                  <div className="moreImagesIndicator">
                                    <span>+6 more</span>
                                  </div>
                                )}
                            </div>
                          </div>
                        </div>
                        <button className="uploadBtn">Choose Files</button>
                      </div>
                      <div className="subContents__wrapper">
                        <div className="textField">
                          <label className="title">
                            {userType === "VENDOR" &&
                            vendorType === "Banquet Hall" ? (
                              <span>Hall Description *</span>
                            ) : (
                              <span>Business Description *</span>
                            )}
                          </label>
                          <textarea
                            type="text"
                            placeholder="Write something ..."
                            className="input"
                            spellCheck={false}
                            style={{ height: "7rem" }}
                          />
                        </div>
                        {userType === "VENDOR" &&
                          vendorType === "Banquet Hall" && (
                            <>
                              <div className="textField__wrapper">
                                <div className="sub-wrapper">
                                  <label className="title">
                                    Seating Capacity *
                                  </label>
                                  <input
                                    type="number"
                                    placeholder="Enter seating capacity"
                                    className="input"
                                  />
                                </div>
                                <div className="sub-wrapper">
                                  <label className="title">
                                    No. of Rooms *
                                  </label>
                                  <input
                                    type="number"
                                    placeholder="Enter room count"
                                    className="input"
                                  />
                                </div>
                              </div>
                              <div className="textField__wrapper">
                                <div className="sub-wrapper">
                                  <label className="title">VegFood *</label>
                                  <input
                                    type="number"
                                    placeholder="Veg rate per plate"
                                    className="input"
                                  />
                                </div>
                                <div className="sub-wrapper">
                                  <label className="title">Non-VegFood *</label>
                                  <input
                                    type="number"
                                    placeholder="N-Veg rate per plate"
                                    className="input"
                                  />
                                </div>
                              </div>
                              <div className="textField__wrapper">
                                <div className="sub-wrapper">
                                  <label className="title">Parking *</label>
                                  <div className="radioInput">
                                    <div className="radio">
                                      <input type="radio" name="parking" />
                                      <span>Available</span>
                                    </div>
                                    <div className="radio">
                                      <input type="radio" name="parking" />
                                      <span>UnAvailable</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="sub-wrapper">
                                  <label className="title">Freez Day *</label>
                                  <input
                                    type="number"
                                    placeholder="No of days"
                                    className="input"
                                  />
                                </div>
                              </div>
                            </>
                          )}
                      </div>
                    </>
                  )}
                </div>
              )}
              <div className="navigation__btns">
                <button
                  className="btn"
                  type="button"
                  onClick={handlePrevBtnClick}
                >
                  Prev
                </button>
                <button
                  className="btn"
                  onClick={handleNextBtnClick}
                  type="button"
                >
                  {formType === "FORM_FOUR" ||
                  (userType === "CUSTOMER" && formType === "FORM_THREE") ? (
                    <span>Submit</span>
                  ) : (
                    <span>Next</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

RegistrationForm.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  userType: PropTypes.string.isRequired,
  vendorType: PropTypes.string.isRequired,
};

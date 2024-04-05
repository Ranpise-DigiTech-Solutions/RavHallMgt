/* eslint-disable no-unused-vars */
import React, { useState, useCallback } from "react";
import Select from "react-select";

import Dialog from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import Slide from "@mui/material/Slide";
import { useTheme } from "@mui/material/styles";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import UploadFileIcon from '@mui/icons-material/UploadFile';

import { useDropzone } from 'react-dropzone';
import PropTypes from "prop-types";

import { Images } from "../../constants";
import "./RegistrationForm.scss";

export default function RegistrationForm({ open, handleClose }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [switchForm, setSwitchForm] = useState(false);
  
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the uploaded files (e.g., display or process them)
    console.log(acceptedFiles);
  }, []);
  const {getRootProps, getInputProps} = useDropzone({onDrop});


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
      color: '#999999', // Change the placeholder color here
    }),
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
        maxWidth="xl"
      >
        <div className="registrationFormMain__wrapper">
          <div className="img__wrapper">
            <p className="title">
              Let&apos;s Get <br /> <span className="highlight">Started</span>
            </p>
            <img src={Images.userRegistrationPageBg} alt="" />
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
                <div className="formNumberIndicator">1</div>
                <p className="tag">Address</p>
              </div>
              <div className="progressBar"></div>
              <div className="sub-wrapper">
                <div className="formNumberIndicator">2</div>
                <p className="tag">Register</p>
              </div>
              <div className="progressBar"></div>
              <div className="sub-wrapper">
                <div className="formNumberIndicator">3</div>
                <p className="tag">Contact</p>
              </div>
              <div className="progressBar"></div>
              <div className="sub-wrapper">
                <div className="formNumberIndicator">4</div>
                <p className="tag">Detailed</p>
              </div>
            </div>
            {
              !switchForm ?
                <form className="userInput__wrapper">
                  <div className="textField">
                    <label className="title">Hall Name *</label>
                    <input
                      type="text"
                      placeholder="Enter hall name"
                      className="input"
                      spellCheck={false}
                    />
                  </div>
                  <div className="textField">
                    <div className="title">Address Line 1 *</div>
                    <input
                      type="text"
                      placeholder="Enter your address"
                      className="input"
                      spellCheck={false}
                    />
                  </div>
                  <div className="textField">
                    <div className="title">Address Line 2 *</div>
                    <input
                      type="text"
                      placeholder="Enter your address"
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
                        className="input"
                        components={{
                          DropdownIndicator: () => (
                            <KeyboardArrowDownIcon style={{ color: "#007bff" }} />
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
                        className="input"
                        components={{
                          DropdownIndicator: () => (
                            <KeyboardArrowDownIcon style={{ color: "#007bff" }} />
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
                        className="input"
                        components={{
                          DropdownIndicator: () => (
                            <KeyboardArrowDownIcon style={{ color: "#007bff" }} />
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
                        className="input"
                        components={{
                          DropdownIndicator: () => (
                            <KeyboardArrowDownIcon style={{ color: "#007bff" }} />
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
                  <div className="navigation__btns">
                    <button className="btn">Prev</button>
                    <button className="btn" type="submit" onClick={()=> setSwitchForm(true)}>Next</button>
                  </div>
                </form>
              :
                <form className="userInput__wrapper registrationDetails__wrapper">
                  {/* <div {...getRootProps()} className="img__dropZone">
                    <input {...getInputProps()} placeholder="Hello"/>
                    <p>Drag & drop an image here, or click to select one</p>
                  </div> */}
                  <div className="img__dropZone">
                    <label className="title">Hall Image *</label>
                    <div className="imgUploadArea">
                      <UploadFileIcon className="icon"/>
                      <p className="text">Drag file to upload</p>
                    </div>
                    <button className="uploadBtn">
                      Choose File
                    </button>
                  </div>
                  <div className="textField">
                    <label className="title">Registration No *</label>
                    <input
                      type="text"
                      placeholder="Enter registration number"
                      className="input"
                      spellCheck={false}
                    />
                  </div>
                  <div className="textField">
                    <label className="title">Registration Date *</label>
                    <input
                      type="date"
                      placeholder="Pick a date"
                      className="input"
                    />
                  </div>
                  <div className="navigation__btns">
                    <button className="btn" onClick={()=> setSwitchForm(false)}>Prev</button>
                    <button className="btn" type="submit">Next</button>
                  </div>
                </form>
            }
          </div>
        </div>
      </Dialog>
    </div>
  );
}

RegistrationForm.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

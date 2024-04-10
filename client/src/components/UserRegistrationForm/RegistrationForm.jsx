/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import "./RegistrationForm.scss";
import "react-phone-input-2/lib/style.css";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";

import Dialog from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import Slide from "@mui/material/Slide";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Tooltip from "@mui/material/Tooltip";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import ErrorIcon from "@mui/icons-material/Error";
import { FaEdit } from "react-icons/fa";

import { useDropzone } from "react-dropzone";
import PropTypes from "prop-types";

import { Images } from "../../constants";
import { LoadingScreen } from "../../sub-components";
import {
  fetchCitiesOfStateData,
  fetchStatesOfCountryData,
} from "../../states/Data";

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

  const customerDataTemplate = {
    customerFirstName: "", // required field
    customerLastName: "", // required field
    customerCurrentLocation: "",
    customerContact: "", // required field
    customerEmail: "", // required field
    customerPassword: "", // required field
    customerUid: "", // required field

    customerAddress: "", // required field
    customerCity: "", // required field
    customerPincode: 0, // required field
    customerState: "", // required field
    customerTaluk: "", // required field
    customerCountry: "", // required field
    customerLandmark: "", // required field

    customerDesignation: "",
    customerMainPhoneNo: "", // required field
    customerMainMobileNo: "", // required field
    customerMainEmail: "", // required field

    customerAlternateMobileNo: "",
    customerAlternateEmail: "",

    customerDocumentType: "",
    customerDocumentId: "",
    customerProfileImage: "",

    programId: "USER", // required-true
  };

  const hallVendorDataTemplate = {
    hallName: "", // required field
    hallAddress: "", // required field
    hallCountry: "", // required field
    hallState: "", // required field
    hallCity: "", // required field
    hallTaluk: "", // required field
    hallPincode: 0, // required field
    hallLandmark: "", // required field

    hallRegisterNo: "",
    hallRegisterDate: "",
    hallRegisterDocument: "",

    hallMainContactName: "", // required field
    hallMainDesignation: "",
    hallMainOfficeNo: "", // required field
    hallMainMobileNo: "", // required field
    hallMainEmail: "", // required field

    hallAlternateContactName: "",
    hallAlternateDesignation: "",
    hallAlternateOfficeNo: "",
    hallAlternateMobileNo: "",
    hallAlternateEmail: "",

    hallDescription: "", // required field
    hallCapacity: 0, // required field
    hallRooms: 0, // required field
    hallParking: "UNAVAILABLE", // required field
    hallVegRate: 0, // required field
    hallNonVegRate: 0, // required field
    hallFreezDay: 0,

    hallEventTypes: [], // required field
    hallImages: [], // required field

    programId: "USER", // required field
    hallUserId: "", // required field
  };

  const otherVendorDataTemplate = {
    companyName: "", // required field
    companyAddress: "", // required field
    companyCity: "", // required field
    companyPincode: 0, // required field
    companyState: "", // required field
    companyTaluk: "", // required field
    companyCountry: "", // required field
    companyLandmark: "", // required field

    vendorRegisterNo: "",
    vendorRegisterDate: "",
    vendorRegisterDocument: "",

    vendorMainContactName: "", // required field
    vendorMainDesignation: "",
    vendorMainOfficeNo: "", // required field
    vendorMainMobileNo: "", // required field
    vendorMainEmail: "", // required field

    vendorAlternateContactName: "",
    vendorAlternateDesignation: "",
    vendorAlternateOfficeNo: "",
    vendorAlternateMobileNo: "",
    vendorAlternateEmail: "",

    vendorTypeId: "", // required field
    vendorDescription: "", // required field
    vendorImages: [], // required field

    programId: "", // required field
    vendorUserId: "", // required field
  };

  const IdDocumentTypes = [
    "Aadhaar Card (India)",
    "Passport",
    "Driver's License",
    "Voter ID Card",
    "PAN Card (Permanent Account Number)",
    "Social Security Number (SSN)",
    "National Identity Card",
    "Birth Certificate",
    "School/College ID Card",
    "Employee ID Card",
    "Health Insurance Card",
    "Residence Permit",
    "Citizenship Certificate",
    "Military ID Card",
    "Bank Account Statement",
    "Utility Bill (Electricity, Water, Gas)",
    "Property Tax Receipt",
    "Rent Agreement",
    "Vehicle Registration Certificate",
    "Tax Identification Number (TIN)",
  ];

  const commonDataTemplate = {
    address: "",
    landmark: "",
    country: "India",
    state: "",
    city: "",
    taluk: "",
    pincode: "",

    mainContactFirstName: "",
    mainContactLastName: "",
    mainDesignation: "",
    mainOfficeNo: "+91",
    mainMobileNo: "+91",
    mainEmail: "",

    registerNo: "",
    registerDate: "",
    registerDocument: "",

    alternateContactFirstName: "",
    alternateContactLastName: "",
    alternateDesignation: "",
    alternateOfficeNo: "+91",
    alternateMobileNo: "+91",
    alternateEmail: "",

    description: "",

    images: [],
  };

  const dispatch = useDispatch();
  const data = useSelector((state) => state.data); // COUNTRIES, STATES & CITIES
  const fileInputRef = useRef(null);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const [formType, setFormType] = useState("FORM_ONE"); //  FORM_ONE, FORM_TWO, FORM_THREE, FORM_FOUR
  const [formContactType, setFormContactType] = useState("PRIMARY"); // PRIMARY or SECONDARY
  const [userConfirmationDialog, setUserConfirmationDialog] = useState(false); // toggle user confirmation dialog
  const [userConfirmation, setUserConfirmation] = useState(false); // ask user whether the entered details are correct to the best of his/her knowledge.
  const [loadingScreen, setLoadingScreen] = useState(false); // toggle Loading Screen
  const [isOptionsLoading, setIsOptionsLoading] = useState(false); // to display loading screen when user selects a country or state
  const [isHovered, setIsHovered] = useState(false); //to toggle close icon in form_2

  const [hallVendorData, setHallVendorData] = useState({
    ...hallVendorDataTemplate,
  });
  const [customerData, setCustomerData] = useState({
    ...customerDataTemplate,
  });
  const [otherVendorData, setOtherVendorData] = useState({
    ...otherVendorDataTemplate,
  });
  const [commonData, setCommonData] = useState({
    ...commonDataTemplate,
  });

  const [hallVendorDataErrorInfo, setHallVendorDataErrorInfo] = useState({
    ...hallVendorDataTemplate,
    hallCapacity: "",
    hallRooms: "",
    hallParking: "",
    hallVegRate: "",
    hallNonVegRate: "",
    hallFreezDay: "",
    hallEventTypes: "",
  });
  const [customerDataErrorInfo, setCustomerDataErrorInfo] = useState({
    ...customerDataTemplate,
  });
  const [otherVendorDataErrorInfo, setOtherVendorDataErrorInfo] = useState({
    ...otherVendorDataTemplate,
  });
  const [commonDataErrorInfo, setCommonDataErrorInfo] = useState({
    ...commonDataTemplate,
    images: "",
    country: "",
    mainMobileNo: "",
    mainOfficeNo: "",
    alternateOfficeNo: "",
    alternateMobileNo: "",
  });

  useEffect(() => {
    try {
      if (userConfirmation && !userConfirmationDialog) {
        handleFormSubmit();
      }
    } catch (error) {
      console.error(error.message);
    }
  }, [userConfirmation, userConfirmationDialog]);

  //fetch states data when a country is selected
  useEffect(() => {
    try {
      setIsOptionsLoading(true);
      dispatch(fetchStatesOfCountryData(commonData.country));
      setIsOptionsLoading(false);
    } catch (error) {
      setIsOptionsLoading(false);
      console.error(error.message);
    } finally {
      setIsOptionsLoading(false);
    }
  }, [commonData.country]);

  //fetch cities data when a state is selected
  useEffect(() => {
    try {
      setIsOptionsLoading(true);
      dispatch(fetchCitiesOfStateData(commonData.country, commonData.state));
    } catch (error) {
      setIsOptionsLoading(false);
      console.error(error.message);
    } finally {
      setIsOptionsLoading(false);
    }
  }, [commonData.state]);

  const handleCustomerData = (key, value) => {
    setCustomerData((previousData) => ({
      ...previousData,
      [key]: value,
    }));
  };

  const handleHallVendorData = (key, value) => {
    setHallVendorData((previousData) => ({
      ...previousData,
      [key]: value,
    }));
  };

  const handleOtherVendorData = (key, value) => {
    setOtherVendorData((previousData) => ({
      ...previousData,
      [key]: value,
    }));
  };

  const handleCommonData = (key, value) => {
    setCommonData((previousData) => ({
      ...previousData,
      [key]: value,
    }));
  };

  const handleCustomerDataErrorInfo = (key, value) => {
    setCustomerDataErrorInfo((previousInfo) => ({
      ...previousInfo,
      [key]: value,
    }));
  };

  const handleHallVendorDataErrorInfo = (key, value) => {
    setHallVendorDataErrorInfo((previousInfo) => ({
      ...previousInfo,
      [key]: value,
    }));
  };

  const handleOtherVendorDataErrorInfo = (key, value) => {
    setOtherVendorDataErrorInfo((previousInfo) => ({
      ...previousInfo,
      [key]: value,
    }));
  };

  const handleCommonDataErrorInfo = (key, value) => {
    setCommonDataErrorInfo((previousInfo) => ({
      ...previousInfo,
      [key]: value,
    }));
  };

  const handleImageChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    console.log(selectedFiles);
    if (selectedFiles.length > 10) {
      setCommonDataErrorInfo("images", "You can set atmost 10 images!");
      return;
    }
    handleCommonData("images", selectedFiles);
    console.log(commonData.images);
  };

  const handleProfilePicUpdation = (event) => {
    const selectedFile = event.target.file;
    console.log(selectedFile);
    setCustomerData("customerProfileImage", selectedFile);
  };

  const getRegisterDocumentType = () => {
    const fileExtension = commonData.registerDocument?.name
      .split(".")
      .pop()
      .toLowerCase();
    console.log(fileExtension);
    switch (fileExtension) {
      case "pdf":
        return Images.pdf;
      case "pptx" || "ppt":
        return Images.pptx;
      case "docx":
        return Images.docx;
      case "png" || "jpg" || "jpeg":
        return Images.jpg;
      default:
        return Images.txt;
    }
  };

  const validateFormOne = () => {
    if (userType === "CUSTOMER") {
      if (!customerData.customerFirstName) {
        handleCustomerDataErrorInfo(
          "customerFirstName",
          "First name is required"
        );
      } else {
        handleCustomerDataErrorInfo("customerFirstName", "");
      }
      if (!customerData.customerLastName) {
        handleCustomerDataErrorInfo(
          "customerLastName",
          "Last name is required"
        );
      } else {
        handleCustomerDataErrorInfo("customerLastName", "");
      }
    } else {
      if (vendorType === "Banquet Hall") {
        if (!hallVendorData.hallName) {
          handleHallVendorDataErrorInfo("hallName", "Hall name is required");
        } else {
          handleHallVendorDataErrorInfo("hallName", "");
        }
      } else {
        if (!otherVendorData.companyName) {
          handleOtherVendorDataErrorInfo(
            "companyName",
            "Brand name is required"
          );
        } else {
          handleOtherVendorDataErrorInfo("companyName", "");
        }
      }
    }
    if (!commonData.address) {
      handleCommonDataErrorInfo("address", "Address is required");
    } else {
      handleCommonDataErrorInfo("address", "");
    }
    if (!commonData.landmark) {
      handleCommonDataErrorInfo("landmark", "Landmark is required");
    } else {
      handleCommonDataErrorInfo("landmark", "");
    }
    if (!commonData.country) {
      handleCommonDataErrorInfo("country", "Country is required");
    } else {
      handleCommonDataErrorInfo("country", "Country is required");
    }
    if (!commonData.state) {
      handleCommonDataErrorInfo("state", "State is required");
    } else {
      handleCommonDataErrorInfo("state", "");
    }
    if (!commonData.city) {
      handleCommonDataErrorInfo("city", "City is required");
    } else {
      handleCommonDataErrorInfo("city", "");
    }
    if (!commonData.taluk) {
      handleCommonDataErrorInfo("taluk", "Taluk is required");
    } else {
      handleCommonDataErrorInfo("taluk", "");
    }
    if (!commonData.pincode) {
      handleCommonDataErrorInfo("pincode", "Pincode is required");
    } else {
      handleCommonDataErrorInfo("pincode", "");
    }

    const requiredFields = [
      customerData.customerFirstName,
      customerData.customerLastName,
      hallVendorData.hallName,
      otherVendorData.companyName,
      commonData.country,
      commonData.state,
      commonData.city,
      commonData.taluk,
      commonData.pincode,
    ];

    // Check if any of the required fields are empty
    const isFormValid = requiredFields.every((field) => field !== "");

    if (!isFormValid) {
      setFormType("FORM_TWO");
    }
  };

  const validateFormTwo = () => {
    console.log(commonData.registerDocument);
  };

  const validateFormThree = () => {};

  const validateFormFour = () => {};

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
        // validateFormOne();
        setFormType("FORM_TWO");
        break;
      case "FORM_TWO":
        // validateFormTwo();
        setFormType("FORM_THREE");
        break;
      case "FORM_THREE":
        validateFormThree();
        if (userType === "CUSTOMER") {
          handleFormSubmit();
          break;
        }
        setFormType("FORM_FOUR");
        break;
      case "FORM_FOUR":
        validateFormFour();
        setUserConfirmationDialog(true);
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
    setLoadingScreen(true);

    setTimeout(() => {
      setLoadingScreen(false);
    }, 3000);
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
        {loadingScreen && <LoadingScreen />}
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
              <h2 className="form__title">
                {userType === "VENDOR" ? (
                  vendorType === "Banquet Hall" ? (
                    <span>Hall Information</span>
                  ) : (
                    <span>Vendor Information</span>
                  )
                ) : (
                  <span>Customer Information</span>
                )}
              </h2>
              <p className="form__sub-title">
                {userType === "VENDOR" ? (
                  <span>Fill the from to become a part of the team</span>
                ) : (
                  <span>Tell us more about yourself</span>
                )}
              </p>
            </div>
            <div className="progressIndicator__wrapper">
              <div className="sub-wrapper currentForm">
                <div className="formNumberIndicator">
                  {formType === "FORM_ONE" ? (
                    <span>1</span>
                  ) : (
                    <DoneIcon className="icon" />
                  )}
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
                    <DoneIcon className="icon" />
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
                  {formType !== "FORM_FOUR" ? (
                    <span>3</span>
                  ) : (
                    <DoneIcon className="icon" />
                  )}
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
                      <span>4</span>
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
                          name="firstName"
                          value={customerData.customerFirstName}
                          placeholder="John"
                          onChange={(e) =>
                            handleCustomerData(
                              "customerFirstName",
                              e.target.value
                            )
                          }
                          style={
                            customerDataErrorInfo.customerFirstName
                              ? { border: "2px solid red" }
                              : {}
                          }
                          className="input"
                          spellCheck={false}
                        />
                        {customerDataErrorInfo.customerFirstName && (
                          <div className="inputError">
                            <ErrorIcon className="icon" />
                            <p>{customerDataErrorInfo.customerFirstName}</p>
                          </div>
                        )}
                      </div>
                      <div className="sub-wrapper">
                        <div className="title">Last Name *</div>
                        <input
                          type="text"
                          name="lastName"
                          value={customerData.customerLastName}
                          placeholder="Smith"
                          onChange={(e) =>
                            handleCustomerData(
                              "customerLastName",
                              e.target.value
                            )
                          }
                          style={
                            customerDataErrorInfo.customerLastName
                              ? { border: "2px solid red" }
                              : {}
                          }
                          className="input"
                          spellCheck={false}
                        />
                        {customerDataErrorInfo.customerLastName && (
                          <div className="inputError">
                            <ErrorIcon className="icon" />
                            <p>{customerDataErrorInfo.customerLastName}</p>
                          </div>
                        )}
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
                      {vendorType === "Banquet Hall" ? (
                        <>
                          <input
                            type="text"
                            name="hallName"
                            value={hallVendorData.hallName}
                            onChange={(e) =>
                              handleHallVendorData("hallName", e.target.value)
                            }
                            style={
                              hallVendorDataErrorInfo.hallName
                                ? { border: "2px solid red" }
                                : {}
                            }
                            placeholder={"Enter hall name"}
                            className="input"
                            spellCheck={false}
                          />
                          {hallVendorDataErrorInfo.hallName && (
                            <div className="inputError">
                              <ErrorIcon className="icon" />
                              <p>{hallVendorDataErrorInfo.hallName}</p>
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <input
                            type="text"
                            name="companyName"
                            value={otherVendorData.companyName}
                            onChange={(e) =>
                              handleOtherVendorData(
                                "companyName",
                                e.target.value
                              )
                            }
                            style={
                              otherVendorDataErrorInfo.companyName
                                ? { border: "2px solid red" }
                                : {}
                            }
                            placeholder={"Enter company name"}
                            className="input"
                            spellCheck={false}
                          />
                          {otherVendorDataErrorInfo.companyName && (
                            <div className="inputError">
                              <ErrorIcon className="icon" />
                              <p>{otherVendorDataErrorInfo.companyName}</p>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                  <div className="textField">
                    <div className="title">Address *</div>
                    <>
                      <input
                        type="text"
                        name="address"
                        value={commonData.address}
                        onChange={(e) =>
                          handleCommonData("address", e.target.value)
                        }
                        style={
                          commonDataErrorInfo.address
                            ? { border: "2px solid red" }
                            : {}
                        }
                        placeholder="Enter the address"
                        className="input"
                        spellCheck={false}
                      />
                      {commonDataErrorInfo.address && (
                        <div className="inputError">
                          <ErrorIcon className="icon" />
                          <p>{commonDataErrorInfo.address}</p>
                        </div>
                      )}
                    </>
                  </div>
                  <div className="textField">
                    <div className="title">Landmark *</div>
                    <>
                      <input
                        type="text"
                        name="landmark"
                        value={commonData.landmark}
                        onChange={(e) =>
                          handleCommonData("landmark", e.target.value)
                        }
                        style={
                          commonDataErrorInfo.landmark
                            ? { border: "2px solid red" }
                            : {}
                        }
                        placeholder="Enter the landmark"
                        className="input"
                        spellCheck={false}
                      />
                      {commonDataErrorInfo.landmark && (
                        <div className="inputError">
                          <ErrorIcon className="icon" />
                          <p>{commonDataErrorInfo.landmark}</p>
                        </div>
                      )}
                    </>
                  </div>
                  <div className="textField__wrapper">
                    <div className="sub-wrapper">
                      <div className="title">Country *</div>
                      <>
                        <div
                          style={
                            commonDataErrorInfo.country
                              ? { border: "2px solid red", borderRadius: "5px" }
                              : {}
                          }
                        >
                          <Select
                            styles={customSelectStyles}
                            options={
                              Array.isArray(data.countries.data)
                                ? data.countries.data?.map((country) => ({
                                    value: country,
                                    label: country,
                                  }))
                                : null
                            }
                            value={
                              commonData.country
                                ? {
                                    value: commonData.country,
                                    label: commonData.country,
                                  }
                                : null
                            }
                            onChange={(selectedOption) =>
                              handleCommonData("country", selectedOption.value)
                            }
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
                        {commonDataErrorInfo.country && (
                          <div className="inputError">
                            <ErrorIcon className="icon" />
                            <p>{commonDataErrorInfo.country}</p>
                          </div>
                        )}
                      </>
                    </div>
                    <div className="sub-wrapper">
                      <div className="title">State *</div>
                      <>
                        <div
                          style={
                            commonDataErrorInfo.state
                              ? { border: "2px solid red", borderRadius: "5px" }
                              : {}
                          }
                        >
                          <Select
                            styles={customSelectStyles}
                            options={
                              data.states.data &&
                              Array.isArray(data.states.data)
                                ? data.states.data?.map((state) => ({
                                    value: state,
                                    label: state,
                                  }))
                                : null
                            }
                            value={
                              commonData.state
                                ? {
                                    value: commonData.state,
                                    label: commonData.state,
                                  }
                                : null
                            }
                            onChange={(selectedOption) =>
                              handleCommonData("state", selectedOption.value)
                            }
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
                        {commonDataErrorInfo.state && (
                          <div className="inputError">
                            <ErrorIcon className="icon" />
                            <p>{commonDataErrorInfo.state}</p>
                          </div>
                        )}
                      </>
                    </div>
                  </div>
                  <div className="textField__wrapper">
                    <div className="sub-wrapper">
                      <div className="title">City *</div>
                      <>
                        <div
                          style={
                            commonDataErrorInfo.city
                              ? { border: "2px solid red", borderRadius: "5px" }
                              : {}
                          }
                        >
                          <Select
                            styles={customSelectStyles}
                            options={
                              data.citiesOfState.data &&
                              Array.isArray(data.citiesOfState.data)
                                ? data.citiesOfState.data?.map((city) => ({
                                    value: city,
                                    label: city,
                                  }))
                                : null
                            }
                            value={
                              commonData.city
                                ? {
                                    value: commonData.city,
                                    label: commonData.city,
                                  }
                                : null
                            }
                            onChange={(selectedOption) =>
                              handleCommonData("city", selectedOption.value)
                            }
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
                        {commonDataErrorInfo.city && (
                          <div className="inputError">
                            <ErrorIcon className="icon" />
                            <p>{commonDataErrorInfo.city}</p>
                          </div>
                        )}
                      </>
                    </div>
                    <div className="taluk sub-wrapper">
                      <div className="title">Taluk *</div>
                      <>
                        <input
                          type="text"
                          name="taluk"
                          value={commonData.taluk}
                          onChange={(e) =>
                            handleCommonData("taluk", e.target.value)
                          }
                          style={
                            commonDataErrorInfo.taluk
                              ? { border: "2px solid red" }
                              : {}
                          }
                          placeholder="Enter the landmark"
                          className="input"
                          spellCheck={false}
                        />
                        {commonDataErrorInfo.taluk && (
                          <div className="inputError">
                            <ErrorIcon className="icon" />
                            <p>{commonDataErrorInfo.taluk}</p>
                          </div>
                        )}
                      </>
                    </div>
                  </div>
                  <div className="textField pinCode__wrapper">
                    <div className="title">Pincode *</div>
                    <>
                      <input
                        type="text"
                        name="pincode"
                        pattern="[0-9]*"
                        inputMode="numeric"
                        onKeyDown={(e) => {
                          // Allow: backspace, delete, tab, escape, enter, and .
                          if (
                            [46, 8, 9, 27, 13, 110].indexOf(e.keyCode) !== -1 ||
                            // Allow: Ctrl+A/Ctrl+C/Ctrl+V/Ctrl+X
                            (e.keyCode === 65 && e.ctrlKey === true) || // Ctrl+A
                            (e.keyCode === 67 && e.ctrlKey === true) || // Ctrl+C
                            (e.keyCode === 86 && e.ctrlKey === true) || // Ctrl+V
                            (e.keyCode === 88 && e.ctrlKey === true) // Ctrl+X
                          ) {
                            // let it happen, don't do anything
                            return;
                          }
                          // Ensure that it is a number and stop the keypress
                          if (
                            (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
                            (e.keyCode < 96 || e.keyCode > 105)
                          ) {
                            e.preventDefault();
                          }
                        }}
                        value={commonData.pincode}
                        onChange={(e) =>
                          handleCommonData("pincode", e.target.value)
                        }
                        style={
                          commonDataErrorInfo.pincode
                            ? { border: "2px solid red" }
                            : {}
                        }
                        placeholder="Enter your pincode"
                        className="input"
                        spellCheck={false}
                      />
                      {commonDataErrorInfo.pincode && (
                        <div className="inputError">
                          <ErrorIcon className="icon" />
                          <p>{commonDataErrorInfo.pincode}</p>
                        </div>
                      )}
                    </>
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
                          options={IdDocumentTypes.map((id) => ({
                            value: id,
                            label: id,
                          }))}
                          value={{
                            value: customerData.customerDocumentType,
                            label: customerData.customerDocumentType,
                          }}
                          onChange={(selectedOption) =>
                            handleCustomerData(
                              "customerDocumentType",
                              selectedOption.value
                            )
                          }
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
                      name="registerNo"
                      value={commonData.registerNo}
                      onChange={(e) =>
                        handleCommonData("registerNo", e.target.value)
                      }
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
                          value={commonData.registerDate}
                          placeholder="dd-mm-yyyy"
                          className="input"
                          onChange={(e) =>
                            handleCommonData("registerDate", e.target.value)
                          }
                        />
                      </div>
                      {/* <div {...getRootProps()} className="img__dropZone">
                          <input {...getInputProps()} placeholder="Hello"/>
                          <p>Drag & drop an image here, or click to select one</p>
                        </div> */}
                      <div className="img__dropZone">
                        <label className="title">Registration Document </label>
                        {!commonData.registerDocument ? (
                          <div
                            className="imgUploadArea"
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                              e.preventDefault();
                              handleCommonData(
                                "registerDocument",
                                e.dataTransfer.files[0]
                              );
                            }}
                            onClick={(e) => fileInputRef.current.click()}
                          >
                            <UploadFileIcon className="icon" />
                            <p className="text">
                              Drag file to upload or <span>Browse</span>
                            </p>
                            <input
                              ref={fileInputRef}
                              type="file"
                              onChange={(e) =>
                                handleCommonData(
                                  "registerDocument",
                                  e.target.files[0]
                                )
                              }
                              className="fileInput"
                              style={{ display: "none" }}
                            />
                          </div>
                        ) : (
                          <div className="documentArea">
                            <button
                              onClick={(e) =>
                                handleCommonData("registerDocument", "")
                              }
                            >
                              <CloseIcon className="closeIcon" />
                            </button>
                            <img
                              src={getRegisterDocumentType()}
                              alt=""
                              className="documentIcon"
                            />
                            <label className="fileName">
                              {commonData.registerDocument?.name}
                            </label>
                          </div>
                        )}
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
                  {userType === "VENDOR" &&
                    (formContactType === "PRIMARY" ? (
                      <div className="textField__wrapper">
                        <div className="sub-wrapper">
                          <label className="title">First Name * </label>
                          <>
                            <input
                              type="text"
                              name="mainContactFirstName"
                              value={commonData.mainContactFirstName}
                              onChange={(e) =>
                                handleCommonData(
                                  "mainContactFirstName",
                                  e.target.value
                                )
                              }
                              style={
                                commonDataErrorInfo.mainContactFirstName
                                  ? { border: "2px solid red" }
                                  : {}
                              }
                              placeholder="Logan"
                              className="input"
                              spellCheck="false"
                            />
                            {commonDataErrorInfo.mainContactFirstName && (
                              <div className="inputError">
                                <ErrorIcon className="icon" />
                                <p>
                                  {commonDataErrorInfo.mainContactFirstName}
                                </p>
                              </div>
                            )}
                          </>
                        </div>
                        <div className="sub-wrapper">
                          <label className="title">Last Name * </label>
                          <>
                            <input
                              type="text"
                              name="mainContactLastName"
                              value={commonData.mainContactLastName}
                              onChange={(e) =>
                                handleCommonData(
                                  "mainContactLastName",
                                  e.target.value
                                )
                              }
                              style={
                                commonDataErrorInfo.mainContactLastName
                                  ? { border: "2px solid red" }
                                  : {}
                              }
                              placeholder="Sanderz"
                              className="input"
                              spellCheck="false"
                            />
                            {commonDataErrorInfo.mainContactLastName && (
                              <div className="inputError">
                                <ErrorIcon className="icon" />
                                <p>{commonDataErrorInfo.mainContactLastName}</p>
                              </div>
                            )}
                          </>
                        </div>
                      </div>
                    ) : (
                      <div className="textField__wrapper">
                        <div className="sub-wrapper">
                          <label className="title">First Name * </label>
                          <>
                            <input
                              type="text"
                              name="alternateContactFirstName"
                              value={commonData.alternateContactFirstName}
                              onChange={(e) =>
                                handleCommonData(
                                  "alternateContactFirstName",
                                  e.target.value
                                )
                              }
                              style={
                                commonDataErrorInfo.alternateContactFirstName
                                  ? { border: "2px solid red" }
                                  : {}
                              }
                              placeholder="Logan"
                              className="input"
                              spellCheck="false"
                            />
                            {commonDataErrorInfo.alternateContactFirstName && (
                              <div className="inputError">
                                <ErrorIcon className="icon" />
                                <p>
                                  {
                                    commonDataErrorInfo.alternateContactFirstName
                                  }
                                </p>
                              </div>
                            )}
                          </>
                        </div>
                        <div className="sub-wrapper">
                          <label className="title">Last Name * </label>
                          <>
                            <input
                              type="text"
                              name="alternateContactLastName"
                              value={commonData.alternateContactLastName}
                              onChange={(e) =>
                                handleCommonData(
                                  "alternateContactLastName",
                                  e.target.value
                                )
                              }
                              style={
                                commonDataErrorInfo.alternateContactLastName
                                  ? { border: "2px solid red" }
                                  : {}
                              }
                              placeholder="Sanderz"
                              className="input"
                              spellCheck="false"
                            />
                            {commonDataErrorInfo.alternateContactLastName && (
                              <div className="inputError">
                                <ErrorIcon className="icon" />
                                <p>
                                  {commonDataErrorInfo.alternateContactLastName}
                                </p>
                              </div>
                            )}
                          </>
                        </div>
                      </div>
                    ))}
                  {(userType === "VENDOR" ||
                    (userType === "CUSTOMER" &&
                      formContactType === "PRIMARY")) &&
                    (formContactType === "PRIMARY" ? (
                      <>
                        <div className="textField">
                          <label className="title">Designation * </label>
                          <>
                            <input
                              type="text"
                              name="mainDesignation"
                              value={commonData.mainDesignation}
                              onChange={(e) =>
                                handleCommonData(
                                  "mainDesignation",
                                  e.target.value
                                )
                              }
                              style={
                                commonDataErrorInfo.mainDesignation
                                  ? { border: "2px solid red" }
                                  : {}
                              }
                              placeholder="Pick a date"
                              className="input"
                              spellCheck="false"
                            />
                            {commonDataErrorInfo.mainDesignation && (
                              <div className="inputError">
                                <ErrorIcon className="icon" />
                                <p>{commonDataErrorInfo.mainDesignation}</p>
                              </div>
                            )}
                          </>
                        </div>
                        <div className="textField">
                          <label className="title">Office Number * </label>
                          <>
                            <div
                              className="phoneInput"
                              style={
                                commonDataErrorInfo.mainOfficeNo
                                  ? {
                                      border: "2px solid red",
                                      borderRadius: "5px",
                                    }
                                  : {}
                              }
                            >
                              <PhoneInput
                                country={"us"}
                                value={commonData.mainOfficeNo}
                                onChange={(value, country) =>
                                  handleCommonData("mainOfficeNo", "+" + value)
                                }
                                inputProps={{
                                  name: "phone",
                                  required: true,
                                  autoFocus: true,
                                  placeholder: "Enter phone number",
                                }}
                                inputClass="input"
                              />
                            </div>
                            {commonDataErrorInfo.mainOfficeNo && (
                              <div className="inputError">
                                <ErrorIcon className="icon" />
                                <p>{commonDataErrorInfo.mainOfficeNo}</p>
                              </div>
                            )}
                          </>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="textField">
                          <label className="title">Designation * </label>
                          <>
                            <input
                              type="text"
                              name="alternateDesignation"
                              value={commonData.alternateDesignation}
                              onChange={(e) =>
                                handleCommonData(
                                  "alternateDesignation",
                                  e.target.value
                                )
                              }
                              style={
                                commonDataErrorInfo.alternateDesignation
                                  ? { border: "2px solid red" }
                                  : {}
                              }
                              placeholder="Pick a date"
                              className="input"
                              spellCheck="false"
                            />
                            {commonDataErrorInfo.alternateDesignation && (
                              <div className="inputError">
                                <ErrorIcon className="icon" />
                                <p>
                                  {commonDataErrorInfo.alternateDesignation}
                                </p>
                              </div>
                            )}
                          </>
                        </div>
                        <div className="textField">
                          <label className="title">Office Number * </label>
                          <>
                            <div
                              className="phoneInput"
                              style={
                                commonDataErrorInfo.alternateOfficeNo
                                  ? {
                                      border: "2px solid red",
                                      borderRadius: "5px",
                                    }
                                  : {}
                              }
                            >
                              <PhoneInput
                                country={"us"}
                                value={commonData.alternateOfficeNo}
                                onChange={(value, country) =>
                                  handleCommonData(
                                    "alternateOfficeNo",
                                    "+" + value
                                  )
                                }
                                inputProps={{
                                  name: "phone",
                                  required: true,
                                  autoFocus: true,
                                  placeholder: "Enter phone number",
                                }}
                                inputClass="input"
                              />
                            </div>
                            {commonDataErrorInfo.alternateOfficeNo && (
                              <div className="inputError">
                                <ErrorIcon className="icon" />
                                <p>{commonDataErrorInfo.alternateOfficeNo}</p>
                              </div>
                            )}
                          </>
                        </div>
                      </>
                    ))}
                  {formContactType === "PRIMARY" ? (
                    <>
                      <div className="textField">
                        <label className="title">Mobile Number * </label>
                        <>
                          <div
                            className="phoneInput"
                            style={
                              commonDataErrorInfo.mainMobileNo
                                ? {
                                    border: "2px solid red",
                                    borderRadius: "5px",
                                  }
                                : {}
                            }
                          >
                            <PhoneInput
                              country={"us"}
                              value={commonData.mainMobileNo}
                              // eslint-disable-next-line no-unused-vars
                              onChange={(value, country) =>
                                setCommonData("mainMobileNo", "+" + value)
                              }
                              inputProps={{
                                name: "phone",
                                required: true,
                                autoFocus: true,
                                placeholder: "Enter phone number",
                              }}
                              inputClass="input"
                            />
                          </div>
                          {commonDataErrorInfo.mainMobileNo && (
                            <div className="inputError">
                              <ErrorIcon className="icon" />
                              <p>{commonDataErrorInfo.mainMobileNo}</p>
                            </div>
                          )}
                        </>
                      </div>
                      <div className="textField">
                        <label className="title">Email Address *</label>
                        <>
                          <input
                            type="text"
                            name="mainEmail"
                            value={commonData.mainEmail}
                            onChange={(e) =>
                              handleCommonData("mainEmail", e.target.value)
                            }
                            style={
                              commonDataErrorInfo.mainEmail
                                ? { border: "2px solid red" }
                                : {}
                            }
                            placeholder="Enter email id"
                            className="input"
                            spellCheck="false"
                          />
                          {commonDataErrorInfo.mainEmail && (
                            <div className="inputError">
                              <ErrorIcon className="icon" />
                              <p>{commonDataErrorInfo.mainEmail}</p>
                            </div>
                          )}
                        </>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="textField">
                        <label className="title">Mobile Number * </label>
                        <>
                          <div
                            className="phoneInput"
                            style={
                              commonDataErrorInfo.alternateMobileNo
                                ? {
                                    border: "2px solid red",
                                    borderRadius: "5px",
                                  }
                                : {}
                            }
                          >
                            <PhoneInput
                              country={"us"}
                              value={commonData.alternateMobileNo}
                              // eslint-disable-next-line no-unused-vars
                              onChange={(value, country) =>
                                setCommonData("alternateMobileNo", "+" + value)
                              }
                              inputProps={{
                                name: "phone",
                                required: true,
                                autoFocus: true,
                                placeholder: "Enter phone number",
                              }}
                              inputClass="input"
                            />
                          </div>
                          {commonDataErrorInfo.alternateMobileNo && (
                            <div className="inputError">
                              <ErrorIcon className="icon" />
                              <p>{commonDataErrorInfo.alternateMobileNo}</p>
                            </div>
                          )}
                        </>
                      </div>
                      <div className="textField">
                        <label className="title">Email Address *</label>
                        <>
                          <input
                            type="text"
                            name="alternateEmail"
                            value={commonData.alternateEmail}
                            onChange={(e) =>
                              handleCommonData("alternateEmail", e.target.value)
                            }
                            style={
                              commonDataErrorInfo.alternateEmail
                                ? { border: "2px solid red" }
                                : {}
                            }
                            placeholder="Enter email id"
                            className="input"
                            spellCheck="false"
                          />
                          {commonDataErrorInfo.alternateEmail && (
                            <div className="inputError">
                              <ErrorIcon className="icon" />
                              <p>{commonDataErrorInfo.alternateEmail}</p>
                            </div>
                          )}
                        </>
                      </div>
                    </>
                  )}
                </div>
              )}
              {formType === "FORM_FOUR" && (
                <div className="userInput__wrapper detailedInfo__wrapper">
                  {userType === "VENDOR" && (
                    <>
                      <div className="images__wrapper">
                        <div className="sub-wrapper">
                          <div className="mainImage">
                            {
                              commonData.images?.[0] ?
                              <>
                                <button
                                  type="button"
                                  onClick={(e)=> {
                                    const updatedImages = [...commonData.images];
                                    updatedImages.splice(0, 1);
                                    handleCommonData("images", updatedImages);
                                  }}
                                  className="removeBtn"
                                >
                                    <CloseIcon className="icon"/>
                                  </button>
                                <img
                                  src={
                                    URL.createObjectURL(commonData.images[0])
                                  }
                                  alt=""
                                  className="image"
                                />
                              </>
                              :
                              <div className="image">
                                <UploadFileIcon className="uploadFileIcon" />
                                <p className="uploadFileText">
                                  Drag file to upload or <span>Browse</span>
                                </p>
                              </div>
                            }
                          </div>
                          <div className="standbyImages">
                            <div className="image">
                              {
                                commonData.images?.[1] ?
                                <>
                                  <button className="removeBtn">
                                    <CloseIcon className="icon"/>
                                  </button>
                                  <img src={URL.createObjectURL(commonData.images[1])} alt="" className="img"/>
                                </>
                                :
                                <div className="img">
                                  <UploadFileIcon className="uploadFileIcon" />
                                </div>
                              }
                            </div>
                            <div className="image">
                              {
                                commonData.images?.[2] ?
                                <>
                                  <button className="removeBtn">
                                    <CloseIcon className="icon"/>
                                  </button>
                                  <img src={URL.createObjectURL(commonData.images[2])} alt="" className="img"/>
                                </>
                                :
                                <div className="img">
                                  <UploadFileIcon className="uploadFileIcon" />
                                </div>
                              }
                            </div>
                            <div className="image">
                              {
                                commonData.images?.[3] ?
                                <>
                                  <button className="removeBtn">
                                    <CloseIcon className="icon"/>
                                  </button>
                                  <img src={URL.createObjectURL(commonData.images[3])} alt="" className="img"/>
                                </>
                                :
                                <div className="img">
                                  <UploadFileIcon className="uploadFileIcon" />
                                </div>
                              }
                            </div>
                            <div className="image">
                              {
                                commonData.images?.[4] ?
                                  <img
                                    src={
                                      URL.createObjectURL(commonData.images[4])
                                    }
                                    alt=""
                                    className="img"
                                  />
                                  :
                                  <div className="img">
                                    <UploadFileIcon className="uploadFileIcon" />
                                  </div>
                              }
                              {userType === "VENDOR" &&
                                vendorType === "Banquet Hall" && (
                                  commonData.images?.length > 5 &&
                                  <div className="moreImagesIndicator">
                                    <span>+{commonData.images.length - 4} more</span>
                                  </div>
                                )}
                            </div>
                          </div>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageChange}
                          // className="uploadBtn"
                          style={{ opacity: 0, visibility: 'hidden', position: 'absolute', zIndex: -1 }}
                          id="multipleFileInput"
                        />
                        <div className="uploadBtn__wrapper">
                          <button
                            type="button"
                            className="uploadBtn"
                            onClick={(e)=> {
                              document.getElementById('multipleFileInput').click();
                            }}
                          >
                            Choose Files
                          </button>
                          <p className="fileCountText">{commonData.images ? `(${commonData.images.length}/10) selected` : "(0/10) selected"}</p>
                        </div>
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
                          <>
                            <textarea
                              type="text"
                              name="description"
                              value={commonData.description}
                              onChange={(e) =>
                                handleCommonData("description", e.target.value)
                              }
                              style={
                                commonDataErrorInfo.description
                                  ? { border: "2px solid red", height: "7rem" }
                                  : { height: "7rem" }
                              }
                              placeholder="Write something ..."
                              className="input"
                              spellCheck={false}
                            />
                            {commonDataErrorInfo.description && (
                              <div className="inputError">
                                <ErrorIcon className="icon" />
                                <p>{commonDataErrorInfo.description}</p>
                              </div>
                            )}
                          </>
                        </div>
                        {userType === "VENDOR" &&
                          vendorType === "Banquet Hall" && (
                            <>
                              <div className="textField__wrapper">
                                <div className="sub-wrapper">
                                  <label className="title">
                                    Seating Capacity *
                                  </label>
                                  <>
                                    <input
                                      type="number"
                                      name="hallCapacity"
                                      value={hallVendorData.hallCapacity}
                                      onChange={(e) =>
                                        handleHallVendorData(
                                          "hallCapacity",
                                          e.target.value
                                        )
                                      }
                                      style={
                                        hallVendorDataErrorInfo.hallCapacity
                                          ? { border: "2px solid red" }
                                          : {}
                                      }
                                      placeholder="Enter seating capacity"
                                      className="input"
                                    />
                                    {hallVendorDataErrorInfo.hallCapacity && (
                                      <div className="inputError">
                                        <ErrorIcon className="icon" />
                                        <p>
                                          {hallVendorDataErrorInfo.hallCapacity}
                                        </p>
                                      </div>
                                    )}
                                  </>
                                </div>
                                <div className="sub-wrapper">
                                  <label className="title">
                                    No. of Rooms *
                                  </label>
                                  <>
                                    <input
                                      type="number"
                                      name="hallRooms"
                                      value={hallVendorData.hallRooms}
                                      onChange={(e) =>
                                        handleHallVendorData(
                                          "hallRooms",
                                          e.target.value
                                        )
                                      }
                                      style={
                                        hallVendorDataErrorInfo.hallRooms
                                          ? { border: "2px solid red" }
                                          : {}
                                      }
                                      placeholder="Enter room count"
                                      className="input"
                                    />
                                    {hallVendorDataErrorInfo.hallRooms && (
                                      <div className="inputError">
                                        <ErrorIcon className="icon" />
                                        <p>
                                          {hallVendorDataErrorInfo.hallRooms}
                                        </p>
                                      </div>
                                    )}
                                  </>
                                </div>
                              </div>
                              <div className="textField__wrapper">
                                <div className="sub-wrapper">
                                  <label className="title">VegFood *</label>
                                  <>
                                    <input
                                      type="number"
                                      name="hallVegRate"
                                      value={hallVendorData.hallVegRate}
                                      onChange={(e) =>
                                        handleHallVendorData(
                                          "hallVegRate",
                                          e.target.value
                                        )
                                      }
                                      style={
                                        hallVendorDataErrorInfo.hallVegRate
                                          ? { border: "2px solid red" }
                                          : {}
                                      }
                                      placeholder="Veg rate per plate"
                                      className="input"
                                    />
                                    {hallVendorDataErrorInfo.hallVegRate && (
                                      <div className="inputError">
                                        <ErrorIcon className="icon" />
                                        <p>
                                          {hallVendorDataErrorInfo.hallVegRate}
                                        </p>
                                      </div>
                                    )}
                                  </>
                                </div>
                                <div className="sub-wrapper">
                                  <label className="title">Non-VegFood *</label>
                                  <>
                                    <input
                                      type="number"
                                      name="hallNonVegRate"
                                      value={hallVendorData.hallNonVegRate}
                                      onChange={(e) =>
                                        handleHallVendorData(
                                          "hallNonVegRate",
                                          e.target.value
                                        )
                                      }
                                      style={
                                        hallVendorDataErrorInfo.hallNonVegRate
                                          ? { border: "2px solid red" }
                                          : {}
                                      }
                                      placeholder="N-Veg rate per plate"
                                      className="input"
                                    />
                                    {hallVendorDataErrorInfo.hallNonVegRate && (
                                      <div className="inputError">
                                        <ErrorIcon className="icon" />
                                        <p>
                                          {
                                            hallVendorDataErrorInfo.hallNonVegRate
                                          }
                                        </p>
                                      </div>
                                    )}
                                  </>
                                </div>
                              </div>
                              <div className="textField__wrapper">
                                <div className="sub-wrapper">
                                  <label className="title">Parking *</label>
                                  <div className="radioInput">
                                    <div className="radio">
                                      <input
                                        type="radio"
                                        name="parking"
                                        value="AVAILABLE"
                                        checked={
                                          hallVendorData.hallParking ===
                                          "AVAILABLE"
                                        }
                                        onChange={(e) =>
                                          handleHallVendorData(
                                            "hallParking",
                                            e.target.value
                                          )
                                        }
                                      />
                                      <span>Available</span>
                                    </div>
                                    <div className="radio">
                                      <input
                                        type="radio"
                                        name="parking"
                                        value="UNAVAILABLE"
                                        checked={
                                          hallVendorData.hallParking ===
                                          "UNAVAILABLE"
                                        }
                                        onChange={(e) =>
                                          handleHallVendorData(
                                            "hallParking",
                                            e.target.value
                                          )
                                        }
                                      />
                                      <span>UnAvailable</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="sub-wrapper">
                                  <label className="title">Freez Day *</label>
                                  <>
                                    <input
                                      type="number"
                                      name="hallFreezDay"
                                      value={hallVendorData.hallFreezDay}
                                      onChange={(e) =>
                                        handleHallVendorData(
                                          "hallFreezDay",
                                          e.target.value
                                        )
                                      }
                                      style={
                                        hallVendorDataErrorInfo.hallFreezDay
                                          ? { border: "2px solid red" }
                                          : {}
                                      }
                                      placeholder="No of days"
                                      className="input"
                                    />
                                    {hallVendorDataErrorInfo.hallFreezDay && (
                                      <div className="inputError">
                                        <ErrorIcon className="icon" />
                                        <p>
                                          {hallVendorDataErrorInfo.hallFreezDay}
                                        </p>
                                      </div>
                                    )}
                                  </>
                                </div>
                              </div>
                            </>
                          )}
                      </div>
                    </>
                  )}
                </div>
              )}
            </form>
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
          </div>
        </div>
        <Dialog
          open={userConfirmationDialog}
          onClose={() => setUserConfirmationDialog(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Confirmation Dialog!"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure the provided information is correct to the best of
              your knowledge? Your input is crucial for accurate registration!!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setUserConfirmationDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setUserConfirmationDialog(false);
                setUserConfirmation(true);
              }}
              autoFocus
            >
              Proceed
            </Button>
          </DialogActions>
        </Dialog>
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

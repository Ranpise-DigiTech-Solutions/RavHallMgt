import React, { useState } from "react";
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';

// import { SignIn } from "@clerk/clerk-react";
// import {dark} from "@clerk/themes";

import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import CloseIcon from "@mui/icons-material/Close";
import FacebookIcon from "@mui/icons-material/Facebook";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ErrorIcon from '@mui/icons-material/Error';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { FcGoogle } from "react-icons/fc";
import { FaUserAlt } from "react-icons/fa";

import "./UserAuthDialog.scss";
import { Images } from "../../constants";
import PropTypes from 'prop-types'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UserAuthDialog({ open, handleClose }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState('');
  const [inputType, setInputType] = useState("EMAIL"); // "EMAIL" or "PHONE"
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [userType, setUserType] = useState("CUSTOMER"); // "CUSTOMER" or "VENDOR"
  const [authType, setAuthType] = useState("LOGIN"); // "LOGIN" or "REGISTER"

  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: ""
  });
  const [vendorInfo, setVendorInfo] = useState({
    fullName: "",
    email: "",
    brandName: "",
    cityName: "",
    vendorType: "",
    phone: "",
    password: "",
  });

  const handleCustomerInfo = (key, value)=> {
    setCustomerInfo(previousInfo => ({
      ...previousInfo,
      [key]: value
    }))
  }

  const validateInputValue = () => {
    if(inputType === "EMAIL") {
      if (!inputValue) {
        setInputError('Email address is required');
      } else if (!/\S+@\S+\.\S+/.test(inputValue)) {
        setInputError('Please enter a valid email address');
      } else if (!inputValue.endsWith('@gmail.com')) {
        setInputError('Couldn\'t find your account');
      } else {
        setInputError('');
      }
    } else if(inputType === "PHONE"){
      const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
      if (!inputValue) {
        setInputError('Phone number is required');
      } else if (!phoneRegex.test(inputValue)) {
        setInputError('Please enter a valid phone number');
      } else {
        setInputError('');
      }
    }
  };

  const handleSubmit = (e) => {
    console.log(inputValue);
    validateInputValue();
    e.preventDefault();
  };

  return (
    <div className="signInDialog__Container">
      <Dialog
        fullScreen={fullScreen}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        aria-labelledby="responsive-dialog-title"
        maxWidth="md"
      >
        <div 
          className="signInDialogMain__container"
          style={authType === "LOGIN" ? {height: "85vh"} : {height: "100vh"}}
        >
          <div className="img__wrapper">
            <p>India&apos;s Favourite <br/> Wedding planning <br/> paltform</p>
            <img src={Images.loginPageBg} alt="" />
          </div>
          <div 
            className="contents__wrapper"
            style={authType === "LOGIN" ? {padding: "2rem"} : {padding: "0 2rem"}}  
          >
            <div className="logo__wrapper">
              <img src={Images.logo} alt="" />
            </div>
            <h2 className="heading">
              {
                authType === "LOGIN"
                ?
                  <span>Sign In to EventifyConnect</span>
                : 
                  <span>Sign Up with EventifyConnect</span>
              }
            </h2>
            <p className="description">
              {
                authType === "LOGIN"
                ?
                  <span>Welcome back! Please sign in to continue</span>
                : 
                  <span>Join Us Today! Create your account to get started</span>
              }
            </p>
            <div
              className="otherSignInOptions__wrapper"
              style={authType === "LOGIN" ? {marginBottom: "2rem"} : {marginBottom: "1rem"}}
            >
              <div className="googleSignIn box">
                <FcGoogle className="googleIcon icon" />
                <p>Google</p>
              </div>
              <div className="facebookSignIn box">
                <FacebookIcon className="fbIcon icon" />
                <p>Facebook</p>
              </div>
              {/* <div className="microsoftSignIn box">
                <img src={Images.microsoft} alt="" className="microsoftIcon icon"/>
                <p>Microsoft</p>
              </div> */}
            </div>
            <div 
              className="line__separators"
              style={authType === "LOGIN" ? {marginBottom: "1.5rem"} : {marginBottom: "1rem"}}  
            >
              <div className="line__sep"></div>
              <p>or</p>
              <div className="line__sep"></div>
            </div>
            <form 
              onSubmit={handleSubmit}
              className="userInput__wrapper"  
            >
              {
                authType === "LOGIN"
                  &&
                <div className="inputField__wrapper">
                  <div className="title">
                    <p>
                      {
                        inputType === "EMAIL" 
                        ?
                          <span>Email address</span>
                        : 
                          <span>Phone number</span>  
                      }
                    </p>
                    <p>
                      {
                        inputType === "EMAIL"
                        ?
                          <span onClick={()=>{
                            setInputValue("91");
                            setInputType("PHONE");
                            setInputError("");
                          }}>Use phone</span>
                        : 
                          <span onClick={()=>{
                            setInputValue("");
                            setInputType("EMAIL");
                            setInputError("");
                          }}>Use email</span>
                      }
                    </p>
                  </div>
                  {
                    inputType === "EMAIL"
                    ?
                      <input
                        type="email"
                        name="email"
                        value={inputValue}
                        placeholder="username@gmail.com"
                        onChange={(e) => setInputValue(e.target.value)}
                        className={`input ${inputError && "input__errorInfo"}`}
                      />
                    :
                    <PhoneInput
                      country={'us'}
                      value={inputValue}
                      // eslint-disable-next-line no-unused-vars
                      onChange={(value, country) => setInputValue("+" + value)}
                      inputStyle={inputError ? {border: "2px solid red"} : {}}
                      inputProps={{
                        name: 'phone',
                        required: true,
                        autoFocus: true,
                        placeholder: 'Enter phone number'
                      }}
                    />
                  }
                  {
                    inputError 
                      &&
                    <div className="inputError">
                      <ErrorIcon className="icon"/>
                      <p>{inputError}</p>
                    </div>
                  }
                </div>
              }
              {
                authType === "REGISTER"
                  &&
                <>
                  <div className="inputField__wrapper wrapper">
                    <FaUserAlt className="icon" />
                    <div className="vertical-line"></div>
                    <input
                      type="text"
                      name="fullName"
                      spellCheck="false"
                      value={customerInfo.fullName}
                      placeholder="Enter your name"
                      onChange={(e) => handleCustomerInfo("fullName", e.target.value)}
                      className="input"
                    />
                  </div>
                  <div className="inputField__wrapper wrapper">
                    <EmailIcon className="icon"/>
                    <div className="vertical-line"></div>
                    <input
                      type="email"
                      name="email"
                      spellCheck="false"
                      value={customerInfo.email}
                      placeholder="username@gmail.com"
                      onChange={(e) => handleCustomerInfo("email", e.target.value)}
                      className={`input`}
                    />
                  </div>
                  <div className="inputField__wrapper wrapper">
                    <PhoneInput
                      country={'us'}
                      value={inputValue}
                      // eslint-disable-next-line no-unused-vars
                      onChange={(value, country) => setInputValue("+" + value)}
                      inputStyle={inputError ? {border: "2px solid red"} : {}}
                      inputProps={{
                        name: 'phone',
                        required: true,
                        autoFocus: true,
                        placeholder: 'Enter phone number'
                      }}
                    />
                  </div>
                  <div className="inputField__wrapper wrapper">
                    <LockIcon className="icon"/>
                    <div className="vertical-line"></div>
                    <input
                      type={passwordVisibility ? "text" : "password"}
                      name="password"
                      spellCheck="false"
                      value={customerInfo.password}
                      placeholder="Enter your password"
                      onChange={(e) => handleCustomerInfo("password", e.target.value)}
                      className={`input`}
                    />
                    <a onClick={()=> setPasswordVisibility(!passwordVisibility)}>
                      {
                        passwordVisibility
                        ?
                          <VisibilityIcon className="icon visibilityIcon"/>
                        :
                          <VisibilityOffIcon className="icon visibilityIcon"/>
                      }
                    </a>
                  </div>
                </>
              }
              <button 
                type="submit"
                style={authType === "LOGIN" ? {marginBottom: "2rem"} : {marginBottom: "1rem"}}    
              >
                <p>Continue</p>
                <ArrowRightIcon className="icon"/>
              </button>
            </form>
            <div 
              className="signUp__link"
              style={authType === "LOGIN" ? {marginBottom: "3.5rem"} : {marginBottom: "1rem"}}  
            >
              {
                authType === "LOGIN" ?
                  <>
                    <p>New to <span>EventifyConnect?</span></p>
                    <a onClick={()=> setAuthType("REGISTER")}>Sign Up</a>
                  </>
                :
                  <>
                    <p>Have an <span>account?</span></p>
                    <a onClick={()=> setAuthType("LOGIN")}>Sign In</a>
                  </>
              }
            </div>
            <div className="bottomLine__Sep"></div>
            <div className="switchUser__wrapper">
              <p>Are you a vendor?</p>
              <button>Business Sign-In</button>
            </div>
          </div>
        </div>
        <button className="cancelIcon" onClick={handleClose}>
          <CloseIcon />
        </button>
      </Dialog>
    </div>
  );
}

UserAuthDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
}

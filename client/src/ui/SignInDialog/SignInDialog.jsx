/* eslint-disable react/prop-types */
import React from "react";

import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
// import { SignIn } from "@clerk/clerk-react";
// import {dark} from "@clerk/themes";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import CloseIcon from '@mui/icons-material/Close';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import './SignInDialog.scss'
import { Images } from "../../constants";
// import { PropTypes } from 'prop-types';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SignInDialog({ 
  open,
  handleClose
}) {

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

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
      >
        <div className="img__wrapper">
          <img src={Images.loginPageBg} alt="" />
        </div>
        <div className="contents__wrapper">
          {/* <SignIn appearance={dark}/> */}
          <div className="logo__wrappe">
            <img src={Images.logo} alt="" />
          </div>
          <h2 className="heading">
            Sign In to EventifyConnect
          </h2>
          <p className="description">
            Welcome back! Please sign in to continue
          </p>
          <div className="otherSignInOptions__wrapper">
            <div className="googleSignIn">
              <GoogleIcon className="googleIcon"/>
              <p>Google</p>
            </div>
            <div className="facebookSignIn">
              <FacebookIcon className="googleIcon"/>
              <p>Facebook</p>
            </div>
          </div>
          <div className="line__separators">
            <div className="line__sep01"></div>
            <p>or</p>
            <div className="line__sep02"></div>
          </div>
          <div className="userInput__wrapper">
            <div className="inputField__wrapper">
              <p className="title">
                Email
              </p>
              <input type="email" name="email" placeholder="Enter your email address" value="email"/>
            </div>
            <div className="inputField__wrapper">
              <p className="title">
                Password
              </p>
              <input type="password" name="password" value="password"/>
            </div>
            <button type="submit">
              <p>Continue</p>
              <ArrowRightIcon />
            </button>
          </div>
        </div>
        <CloseIcon className="icon"/>
      </Dialog>
    </div>
  );
}

// SignInDialog.propTypes = {
//   open: PropTypes.boolean.isRequired,
//   handleClose: PropTypes.
// }

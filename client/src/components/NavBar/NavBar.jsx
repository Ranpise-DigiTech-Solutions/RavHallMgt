import "./NavBar.scss"

import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';

import { Images } from '../../constants';
import { SignInDialog } from '../../ui';
import { SignedIn, SignedOut, UserButton} from "@clerk/clerk-react";

export default function NavBar() {
  
  const [scrolled, setScrolled] = useState(false);
  const [isSignInDialogOpen, setSignInDialogOpen] = useState(false);

  const handleSignInButtonClick = () => {
    setSignInDialogOpen(true);
  };

  const handleSignInDialogClose = () => {
    setSignInDialogOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Check the scroll position and update the state accordingly
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
     // Attach the scroll event listener
     window.addEventListener('scroll', handleScroll);

     // Clean up the event listener when the component unmounts
     return () => {
       window.removeEventListener('scroll', handleScroll);
     };
   }, []);

  const handleSignOut = () => {
    console.log("Signout");
  }

  return (
    <>
        <div className={`navbar__wrapper ${scrolled ? 'scrolled' : ''}`}>
            <div className="logo__wrapper">
                <img src={Images.logo} alt="logo" className="logo" />
                <p className="title">Wed-Me</p>
            </div>    
            <div className="container">
                <a href="#" className="tag">Venues</a>
                <a href="#" className="tag">Our Value</a>
                <a href="#" className="tag">Contact Us</a>
                <a href="#" className="tag">Get Started</a>
                <>
                  <SignedIn>
                    <div className="userButton">
                      <UserButton onSignOut={handleSignOut}/>
                    </div>
                  </SignedIn>
                  <SignedOut>
                    <Button
                      variant="contained"
                      className="button"
                      onClick={handleSignInButtonClick}
                    >
                      Sign In
                    </Button>
                  </SignedOut>
                </>
            </div>
            {
              isSignInDialogOpen &&
                <SignInDialog open={isSignInDialogOpen} handleClose={handleSignInDialogClose}/>
            }
        </div>    
    </>
  )
}

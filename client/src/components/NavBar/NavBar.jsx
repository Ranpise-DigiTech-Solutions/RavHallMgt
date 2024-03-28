import "./NavBar.scss"

import { useState, useEffect } from 'react'
import Button from '@mui/material/Button';

import { Images } from '../../constants';
import { UserAuthDialog } from '../../sub-components';
// import { SignedIn, SignedOut, UserButton} from "@clerk/clerk-react";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [isSignInDialogOpen, setSignInDialogOpen] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);

  const handleSignInButtonClick = () => {
    setSignInDialogOpen(true);
  };

  const handleSignInDialogClose = () => {
    setSignInDialogOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > prevScrollY) {
        // Scrolling down, hide the navbar
        setScrolled(false);
      } else {
        // Scrolling up, show the navbar
        setScrolled(true);
      }

      // Update the previous scroll position
      setPrevScrollY(currentScrollY);
    };

    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollY]);

  return (
    <div className="navbar__container">
      <div className={`navbar__wrapper ${scrolled ? 'scrolled' : ''}`}>
        <div className="logo__wrapper">
          <img src={Images.logo} alt="logo" className="logo" />
          <div className="logodescription">
          <p className="title">EventifyConnect</p>
          <p className="tagline">- Connecting people together</p>
          </div>
        </div>
       
        <div className="container">
          <a href="#" className="tag">
            Venues
          </a>
          <a href="#" className="tag">
            Our Value
          </a>
          <a href="#" className="tag">
            Contact Us
          </a>
          <a href="#" className="tag">
            Get Started
          </a>
            <Button
              variant="contained"
              className="button"
              onClick={handleSignInButtonClick}
            >
              Sign In
            </Button>

          {/* <>
            <SignedIn>
              <div className="userButton">
                <UserButton />
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
          </> */}
        </div>
      </div>
        {isSignInDialogOpen && (
          <div className="signInDialog">
            <UserAuthDialog
              open={isSignInDialogOpen}
              handleClose={handleSignInDialogClose}
            />
          </div>
        )}
    </div>
  );
}
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import "./NavBar.scss";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import useMediaQuery from '@mui/material/useMediaQuery';

import { Images } from "../../constants";
import {
  UserAuthDialog,
  RegistrationForm
} from '../../components';
import { firebaseAuth } from "../../firebaseConfig.js";
import { userInfoActions } from "../../states/UserInfo/index.js";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [isSignInDialogOpen, setSignInDialogOpen] = useState(false);
  const [isRegistrationDialogOpen, setIsRegistrationDialogOpen] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [user, setUser] = useState(null);
  const [userAuthStateChangeFlag, setUserAuthStateChangeFlag] = useState(false);
  const userInfoStore = useSelector((state) => state.userInfo);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // New state for mobile menu

  const dispatch = useDispatch();

  const handleUserProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleUserProfileClose = () => {
    setAnchorEl(null);
  };

  const handleSignInButtonClick = () => {
    setSignInDialogOpen(true);
  };

  const handleSignInDialogClose = () => {
    setSignInDialogOpen(false);
  };
  const handleRegistrationDialogOpen = () => {
    setIsRegistrationDialogOpen(true);
  };

  const handleRegistrationDialogClose = () => {
    setIsRegistrationDialogOpen(false);
  };

  const handleLogout = async () => {
    try {
      await firebaseAuth.signOut(); // Sign out the current user
      setUserAuthStateChangeFlag(prevFlag => !prevFlag);
      dispatch(userInfoActions("userDetails", {}));
      console.log('User logged out successfully');
    } catch (error) { // Handle Error condition
      console.error('Error logging out:', error.message);
    }
  };

  useEffect(() => {
    try {
      console.log("ENTERED")
      const currentUser = firebaseAuth.currentUser;
      console.log(currentUser);

      if (currentUser) {
        // User is signed in
        setUser(currentUser);
      } else {
        // No user is signed in
        setUser(null);
      }
      if (!userInfoStore.userDetails) {
        // only if user details are not already available in redux store.. proceed to get it from db
      }

      // return () => unsubscribe();
    } catch (error) {
      console.error(error.message);
    }
  }, [userAuthStateChangeFlag]);

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
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollY]);

  // Function to toggle the mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Add media query for mobile view
  const isMobile = useMediaQuery('(max-width:768px)');

  return (
    <div className="navbar__container">
      <div className={`navbar__wrapper ${scrolled ? "scrolled" : ""}`}>
        <div className="logo__wrapper">
          <img src={Images.logo} alt="logo" className="logo" />
          <div className="logodescription">
            <p className="title">EventifyConnect</p>
            <p className="tagline">- Connecting people together</p>
          </div>
        </div>

        {isMobile ? (
          // Mobile view
          <div>
            <IconButton onClick={toggleMobileMenu} color="inherit">
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
            <Drawer
              anchor="right"
              open={mobileMenuOpen}
              onClose={toggleMobileMenu}
            >
              <Box
                sx={{ width: 250 }}
                role="presentation"
                onClick={toggleMobileMenu}
                onKeyDown={toggleMobileMenu}
              >
                <List>
                  {/* Add your menu items here */}
                  <ListItem button>
                    <ListItemText primary="Venues" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="Our Value" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="Contact Us" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="Get Started" />
                  </ListItem>
                </List>
              </Box>
            </Drawer>
          </div>
        ) : (
          // Desktop view
          <div className="tags__wrapper">
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
            {user ? (
              <React.Fragment>
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleUserProfileClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    className="userProfile"
                  >
                    <Avatar sx={{ width: 36, height: 36 }}>M</Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleUserProfileClose}
                  onClick={handleUserProfileClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt:1.5,
                      "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                      },
                      "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                      },
                      },
                      }}
                      transformOrigin={{ horizontal: "right", vertical: "top" }}
                      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                      >
                      <MenuItem onClick={handleUserProfileClose}>
                      <Avatar /> Profile
                      </MenuItem>
                      <MenuItem onClick={handleUserProfileClose}>
                      <Avatar /> My account
                      </MenuItem>
                      <Divider />
                      <MenuItem onClick={handleUserProfileClose}>
                      <ListItemIcon>
                      <PersonAdd fontSize="small" />
                      </ListItemIcon>
                      Add another account
                      </MenuItem>
                      <MenuItem onClick={handleUserProfileClose}>
                      <ListItemIcon>
                      <Settings fontSize="small" />
                      </ListItemIcon>
                      Settings
                      </MenuItem>
                      <MenuItem onClick={()=> {
                      handleUserProfileClose();
                      handleLogout();
                      }}>
                      <ListItemIcon>
                      <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout
                      </MenuItem>
                      </Menu>
                      </React.Fragment>
                      ) : (
                      <Button
                                   variant="contained"
                                   className="button"
                                   onClick={handleSignInButtonClick}
                                 >
                      Sign In
                      </Button>
                      )}
                      </div>
                      )}
                      </div>
                      {isSignInDialogOpen && (
                      <div className="signInDialog">
                      <UserAuthDialog
                               open={isSignInDialogOpen}
                               handleClose={handleSignInDialogClose}
                               setUserAuthStateChangeFlag={setUserAuthStateChangeFlag}
                               handleRegistrationDialogOpen={handleRegistrationDialogOpen}
                             />
                      </div>
                      )}
                      {isRegistrationDialogOpen && (
                      <div className="userRegistrationDialog">
                      <RegistrationForm
                               open={isRegistrationDialogOpen}
                               handleClose={handleRegistrationDialogClose}
                             />
                      </div>
                      )}
                      </div>
                      );
                      }
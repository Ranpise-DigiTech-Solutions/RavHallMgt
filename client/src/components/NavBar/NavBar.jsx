import "./NavBar.scss"

import React from 'react'
import Button from '@mui/material/Button';

import { Images } from '../../constants';

export default function NavBar() {
  return (
    <>
        <div className="main__wrapper">
            <div className="logo__wrapper">
                <img src={Images.logo} alt="logo" className="logo" />
                <p className="title">Wed-Me</p>
            </div>    
            <div className="container">
                <a href="#" className="tag">Venues</a>
                <a href="#" className="tag">Our Value</a>
                <a href="#" className="tag">Contact Us</a>
                <a href="#" className="tag">Get Started</a>
                <Button variant="contained" href="/sign-in" className="button">Sign In</Button>
            </div>
        </div>    
    </>
  )
}

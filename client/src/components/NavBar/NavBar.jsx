import "./NavBar.scss"

import React from 'react'
import Button from '@mui/material/Button';

import { Logo } from "../../assets";

export default function NavBar() {
  return (
    <>
        <div className="main__wrapper">
            <div className="logo__wrapper">
                <img src={Logo} alt="logo" className="logo" />
                {/* <p className="logo">logo</p> */}
            </div>    
            <div className="container">
                <a href="#">Venues</a>
                <a href="#">Our Value</a>
                <a href="#">Contact Us</a>
                <a href="#">Get Started</a>
                <Button variant="contained">Contact</Button>
            </div>
        </div>    
    </>
  )
}

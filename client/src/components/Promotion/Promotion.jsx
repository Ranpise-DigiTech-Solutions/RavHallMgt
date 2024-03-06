import "./Promotion.scss"

import React from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Button from '@mui/material/Button';
import { Wedding } from "../../assets";

export default function Promotion() {
  return (
    <>
        <div className="app__container">
            <div className="sub__wrapper_1">
                <div className="title__wrapper">
                    <h2>Discover <br/> Most Suitable <br/> Partner</h2>
                </div>
                <div className="description__wrapper">
                    <p>Discover your dream wedding with our enchanting website.<br/> Plan every detail and share the magic with loved ones.</p>
                </div>
                <div className="search__wrapper">
                    <a href="#" className="location_icon">
                        <LocationOnIcon/>
                    </a>
                    <input type="text" id="cityName" name="cityName" placeholder="Enter the city name"/>
                    <Button variant="contained" className="button">Search</Button>
                </div>
                <div className="views__wrapper">
                    <div className="item">
                        <p className="count">9,000+</p>
                        <p className="desc">Premium Product</p>
                    </div>
                    <div className="item">
                        <p className="count">2,000+</p>
                        <p className="desc">Happy Customer</p>
                    </div>
                    <div className="item">
                        <p className="count">28+</p>
                        <p className="desc">Awards Winning</p>
                    </div>
                </div>
            </div>
            <div className="sub__wrapper_2">
                <img src={Wedding} alt="" />    
            </div>    
        </div> 
        <p>adad</p>
    </>
  )
}

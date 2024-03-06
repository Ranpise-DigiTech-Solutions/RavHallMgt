import "./Promotion.scss"

import React from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Button from '@mui/material/Button';

export default function Promotion() {
  return (
    <>
        <div className="app__container">
            <div className="sub__wrapper_1">
                <div className="title__wrapper">
                    <h2>Discover Most Suitable Partner</h2>
                </div>
                <div className="description__wrapper">
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo, delectus minus praesentium inventore ea corporis.</p>
                </div>
                <div className="search__wrapper">
                    <div className="wrapper">
                        <LocationOnIcon/>
                        <Button variant="contained">Contact</Button>
                    </div>
                </div>
                <div className="views__wrapper">
                    <div className="item_1">
                        <p>9,000+</p>
                        <p>Premium Product</p>
                    </div>
                    <div className="item_2">
                        <p>2,000+</p>
                        <p>Happy Customer</p>
                    </div>
                    <div className="item_3">
                        <p>28+</p>
                        <p>Awards Winning</p>
                    </div>
                </div>
            </div>
            <div className="sub_wrapper_2">
                {/* <img src="" alt="" />     */}
            </div>    
        </div> 
    </>
  )
}

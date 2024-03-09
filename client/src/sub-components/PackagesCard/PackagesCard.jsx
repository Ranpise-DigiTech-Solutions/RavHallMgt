import React from 'react'
import './PackagesCard.scss'

import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

import { Images } from "../../constants";

export default function PackagesCard({ card }) {
  return (
    <div className="box__wrapper">
          <div className="image__wrapper">
            <img src={Images.wedding2} alt="Img" />
          </div>
          <div className="contents__wrapper">
            <div className="wrapper wrapper_1">
              <h2>{card.title}</h2>
              <div className="ratings">
                <p>{card.rating}</p>
                <StarIcon className="starIcon" />
              </div>
            </div>
            <div className="description">
              {card.description}
            </div>
            <div className="wrapper wrapper_2">
              <div className="sub__wrapper">
                <LocationOnIcon className="icon" />
                <p>{card.location}</p>
              </div>
              <div className="sub__wrapper">
                <MonetizationOnIcon className="icon" />
                <p>
                  {card.rate} <span> / package</span>
                </p>
              </div>
            </div>
          </div>
        </div>
  )
}

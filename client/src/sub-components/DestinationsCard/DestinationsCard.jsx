import React from "react";
import "./DestinationsCard.scss";
import StarIcon from "@mui/icons-material/Star";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export default function DestinationsCard({ card }) {
  return (
    <div className="card__container">
      <img
        src={`https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg`}
        alt="banner"
      />
      <div className="overlay"></div>
      <div className="wrapper">
        <div className="tags">
            <button className="discount">{card.discount}</button>
            {card.new && <button className="new">new</button>}
        </div>
        <div className="contents">
            <div className="stars">
              <div className="icons">
                <span>
                    <StarIcon className="bx-icon"/>
                </span>
                <span>
                    <StarIcon className="bx-icon"/>
                </span>
                <span>
                    <StarIcon className="bx-icon"/>
                </span>
                <span>
                    <StarIcon className="bx-icon"/>
                </span>
                <span>
                    <StarIcon className="bx-icon inactive"/>
                </span>
              </div>
              <div className="reviews">
                {`(${card.reviews} Reviews)`}
              </div>
            </div>
            <div className="title">{card.title}</div>
            <div className="description">{card.description}</div>
            <div className="expiry__date">
              <div>
                  <AccessTimeIcon className="icon"/>
              </div>
              <div className="deadline">{`${card.deadline}`}</div>
            </div>
        </div>
      </div>
    </div>
  );
}

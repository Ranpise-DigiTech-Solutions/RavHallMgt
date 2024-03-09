import React from "react";
import "./Packages.scss";
import { PackagesCard } from '../../sub-components'

const cardsArray = {
  card1: {
    title: "London Bridge",
    rating: 4.9,
    description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum porro esse deserunt dignissimos asperiores rem!",
    location: "England",
    rate: 220
  },
  card2: {
    title: "London Bridge",
    rating: 4.9,
    description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum porro esse deserunt dignissimos asperiores rem!",
    location: "England",
    rate: 220
  },
  card3: {
    title: "London Bridge",
    rating: 4.9,
    description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum porro esse deserunt dignissimos asperiores rem!",
    location: "England",
    rate: 220
  },
  card4: {
    title: "London Bridge",
    rating: 4.9,
    description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum porro esse deserunt dignissimos asperiores rem!",
    location: "England",
    rate: 220
  },
  card5: {
    title: "London Bridge",
    rating: 4.9,
    description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum porro esse deserunt dignissimos asperiores rem!",
    location: "England",
    rate: 220
  },
}

export default function Packages() {
  return (
    <div className="packages__container" id="packages">
      <div className="tags__wrapper">
        <div className="tag">
          <button>Most Popular</button>
        </div>
        <div className="tag">
          <button>Top Rated</button>
        </div>
        <div className="tag">
          <button>Most Liked</button>
        </div>
        <div className="tag">
          <button>Oldest</button>
        </div>
        <div className="tag">
          <button className="special">All</button>
        </div>
      </div>
      <div className="packages__wrapper">
        {Object.values(cardsArray).map((card, index) => (
          <div
            className="card"
            key={index}
          >
            <PackagesCard key={index} card={card}/>
          </div>
        ))}
      </div>
    </div>
  );
}

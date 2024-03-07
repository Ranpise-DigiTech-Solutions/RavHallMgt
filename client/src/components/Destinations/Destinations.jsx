import React from "react";
import "./Destinations.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { DestinationsCard } from "../../sub-components";
import { MotionWrap } from '../../wrapper'

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1.75,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const cardsData = {
  card1: {
    discount: "20% off",
    new: true,
    stars: 4,
    reviews: 2,
    title: "Autumn in Japan | $3,500",
    description:
      "6 excursions to the main cities of the country, admire the beautiful autumn gardens",
    deadline: "7 days",
  },
  card2: {
    discount: "20% off",
    new: false,
    stars: 4,
    reviews: 4,
    title: "Autumn in Japan | $3,500",
    description:
      "6 excursions to the main cities of the country, admire the beautiful autumn gardens",
    deadline: "7 days",
  },
  card3: {
    discount: "25% off",
    new: true,
    stars: 5,
    reviews: 5,
    title: "Autumn in Japan | $3,500",
    description:
      "6 excursions to the main cities of the country, admire the beautiful autumn gardens",
    deadline: "7 days",
  },
  card4: {
    discount: "40% off",
    new: false,
    stars: 4,
    reviews: 2,
    title: "Autumn in Japan | $3,500",
    description:
      "6 excursions to the main cities of the country, admire the beautiful autumn gardens",
    deadline: "7 days",
  },
  card5: {
    discount: "20% off",
    new: true,
    stars: 5,
    reviews: 10,
    title: "Autumn in USA | $8,500",
    description:
      "6 excursions to the main cities of the country, admire the beautiful autumn gardens",
    deadline: "7 days",
  },
};

const Destinations = () => {
  const cardsArray = Object.values(cardsData);

  const carouselRef = React.createRef();

  const handleCustomPrevClick = () => {
    if (carouselRef.current) {
      // carouselRef.current.goToSlide(carouselRef.current.state.currentSlide - 1);
      const currentSlide = carouselRef.current.state.currentSlide;
      const totalSlides = carouselRef.current.state.totalItems;

      // If on the first slide, go to the last slide; otherwise, go to the previous slide
      const targetSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;

      carouselRef.current.goToSlide(targetSlide);
    }
  };
  
  const handleCustomNextClick = () => {
    if (carouselRef.current) {
      carouselRef.current.goToSlide(carouselRef.current.state.currentSlide + 1);
    }
  };

  return (
    <div className="main__container destinations__container">
      <div className="destination__wrapper">
        <div className="sub__wrapper_1">
          <p className="caption">popularity</p>
          <div className="wrapper">
            <div className="title">
              <h2>
                most popular <br /> marriage destinations
              </h2>
            </div>

            <div className="navigation__buttons">
              <button className="main__button button">view all tours</button>

              <button className="arrow__buttons button" onClick={handleCustomPrevClick}>
                <ArrowBackIcon />
              </button>

              <button className="arrow__buttons button" onClick={handleCustomNextClick}>
                <ArrowForwardIcon />
              </button>
            </div>
          </div>
        </div>
        <div className="sub__wrapper_2">
            <Carousel
            ref={carouselRef}
              responsive={responsive}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
              swipeable={true}
              draggable={false}
              infinite={true}
              autoPlay={true}  
              autoPlaySpeed={4000}
              keyBoardControl={false}
              slidesToSlide={1}
              arrows={false}
              renderButtonGroupOutside
            >
              {cardsArray.map((card, index) => (
                <div
                  className="card"
                >
                  <DestinationsCard key={index} card={card} />
                </div>
              ))}
            </Carousel>
        </div>
      </div>
    </div>
  );
}

export default MotionWrap(Destinations, "");
// export default Destinations;

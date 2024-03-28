// Import necessary modules and components
import { useState, useEffect } from 'react';
import './HallDescription.scss'; // Import SCSS file
import ReactStars from 'react-stars';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Button from '@mui/material/Button';
import BookingConfirmation from '../BookingConfirmationPage/BookingConfirmation';
// Define Slider component
const Slider = () => {
  // State for current slide
  const [curSlide, setCurSlide] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    // Populate with initial booking details or fetch them as required
  });

  const handleBooking = () => {
    setShowPopup(true); // This should set showPopup state to true when "Book Now" button is clicked
  };
  // Array of slide image URLs
  const slideImages = [
    "https://source.unsplash.com/random?venue hall",
    "https://source.unsplash.com/random?hall venue",
    "https://source.unsplash.com/random?Banquet",
    "https://source.unsplash.com/random?Sangeet"
  ];

  // Function to go to the next slide
  const nextSlide = () => {
    setCurSlide(curSlide === slideImages.length - 1 ? 0 : curSlide + 1);
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurSlide(curSlide === 0 ? slideImages.length - 1 : curSlide - 1);
  };

  // Function to handle rating change
  const ratingChanged = (newRating) => {
    console.log(newRating);
    // You can do something with the newRating here if needed
  };

  useEffect(() => {
    // Automatically switch to next slide every 2 seconds
    const interval = setInterval(() => {
      nextSlide();
    }, 2500);

    // Cleanup function to clear the interval when component unmounts
    return () => clearInterval(interval);
  }, [curSlide]); // Dependency array to ensure effect runs when curSlide changes

  // Render component JSX
  return (
    <div className='hallDescription__container'>
      <div className="slider">
        {slideImages.map((image, index) => (
          <div key={index} className="slide" style={{ transform: `translateX(${100 * (index - curSlide)}%)` }}>
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
        <button className="btn btn-next" onClick={nextSlide}> &gt; </button>
        <button className="btn btn-prev" onClick={prevSlide}> &lt; </button>
      </div>
      <div className='quickinfo'>
        <h2>TMA Pai International</h2>
        <h3 className="location">
          <a href="https://www.google.com/maps/dir//TMA+Pai+Convention+Centre,+MG+Rd,+Kodailbail,+Mangaluru,+Karnataka+575003/@12.8803793,74.7986391,13z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3ba35a44b7805283:0xbb55b8b40db48da!2m2!1d74.8398387!2d12.8803825?entry=ttu">
            <FaMapMarkerAlt /> Kodialbail, Mangaluru
          </a>
        </h3>
        <ReactStars
          count={5}
          value={4} // Initially set to 4 stars
          onChange={ratingChanged}
          size={40}
          color2={'#ffd700'}
          edit={false}
        />

        <Button
          onClick={handleBooking}
          variant="contained"
          className="button"
          sx={{
            backgroundColor: 'orange',
            '&:hover': {
              backgroundColor: 'darkorange', // Change to your desired shade of orange
            },
          }}
        >
          Book Now
        </Button>
        <BookingConfirmation
        isOpen={showPopup}
        details={bookingDetails}
        onClose={() => setShowPopup(false)}
      />
      </div>
    </div>
  );
};

export default Slider; // Export Slider component

import "./AdditionalVendorDetails.scss";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from 'prop-types';

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import StarIcon from '@mui/icons-material/Star';
import PlaceIcon from '@mui/icons-material/Place';
import ErrorIcon from '@mui/icons-material/Error';

import { Images } from "../../constants";
import { bookingInfoActions } from "../../states/BookingInfo";

const similarVendorsData = [
    {
        brandName: "Sun Hotel & Resort",
        location: "Abu Road, Udaipur",
        ratings: 4.9,
        reviews: 41,
        availability: "AVAILABLE",
        Image: Images.Hall_05
    },
    {
        brandName: "Sun Hotel & Resort",
        location: "Abu Road, Udaipur",
        ratings: 4.9,
        reviews: 41,
        availability: "AVAILABLE",
        Image: Images.Hall_04
    },
    {
        brandName: "Sun Hotel & Resort",
        location: "Abu Road, Udaipur",
        ratings: 4.9,
        reviews: 41,
        availability: "AVAILABLE",
        Image: Images.Hall_06
    },
]

export default function AdditionalVendorDetails({
    handleBookingDetailsDialogOpen,
}) {

    const dispatch = useDispatch();
    const bookingInfoStore = useSelector((state) => state.bookingInfo);

    function getDayOfWeek(date) {
        const daysOfWeek = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        const dayIndex = new Date(date).getDay();
        return daysOfWeek[dayIndex];
    }

    const handleBookingDateChange = (event) => {
        dispatch(bookingInfoActions("bookingDate", event.target.value));
        dispatch(bookingInfoActions("bookingDay", getDayOfWeek(new Date(event.target.value))))
    }

    const handleBookingStartTimeChange = (event)=> {
        const [HH, MM] = event.target.value.split(":");
        const endHour = parseInt(HH) < 23 ? parseInt(HH) + 1 : "00";
        dispatch(bookingInfoActions("startTime", event.target.value))
        dispatch(bookingInfoActions("endTime", `${endHour.toString().padStart(2, '0')}:${MM}`));
        dispatch(bookingInfoActions("errorInfo", ""));
    } 

    const handleBookingEndTimeChange = (event) => {
        if(event.target.value === bookingInfoStore.startTime) {
            dispatch(bookingInfoActions("errorInfo", "End time cannot be same as Start time."));
            return;
        }
        dispatch(bookingInfoActions("endTime", event.target.value));
        dispatch(bookingInfoActions("errorInfo", ""));
    }

  return (
    <div className="additionalVendorDetails__container">
        <div className="pricingInformation__wrapper">
            <div className="title__wrapper">
                <p className="title">Starting price</p>
                <div className="dropDown__wrapper">
                <p className="dropDown__title">Pricing Info</p>
                <KeyboardArrowDownIcon className="icon" />
                </div>
            </div>
            <div className="lineSeparator"></div>
            <div className="pricing__wrapper">
                <div className="rate__wrapper">
                <CurrencyRupeeIcon className="icon" />
                <p>
                    1,200 per plate <span>(taxes extra)</span>
                </p>
                </div>
                <div className="sub-title">Veg</div>
            </div>
            <div className="lineSeparator"></div>
            <div className="pricing__wrapper">
                <div className="rate__wrapper">
                <CurrencyRupeeIcon className="icon" />
                <p>
                    1,200 per plate <span>(taxes extra)</span>
                </p>
                </div>
                <div className="sub-title">Non-Veg</div>
            </div>
            <div className="lineSeparator"></div>
            <div className="contactBtn__wrapper">
                <button className="btn">
                    <MailOutlineIcon className="icon" />
                    <p className="btn-caption">Send Message</p>
                </button>
                <button className="btn">
                    <PhoneIcon className="icon" />
                    <p className="btn-caption">View Contact</p>
                </button>
            </div>
        </div>
        <div className="similarVendors__wrapper">
            <div className="title__wrapper">
                <p className="title">
                    Browse similar vendors
                </p>
                <button className="btn">View All</button>
            </div>
            <div className="vendorList__wrapper">
                {similarVendorsData.map((data, index)=> (
                    <div className="vendor" key={index}>
                        <div className="img__wrapper">
                            <img src={data.Image} alt="" />
                        </div>
                        <div className="contents__wrapper">
                            <div className="sub-contents__wrapper">
                                <div className="wrapper wrapper-1">
                                    <p className="title">
                                        {data.brandName}
                                    </p>
                                    <div className="ratings__wrapper">
                                        <StarIcon className="icon"/>
                                        <p className="rating">{data.ratings}</p>
                                    </div>
                                </div>
                                <div className="wrapper wrapper-2">
                                    <div className="location__wrapper">
                                        <PlaceIcon className="icon"/>
                                        <p className="location">{data.location}</p>
                                    </div>
                                    <p className="reviews">
                                        41 reviews
                                    </p>
                                </div>
                            </div>
                            <div className="sub-contents__wrapper">
                                <div className="wrapper wrapper-3">
                                    <p>{data.availability}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="navigationBtns__wrapper">
                <button className="btn">
                    <KeyboardArrowLeftIcon className="icon"/>
                </button>
                <button className="btn">
                    <KeyboardArrowRightIcon className="icon"/>
                </button>
            </div>
        </div> 
        <div className="availabilityChecker__wrapper">
            <div className="title__wrapper">
                <p className="title">
                    Check availability 
                </p>
            </div>
            <div className="inputFields__wrapper">
                <div className="wrapper">
                    <p className="inputTitle">
                        Date of booking
                    </p>
                    <div className="input">
                        <input 
                            type="date"
                            value={bookingInfoStore?.bookingDate}
                            placeholder="dd/mm/yyyy"
                            onChange={handleBookingDateChange}
                        />
                    </div>
                </div>
                <div className="wrapper">
                    <p className="inputTitle">
                        Start Time
                    </p>
                    <div className="input">
                        <input 
                            type="time"
                            placeholder="dd/mm/yyyy"
                            value={bookingInfoStore?.startTime}
                            onChange={handleBookingStartTimeChange}
                        />
                    </div>
                </div>
                <div className="wrapper">
                    <p className="inputTitle">
                        End Time
                    </p>
                    <div className="input">
                        <input 
                            type="time"
                            value={bookingInfoStore?.endTime}
                            placeholder="dd/mm/yyyy"
                            onChange={handleBookingEndTimeChange}
                        />
                    </div>
                </div>
                <div className="wrapper">
                    <p className="inputTitle">
                        Booking Duration
                    </p>
                    <div className="input__wrapper">
                        <div className="sub-wrapper">
                            <label htmlFor="hoursInput" className="label">Hours:</label>
                            <input
                                type="number"
                                name="hoursInput"
                                value={parseInt(bookingInfoStore?.bookingDuration.substring(0, 2))}
                                className="sub-input"
                                disabled
                            />
                        </div>
                        <div className="sub-wrapper">
                            <label htmlFor="minutesInput" className="label">Minutes:</label>
                            <input
                                type="number"
                                name="minutesInput"
                                value={parseInt(bookingInfoStore?.bookingDuration.substring(3, 5))}
                                className="sub-input"
                                disabled
                            />
                        </div>
                    </div>
                </div>
                <div className="userInfo__wrapper">
                    {bookingInfoStore.errorInfo && (
                        <div className="inputError">
                            <ErrorIcon className="icon" />
                            <p>{bookingInfoStore.errorInfo}</p>
                        </div>
                    )}
                    <p className="desc">* Please read the terms and conditions carefully</p>
                </div>
                <div className="btn__wrapper">
                    <button className="btn">
                        Check Slot
                    </button>
                    <button 
                        className="btn"
                        onClick={handleBookingDetailsDialogOpen}
                    >
                        Book Now
                    </button>
                </div>
            </div>
            <div className="advertisement__wrapper">
                <div className="img__wrapper">
                    <img src={Images.advertisement2} alt="" />
                </div>
            </div>
        </div>
    </div>
  );
}

AdditionalVendorDetails.propTypes = {
    handleBookingDetailsDialogOpen: PropTypes.func.isRequired,
}

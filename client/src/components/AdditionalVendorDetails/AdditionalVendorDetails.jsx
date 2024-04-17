import "./AdditionalVendorDetails.scss";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import StarIcon from '@mui/icons-material/Star';
import PlaceIcon from '@mui/icons-material/Place';

import { Images } from "../../constants";

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

export default function AdditionalVendorDetails() {
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
    </div>
  );
}

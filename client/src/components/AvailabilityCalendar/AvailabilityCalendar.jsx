/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";

import Tooltip from "@mui/material/Tooltip";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import "./AvailabilityCalendar.scss";
import "react-datepicker/dist/react-datepicker.css";
import "react-multi-carousel/lib/styles.css";

import { bookingInfoActions } from "../../states/BookingInfo";

export default function AvailabilityCalendar({ hallData }) {
  const timeSlots = {
    8: false,
    9: false,
    10: false,
    11: false,
    12: false,
    13: false,
    14: false,
    15: false,
    16: false,
    17: false,
    18: false,
    19: false,
    20: false,
    21: false,
    22: false,
    23: false,
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
  };
  const calendar = {
    Monday: { date: "", timeSlots: { ...timeSlots } },
    Tuesday: { date: "", timeSlots: { ...timeSlots } },
    Wednesday: { date: "", timeSlots: { ...timeSlots } },
    Thursday: { date: "", timeSlots: { ...timeSlots } },
    Friday: { date: "", timeSlots: { ...timeSlots } },
    Saturday: { date: "", timeSlots: { ...timeSlots } },
    Sunday: { date: "", timeSlots: { ...timeSlots } },
  };
  console.log("CALENDAR", calendar);
  const [availabilityCalendar, setAvailabilityCalendar] = useState(calendar);
  const containerRef = useRef(null);
  const [startDate, setStartDate] = useState(new Date());
  const [startDateOfWeek, setStartDateOfWeek] = useState(null);
  const [endDateOfWeek, setEndDateOfWeek] = useState(null);

  const dispatch = useDispatch();
  const bookingInfoStore = useSelector((state) => state.bookingInfo);

  const startOfWeek = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday
    return new Date(d.setDate(diff));
  };

  const endOfWeek = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? 0 : 7); // Adjust for Sunday
    return new Date(d.setDate(diff));
  };

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

  const setDates = async (startDateOfWeek, endDateOfWeek) => {
    const updatedCalendar = { ...availabilityCalendar };
    const currentDate = new Date(startDateOfWeek);

    while (currentDate <= endDateOfWeek) {
      const formattedDate = currentDate.toLocaleDateString("en-GB"); // Format: "dd/mm/yyyy"
      const dayOfWeek = currentDate.toLocaleDateString("en-US", {
        weekday: "long",
      });

      if (Object.prototype.hasOwnProperty.call(updatedCalendar, dayOfWeek)) {
        updatedCalendar[dayOfWeek].date = formattedDate;
      }

      currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }

    setAvailabilityCalendar(updatedCalendar);
  };

  const getAvailability = async () => {
    try {
      if (startDateOfWeek && endDateOfWeek) {
        const formattedStartDateOfWeek =
          startDateOfWeek.getFullYear() +
          "-" +
          (startDateOfWeek.getMonth() + 1).toString().padStart(2, "0") +
          "-" +
          startDateOfWeek.getDate().toString().padStart(2, "0");

        const formattedEndDateOfWeek =
          endDateOfWeek.getFullYear() +
          "-" +
          (endDateOfWeek.getMonth() + 1).toString().padStart(2, "0") +
          "-" +
          endDateOfWeek.getDate().toString().padStart(2, "0");

        console.log(hallData._id);
        console.log(formattedStartDateOfWeek);
        console.log(formattedEndDateOfWeek);

        const response = await axios.get(
          `http://localhost:8000/eventify_server/hallBookingMaster/getHallAvailability?hallId=${hallData._id}&startDate=${formattedStartDateOfWeek}&endDate=${formattedEndDateOfWeek}`
        );
        console.log(response.data);
        const bookings = response.data;
        const tempCalendar = { ...availabilityCalendar };
        console.log("ENTEREDDDDD0000");
        if (bookings) {
          bookings.map((booking) => {
            const bookingTimestamp = booking.bookingTimestamp;
            const bookingDate = new Date(bookingTimestamp);
            // bookingDate.setUTCHours(0);
            console.log(bookingDate);

            const bookingHour = bookingDate.getUTCHours();
            const dayOfWeek = getDayOfWeek(bookingDate);
            console.log(bookingHour);
            console.log(dayOfWeek);
            const bookingDuration = booking.bookingDuration;
            for (var i = 0; i < bookingDuration; i++) {
              const hour = (bookingHour + i) % 24;
              console.log("HOUR" + hour);
              tempCalendar[dayOfWeek]["timeSlots"][hour] = true;
            }
          });
          console.log("ENTEREDDDDD");
          setAvailabilityCalendar(tempCalendar);
          console.log(availabilityCalendar);
        }
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const formatBookingDate = (date) => {
    // yyyy-mm-dd to dd/mm/yyyy
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  const formatDate = (date) => {
    // new Date()  to  dd/mm/yyyy
    const dateObject = new Date(date);
    const day = String(dateObject.getDate()).padStart(2, "0");
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const year = dateObject.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const formatBookingTime = (time) => {
    const [HH, MM] = time.split(":");
    return parseInt(`${HH}`);
  };

  const isSelectedSlot = (timeSlot) => {
    if(!bookingInfoStore.startTime || !bookingInfoStore.endTime) {
      return;
    }
    const formattedStartTime = formatBookingTime(bookingInfoStore.startTime);
    const formattedEndTime = formatBookingTime(bookingInfoStore.endTime);
    if (formattedEndTime < formattedStartTime) {
      return timeSlot >= formattedStartTime || timeSlot < formattedEndTime;
    } else {
      return timeSlot >= formattedStartTime && timeSlot < formattedEndTime;
    }
  };

  useEffect(() => {
    if (startDate) {
      console.log("CHECK0" + startDate);
      setStartDateOfWeek(startOfWeek(startDate));
      setEndDateOfWeek(endOfWeek(startDate));
    }
  }, [startDate]);

  useEffect(() => {
    if (startDateOfWeek && endDateOfWeek) {
      console.log("CHECK" + startDateOfWeek, endDateOfWeek);
      setDates(startDateOfWeek, endDateOfWeek);
      getAvailability();
    }
  }, [startDateOfWeek, endDateOfWeek]);

  useEffect(() => {
    try {
      const bookingDate = bookingInfoStore.bookingDate;
      if (!bookingDate) {
        const [dd, mm, yyyy] = formatDate(startDate).split("/");
        dispatch(bookingInfoActions("bookingDate", `${yyyy}-${mm}-${dd}`));
        dispatch(bookingInfoActions("bookingDay", getDayOfWeek(startDate)));
        return;
      }
      const newFormatBookingDate = formatBookingDate(bookingDate);

      for (const day in availabilityCalendar) {
        if (availabilityCalendar[day].date === newFormatBookingDate) {
          return;
        }
      }
      
      setStartDate(bookingInfoStore.bookingDate);
    } catch (error) {
      console.error(error.message);
    }
  }, [bookingInfoStore.bookingDate]);

  useEffect(()=> {
    if(!bookingInfoStore.startTime || !bookingInfoStore.endTime) {
      return;
    }
    try {
      // code to calculate the different between the time slots
      // Parse the start time and end time strings into Date objects
      const startTime = new Date(`2000-01-01T${bookingInfoStore.startTime}:00`);
      const endTime = new Date(`2000-01-01T${bookingInfoStore.endTime}:00`);
      
      // Calculate the time difference in milliseconds
      let timeDifference = endTime - startTime;
      
      // Handle the case where end time is earlier than start time (crosses midnight)
      if (timeDifference < 0) {
        const midnight = new Date(`2000-01-02T00:00:00`);
        timeDifference = midnight - startTime + (endTime - midnight);
      }

      // Convert the time difference from milliseconds to hours and minutes
      const hours = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

      // Format the time difference into a string representation
      const timeDifferenceStr = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

      dispatch(bookingInfoActions("bookingDuration", timeDifferenceStr));


      // code to check if there are any clashes with the existing bookings 
        var i;
        const bookingStartTime = parseInt(bookingInfoStore.startTime?.substring(0, 2));
        const bookingEndTime = parseInt(bookingInfoStore.endTime?.substring(0, 2));
        const bookingData = availabilityCalendar[bookingInfoStore.bookingDay]["timeSlots"];
      console.log("bookingStartTime " + bookingStartTime);
      console.log("bookingEndTime " + bookingEndTime);
      console.log("bookingData " + bookingData);

      if(bookingEndTime < bookingStartTime) {
        //check if there already exists a booking for that slot
        for(i=bookingStartTime; i<24; i++) {
          if(bookingData[i]) {
            dispatch(bookingInfoActions("errorInfo", "Sorry! This slot is already booked. Please choose a different slot to continue!!"));
            return;
          }
        }
        for(i=0; i<bookingEndTime; i++) {
          if(bookingData[i]) {
            dispatch(bookingInfoActions("errorInfo", "Sorry! This slot is already booked. Please choose a different slot to continue!!"));
            return;
          }
        }
      } else {
        for(i=bookingStartTime; i<bookingEndTime; i++) {
          if(bookingData[i]) {
            dispatch(bookingInfoActions("errorInfo", "Sorry! This slot is already booked. Please choose a different slot to continue!!"));
            return;
          }
        }
      }
      dispatch(bookingInfoActions("errorInfo", ""));
    } catch(error) {
      console.error(error.message);
    }
  }, [bookingInfoStore.startTime, bookingInfoStore.endTime])

  // eslint-disable-next-line no-unused-vars
  const rearrangeContent = () => {
    const container = containerRef.current;
    const contentHeight = container.scrollHeight;
    const scrollTop = container.scrollTop;
    const scrollHeight = container.clientHeight;

    if (scrollTop + scrollHeight >= contentHeight) {
      // If reached the bottom, move the content on top to the bottom
      container.append(...container.children);
      container.scrollTop = 0; // Reset scroll position to top
    }
  };

  // const handleScroll = () => {
  //   const container = containerRef.current;
  //   if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
  //     // Move the content that has scrolled out of view to the bottom
  //     const firstChild = container.firstChild.cloneNode(true);
  //     container.appendChild(firstChild);
  //     container.removeChild(container.firstChild);
  //     // Reset scroll position
  //     container.scrollTo({
  //       top: 0,
  //       behavior: 'auto' // You may choose 'smooth' if you want smooth scrolling
  //     });
  //   }
  // };

  // useEffect(() => {
  //   const container = containerRef.current;
  //   // Add scroll event listener
  //   container.addEventListener('scroll', rearrangeContent);
  //   // Remove scroll event listener on component unmount
  //   return () => {
  //     container.removeEventListener('scroll', rearrangeContent);
  //   };
  // }, []); // Run only once on component mount

  const handlePrevWeek = () => {
    setAvailabilityCalendar(calendar);
    setStartDate((prevStartDate) => {
      const newStartDate = new Date(prevStartDate);
      newStartDate.setDate(newStartDate.getDate() - 7);
      return newStartDate;
    });
  };

  const handleNextWeek = () => {
    setAvailabilityCalendar(calendar);
    setStartDate((prevStartDate) => {
      const newStartDate = new Date(prevStartDate);
      newStartDate.setDate(newStartDate.getDate() + 7);
      return newStartDate;
    });
  };

  const handleDateChange = (date, day) => {
    const [dd, mm, yyyy] = date.split("/");
    dispatch(bookingInfoActions("bookingDate", `${yyyy}-${mm}-${dd}`));
    dispatch(bookingInfoActions("bookingDay", day));
  };

  const handleTimeChange = (time, isBooked) => {
    const endTime = parseInt(time) < 23 ? parseInt(time) + 1 : "00";
    dispatch(bookingInfoActions("startTime", `${time.toString().padStart(2, '0')}:00`));
    dispatch(bookingInfoActions("endTime", `${endTime.toString().padStart(2, '0')}:00`));
    
    // if(isBooked) {
    //   dispatch(bookingInfoActions("errorInfo", "Sorry! This slot is already booked. Please choose a different slot to continue!!"))
    //   return;
    // }

    // dispatch(bookingInfoActions("errorInfo", ""))
  };

  return (
    <div className="availabilityCalendar__wrapper">
      <h2 className="heading">Availability Calander</h2>
      <div className="contents__wrapper">
        <div className="seven-day-date-picker">
          <div className="arrow" onClick={handlePrevWeek}>
            <FaChevronLeft className="icon" />
          </div>
          <div className="date-range">
            {/* <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            selectsStart
            startDate={startDateOfWeek}
            endDate={endDateOfWeek}
            inline
            startDateClassName="hover-date"
            dayClassName={(date) => {
              if (date.getTime() === startDate.getTime()) return 'selected-date';
              return null;
            }}
          /> */}
            <span>
              {startDateOfWeek
                ? startDateOfWeek.getDate().toString().padStart(2, "0") +
                  "/" +
                  (startDateOfWeek.getMonth() + 1).toString().padStart(2, "0") +
                  "/" +
                  startDateOfWeek.getFullYear().toString()
                : ""}
            </span>

            <span className="date-separator">-</span>
            {/* <DatePicker
            selected={endDateOfWeek}
            onChange={handleDateChange}
            selectsEnd
            startDate={startDateOfWeek}
            endDate={endDateOfWeek}
            inline
            endDateClassName="hover-date"
            dayClassName={(date) => {
              if (date.getTime() === endDateOfWeek.getTime()) return 'selected-date';
              return null;
            }}
          /> */}
            <span>
              {endDateOfWeek
                ? endDateOfWeek.getDate().toString().padStart(2, "0") +
                  "/" +
                  (endDateOfWeek.getMonth() + 1).toString().padStart(2, "0") +
                  "/" +
                  endDateOfWeek.getFullYear().toString()
                : ""}
            </span>
          </div>
          <div className="arrow" onClick={handleNextWeek}>
            <FaChevronRight className="icon" />
          </div>
        </div>
        <div className="days__wrapper">
          <div className="sub-wrapper">
            <div className="sub-title" style={{ visibility: "hidden" }}>
              Hours
            </div>
            <div className="title" style={{ visibility: "hidden" }}>
              Hours
            </div>
          </div>
          {availabilityCalendar &&
            Object.keys(availabilityCalendar).map((day) => {
              const dayInfo = availabilityCalendar[day]; // Access day information

              // Check if dayInfo exists before accessing its properties
              if (!dayInfo) return null; // Skip rendering if dayInfo is null or undefined

              return (
                <div
                  key={day}
                  className={`sub-wrapper ${
                    (bookingInfoStore.bookingDate
                      ? dayInfo.date ===
                        formatBookingDate(bookingInfoStore.bookingDate)
                      : dayInfo.date === formatDate(startDate)) &&
                    "currentSelection"
                  }`}
                >
                  <div className="sub-title">
                    {dayInfo.date.substring(0, 5)}
                  </div>
                  <div className="title">{day}</div>
                </div>
              );
            })}
        </div>
        {/* <div className="scrollBar__wrapper" ref={containerRef}>
        </div> */}
        <div className="content__wrapper" ref={containerRef}>
          <div className="timeSlots">
            <div className="timeSlots__wrapper">
              {Object.keys(timeSlots).map((timeSlot, index) => (
                <div key={index} className="time-slot">
                  {timeSlot.toString().padStart(2, "0") + ":00"}
                </div>
              ))}
            </div>
          </div>
          {availabilityCalendar &&
            Object.keys(availabilityCalendar).map((day) => {
              const dayInfo = availabilityCalendar[day]; // Access day information

              // Check if dayInfo exists before accessing its properties
              if (!dayInfo) return null; // Skip rendering if dayInfo is null or undefined

              return (
                <motion.div
                  key={day}
                  className="availableSlots__wrapper"
                  initial={{ opacity: 0 }} // Initial opacity
                  animate={{ opacity: 1 }} // Animation when component enters the DOM
                  exit={{ opacity: 0 }} // Animation when component exits the DOM
                  transition={{ duration: 0.5 }} // Animation duration
                  onClick={() => handleDateChange(dayInfo.date, day)}
                >
                  <div
                    className={`timeSlots__wrapper ${
                      (bookingInfoStore.bookingDate
                        ? dayInfo.date ===
                          formatBookingDate(bookingInfoStore.bookingDate)
                        : dayInfo.date === formatDate(startDate)) &&
                      "currentSelection"
                    }`}
                  >
                    {Object.entries(dayInfo.timeSlots).map(
                      ([timeSlot, isBooked]) => (
                        <Tooltip
                          key={timeSlot}
                          title={
                            isBooked
                              ? "This slot is already booked!"
                              : "This slot is currently available!"
                          }
                          placement="top"
                          enterDelay={1500} 
                          leaveDelay={0}
                        >
                          <div
                            className={`time-slot ${
                              bookingInfoStore.startTime &&
                              bookingInfoStore.endTime &&
                              dayInfo.date === formatBookingDate(bookingInfoStore.bookingDate) &&
                              isSelectedSlot(timeSlot) &&
                              "selectedTimeSlot"
                            }`}
                            onClick={() => handleTimeChange(timeSlot, isBooked)}
                          >
                            {isBooked ? (
                              <span className="unAvailableSlot">NA</span>
                            ) : (
                              <span className="availableSlot">Book</span>
                            )}
                            <span className="selectedSlot">
                              <CheckCircleOutlineIcon className="icon"/>
                            </span>
                          </div>
                        </Tooltip>
                      )
                    )}
                  </div>
                </motion.div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

AvailabilityCalendar.propTypes = {
  hallData: PropTypes.object.isRequired,
};

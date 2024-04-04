import { useState, useEffect, useRef } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

import "./AvailabilityCalendar.scss";
import "react-datepicker/dist/react-datepicker.css";
import "react-multi-carousel/lib/styles.css";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
  console.log("CALENDAR", calendar)
  const [availabilityCalendar, setAvailabilityCalendar] = useState(calendar);
  const containerRef = useRef(null);
  const [startDate, setStartDate] = useState(new Date());
  const [startDateOfWeek, setStartDateOfWeek] = useState(null);
  const [endDateOfWeek, setEndDateOfWeek] = useState(null);

  const startOfWeek = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday
    return new Date(d.setDate(diff));
  };

  const endOfWeek = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + 7; // Adjust for Sunday
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
            const bookingTimestamp = booking.booking_timestamp;
            const bookingDate = new Date(bookingTimestamp);
            // bookingDate.setUTCHours(0);
            console.log(bookingDate);

            const bookingHour = bookingDate.getUTCHours();
            const dayOfWeek = getDayOfWeek(bookingDate);
            console.log(bookingHour);
            console.log(dayOfWeek);
            const bookingDuration = booking.booking_duration;
            for (var i = 0; i < bookingDuration; i++) {
              const hour = ( bookingHour + i ) % 24;
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

  useEffect(() => {
    if (startDate) {
      setStartDateOfWeek(startOfWeek(startDate));
      setEndDateOfWeek(endOfWeek(startDate));
    }
  }, [startDate]);

  useEffect(() => {
    if (startDateOfWeek && endDateOfWeek) {
      setDates(startDateOfWeek, endDateOfWeek);
      getAvailability();
    }
  }, [startDateOfWeek, endDateOfWeek]);

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

  // Other JSX and handlers

  return (
    <div className="availabilityCalendar__wrapper">
      <div className="seven-day-date-picker">
        <div className="arrow" onClick={handlePrevWeek}>
          <FaChevronLeft />
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
          <FaChevronRight />
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
              <div key={day} className="sub-wrapper">
                <div className="sub-title">{dayInfo.date.substring(0, 5)}</div>
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
              >
                <div className="timeSlots__wrapper">
                  {Object.entries(dayInfo.timeSlots).map(
                    ([timeSlot, isBooked]) => (
                      <div key={timeSlot} className="time-slot">
                        {
                          isBooked && 
                        <span className="unAvailableSlot">
                          NA
                        </span>
                        }
                      </div>
                    )
                  )}
                </div>
              </motion.div>
            );
          })}
      </div>
    </div>
  );
}

AvailabilityCalendar.propTypes = {
  hallData: PropTypes.object.isRequired,
};

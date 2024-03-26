import { default as express } from 'express';
const router = express.Router();
import { ObjectId } from 'mongodb';

import {
    hallMaster,
    hallBookingMaster
} from '../models/index.js';

router.get("/", async (req, res) => {
    try {
        console.log("");
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
});

router.get("/getHallsAvailabilityStatus", async (req, res) => {

    const { selectedDate, selectedCity, eventId } = req.query;

    let eventObjectId = ""; // Event Type Object ID in Str

    function isObjectIdFormat(str) {
        return /^[0-9a-fA-F]{24}$/.test(str);
    }

    if (eventId && isObjectIdFormat(eventId)) {
        eventObjectId = new ObjectId(eventId);
        if (!ObjectId.isValid(eventObjectId)) {
            eventObjectId = null;
        }
    } else {
        eventObjectId = null;    
    }
    
    try {
        // Get all halls
        const allHalls = await hallMaster.aggregate([
                {
                    $match: {
                        hall_city: selectedCity ? selectedCity : {$exists: true}, 
                        hall_eventtype : eventObjectId ? { $in: [eventObjectId] } : { $exists: true },
                    }
                }
            ]
        );

        // Find bookings for the given date
        const bookings = await hallBookingMaster.aggregate([
            {
                $match: {
                    booking_timestamp: {
                        $gte: new Date(selectedDate),
                        $lt: new Date(selectedDate + 'T23:59:59.999Z')
                    },
                    hall_city: selectedCity ? selectedCity : {$exists: true}, 
                    event_id : eventObjectId ? eventObjectId : { $exists: true },
                },
            },
            {
                $group: {
                    _id: {
                      hall_id: "$hall_id",
                      hall_city: "$hall_city",   
                    },
                    totalDuration: { $sum: "$booking_duration" }
                },
            },
            {
                $project: {
                    _id: 0,
                    hall_id: "$_id.hall_id",
                    hall_city: "$_id.hall_city",
                    totalDuration: 1
                }
            }
        ]);

        // Group bookings by hall
        const bookingsByHall = {};
        bookings.forEach(booking => {
            bookingsByHall[booking.hall_id] = booking;
        });

        // Calculate availability status for each hall
        const hallAvailability = allHalls.map(hall => {
            const isHallAvailable = !bookingsByHall[hall._id]; //check if the hall is booked atleast once
            const checkAvailability = () => {
                const hallBookingDetails = bookingsByHall[hall._id];
                return hallBookingDetails.totalDuration > 8 ? "UNAVAILABLE" : "LIMITED AVAILABILITY";
            }
            const availabilityStatus = isHallAvailable ? 'AVAILABLE' : checkAvailability();
            return {
                hall_id: hall._id,
                hall_name: hall.hall_name,
                availability: availabilityStatus,
                hall_city: hall.hall_city,
                hall_images: hall.hall_images,
                hall_description: hall.hall_description,
            };
        });

        return res.status(200).json(hallAvailability);
    } catch (error) {
        console.error("Error calculating available time slots:", error);
        return res.status(500).json({message: error.message});
    }
})

router.post("/", async (req, res) => { 
    const newDocument = new hallBookingMaster(req.body);

    if(!newDocument) {
        return res.status(404).json({message: "Request Body attachment not found!!"});
    }

    try {
        const savedDocument = await newDocument.save();
        return res.status(200).json(savedDocument);
    } catch(err) {
        return res.status(500).json(err);
    }
});

export default router;
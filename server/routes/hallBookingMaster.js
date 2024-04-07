import { default as express } from 'express';
const router = express.Router();
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

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
                        hallCity: selectedCity ? selectedCity : {$exists: true}, 
                        hallEventTypes : eventObjectId ? { $in: [eventObjectId] } : { $exists: true },
                    }
                }
            ]
        );

        // Find bookings for the given date
        const bookings = await hallBookingMaster.aggregate([
            {
                $match: {
                    bookingTimestamp: {
                        $gte: new Date(selectedDate + 'T00:00:00.000Z'),
                        $lte: new Date(selectedDate + 'T23:59:59.999Z')
                    },
                    hallCity: selectedCity ? selectedCity : {$exists: true}, 
                    eventId : eventObjectId ? eventObjectId : { $exists: true },
                },
            },
            {
                $group: {
                    _id: {
                      hallId: "$hallId",
                      hallCity: "$hallCity",   
                    },
                    totalDuration: { $sum: "$bookingDuration" }
                },
            },
            {
                $project: {
                    _id: 0,
                    hallId: "$_id.hallId",
                    hallCity: "$_id.hallCity",
                    totalDuration: 1
                }
            }
        ]);

        // Group bookings by hall
        const bookingsByHall = {};
        bookings.forEach(booking => {
            bookingsByHall[booking.hallId] = booking;
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
                hallId: hall._id,
                hallName: hall.hallName,
                availability: availabilityStatus,
                hallCity: hall.hallCity,
                hallImages: hall.hallImages,
                hallDescription: hall.hallDescription,
            };
        });

        return res.status(200).json(hallAvailability);
    } catch (error) {
        console.error("Error calculating available time slots:", error);
        return res.status(500).json({message: error.message});
    }
});

router.get("/getHallAvailability", async (req, res) => {

    const { hallId, startDate, endDate } = req.query; 
    const hallObjectId = new mongoose.Types.ObjectId(hallId);
    console.log("ENTERED")
    console.log(hallId)
    console.log(startDate)
    console.log(endDate)
    try {

        const hallBookings = await hallBookingMaster.aggregate([
            {
                $match: {
                    hallId: hallObjectId,
                    bookingTimestamp: {
                        $gte: new Date(startDate + 'T00:00:00.000Z'),
                        $lte: new Date(endDate + 'T23:59:59.999Z')
                    },
                }     
            },
            {
                $project: {
                    _id: 1,
                    hallId: 1,
                    bookingTimestamp: 1,
                    bookingDuration: 1
                }
            }
        ]);

        if(!hallBookings) {
            return res.status(404).json({message: "No data found!!"});
        }

        return res.status(200).json(hallBookings);

    } catch (error) {
        return res.status(500).json({message: error.message});
    }
});

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
import mongoose from "mongoose";

const hallBookingMasterSchema = new mongoose.Schema({
    booking_id: { type: mongoose.Schema.Types.ObjectId, ref: 'bookingmasters'},
    hall_id: { type: mongoose.Schema.Types.ObjectId, ref: 'hallmasters'},
    booking_timestamp: {type: Date, required: true, unique: true},
    event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'eventmasters'},
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'customermasters'},
    book_caterer: { type: Boolean, required: true },
    booking_status: {type: String, enum:['PENDING', 'CONFIRMED', 'REJECTED'], default:'CONFIRMED'},
    booking_duration: { type: Number, required: true },
    comments: { type: String }
}, { timestamps: true });

const hallBookingMaster = mongoose.model("hallBookingMaster", hallBookingMasterSchema);

export default hallBookingMaster;
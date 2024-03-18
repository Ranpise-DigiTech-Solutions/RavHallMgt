import mongoose from "mongoose";

const bookingMasterSchema = new mongoose.Schema({
    hall_id: { type: mongoose.Schema.Types.ObjectId, ref: 'hallmasters'},
    booking_timestamp: {type: Date, required: true, unique: true},
    event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'eventmasters'},
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'customermasters'},
    book_caterer: { type: Boolean, required: true },
    booking_status: {type: String, enum:['PENDING', 'CONFIRMED', 'REJECTED'], default:'PENDING'},
    booking_duration: { type: Number, required: true },
    comments: { type: String }
}, { timestamps: true });

const bookingMaster = mongoose.model("bookingMaster", bookingMasterSchema);

export default bookingMaster;
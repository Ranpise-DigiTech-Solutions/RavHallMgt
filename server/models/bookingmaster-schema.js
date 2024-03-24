import mongoose from "mongoose";

const bookingMasterSchema = new mongoose.Schema({
    hall_id: { type: mongoose.Schema.Types.ObjectId, ref: 'hallmasters'},
    vendor_id: {type: mongoose.Schema.Types.ObjectId, ref: 'vendormasters'},
    booking_timestamp: {type: Date, required: true,},
    event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'eventmasters'},
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'customermasters'},
    booking_type: { type: String, enum: ['HALL', 'VENDOR'], default: "HALL" },
    book_caterer: { type: Boolean, required: true },
    booking_status: {type: String, enum:['PENDING', 'CONFIRMED', 'REJECTED'],default:'PENDING'},
    booking_duration: { type: Number, required: true },
    comments: { type: String }
}, { timestamps: true });
bookingMasterSchema.index({ customer_id: 1, booking_timestamp: 1 }, { unique: true });

const bookingMaster = mongoose.model("bookingMaster", bookingMasterSchema);

export default bookingMaster;
import mongoose from "mongoose";

const hallBookingMasterSchema = new mongoose.Schema({
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'bookingmasters'},
    hallId: { type: mongoose.Schema.Types.ObjectId, ref: 'hallmasters'},
    hallCity: {type: String},
    bookingTimestamp: {type: Date, required: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'eventtypes'},
    vendorTypeId: {type: mongoose.Schema.Types.ObjectId, ref: 'vendortypes', required: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'customermasters'},
    bookCaterer: { type: Boolean, required: true },
    bookingStatus: {type: String, enum:['PENDING', 'CONFIRMED', 'REJECTED'], default:'CONFIRMED'},
    bookingDuration: { type: Number, required: true },
    comments: { type: String }
}, { timestamps: true });
hallBookingMasterSchema.index({ customerId: 1, bookingTimestamp: 1 }, { unique: true });

const hallBookingMaster = mongoose.model("hallBookingMaster", hallBookingMasterSchema);

export default hallBookingMaster;
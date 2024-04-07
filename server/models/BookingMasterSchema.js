import mongoose from "mongoose";

const bookingMasterSchema = new mongoose.Schema({
    hallId: { type: mongoose.Schema.Types.ObjectId, ref: 'hallmasters'},
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "vendormasters"},
    vendorTypeId: {type: mongoose.Schema.Types.ObjectId, ref: 'vendortypes', required: true },
    bookingTimestamp: {type: Date, required: true,},
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'eventtypes', required: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'customermasters', required: true },
    bookingType: { type: String, enum: ['HALL', 'VENDOR'], default: "HALL" },
    bookCaterer: { type: Boolean, required: true },
    bookingStatus: {type: String, enum:['PENDING', 'CONFIRMED', 'REJECTED'],default:'PENDING'},
    bookingDuration: { type: Number, required: true },
    comments: { type: String }
}, { timestamps: true });
bookingMasterSchema.index({ customerId: 1, bookingTimestamp: 1 }, { unique: true });

const bookingMaster = mongoose.model("bookingMaster", bookingMasterSchema);

export default bookingMaster;
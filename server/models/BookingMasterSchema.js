import mongoose from "mongoose";

const bookingMasterSchema = new mongoose.Schema({
    // HALL BOOKING
    hallId: { type: mongoose.Schema.Types.ObjectId, ref: 'hallmasters'},
    hallCity: {type: String, required: true },
    vendorTypeId: {type: mongoose.Schema.Types.ObjectId, ref: 'vendortypes', required: true },
    bookingTimestamp: {type: Date, required: true,},
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'eventtypes', required: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'customermasters', required: true },
    bookingType: { type: String, enum: ['HALL', 'VENDOR'], default: "HALL" },
    bookCaterer: { type: Boolean, required: true },
    bookingStatus: {type: String, enum:['PENDING', 'CONFIRMED', 'REJECTED'],default:'PENDING'},
    bookingDuration: { type: Number, required: true },

    // details entered by customer 
    guestsCount: { type: Number, required: true},
    roomsCount: { type: Number, required: true},
    parkingRequirement: { type: Boolean, required: true},
    vehiclesCount: { type: Number, required: true},
    customerVegRate: { type: Number },
    customerNonVegRate: { type: Number },
    customerVegItemsList: { type: String },
    customerNonVegItemsList: { type: String },
    bookingDate: { type: String, required : true},
    bookingStartTime: { type: String, required: true},
    bookingEndTime: { type: String, required: true},
    customerInfo: { type: String },
    customerSuggestion: { type: String },

    // OTHER VENDORS BOOKING
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "vendormasters"},

}, { timestamps: true });
bookingMasterSchema.index({ customerId: 1, bookingTimestamp: 1 }, { unique: true });

const bookingMaster = mongoose.model("bookingMaster", bookingMasterSchema);

export default bookingMaster;
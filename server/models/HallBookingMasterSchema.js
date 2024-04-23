import mongoose from "mongoose";

const hallBookingMasterSchema = new mongoose.Schema({
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'bookingmasters'},
    hallId: { type: mongoose.Schema.Types.ObjectId, ref: 'hallmasters'},
    hallCity: {type: String, required: true},
    bookingTimestamp: {type: Date, required: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'eventtypes'},
    vendorTypeId: {type: mongoose.Schema.Types.ObjectId, ref: 'vendortypes', required: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'customermasters'},
    bookCaterer: { type: Boolean, required: true },
    bookingStatus: {type: String, enum:['PENDING', 'CONFIRMED', 'REJECTED'], default:'CONFIRMED'},
    bookingStatusRemark: { type: String },    
    bookingDuration: { type: Number, required: true },

    finalGuestCount: { type: Number, required: true },
    finalRoomCount: { type: Number, required: true },
    finalHallParkingRequirement: { type: Boolean, required: true},
    finalVehicleCount: { type: Number, required: true },
    finalVegRate: { type: Number },
    finalNonVegRate: { type: Number },
    finalVegItemsList: { type: String },
    finalNonVegItemsList: { type: String },
    finalBookingDate: { type: String, required : true},
    finalBookingStartTime: { type: String, required: true},
    finalBookingEndTime: { type: String, required: true},
}, { timestamps: true });
hallBookingMasterSchema.index({ customerId: 1, bookingTimestamp: 1 }, { unique: true });

const hallBookingMaster = mongoose.model("hallBookingMaster", hallBookingMasterSchema);

export default hallBookingMaster;
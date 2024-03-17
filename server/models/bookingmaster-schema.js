import mongoose from "mongoose";

const bookingMasterSchema = new mongoose.Schema({
    event_name: { type: String, required: true, unique:true},
}, { timestamps: true });

const bookingMaster = mongoose.model("bookingMaster", bookingMasterSchema);

export default bookingMaster;
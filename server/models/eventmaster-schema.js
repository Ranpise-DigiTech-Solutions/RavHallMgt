import mongoose from "mongoose";

const eventMasterSchema = new mongoose.Schema({
    event_name: { type: String, required: true, unique:true},
    company_location: { type: String},
    company_ownername: { type: String},
    comapny_contact: { type: String},
    company_email: { type: String},
}, { timestamps: true });

const eventMaster = mongoose.model("eventMaster", eventMasterSchema);

export default eventMaster;
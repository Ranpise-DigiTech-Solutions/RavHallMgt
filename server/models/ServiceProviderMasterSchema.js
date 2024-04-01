import mongoose from "mongoose";

const serviceProviderMasterSchema = new mongoose.Schema({
    vendor_name: { type: String, required: true},
    vendor_id: {type: mongoose.Schema.Types.ObjectId, ref: 'vendormasters'},
    vendor_location: {type: String},
    vendor_contact: {type: String, required: true, unique: true},
    vendor_email: {type: String, required: true},
    vendor_password: {type: String},
    vendor_uid: {type: String, required: true, unique: true},
    service_brandName: {type: String, required: true},
    service_location: {type: String, required: true},
    event_types: [{type: mongoose.Schema.Types.ObjectId, ref: 'eventmasters', required: true}],

}, { timestamps: true });

const serviceProviderMaster = mongoose.model("serviceProviderMaster", serviceProviderMasterSchema);

export default serviceProviderMaster;
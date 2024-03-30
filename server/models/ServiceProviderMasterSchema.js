import mongoose from "mongoose";

const serviceProviderMasterSchema = new mongoose.Schema({
    vendor_name: { type: String, required: true},
    vendor_location: {type: String},
    vendor_contact: {type: String, required: true ,unique: true},
    vendor_email: {type: String}
}, { timestamps: true });

const serviceProviderMaster = mongoose.model("serviceProviderMaster", serviceProviderMasterSchema);

export default serviceProviderMaster;
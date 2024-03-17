import mongoose from "mongoose";

const customerMasterSchema = new mongoose.Schema({
    customer_name: { type: String, required: true},
    customer_location: {type: String},
    customer_contact: {type: String, required: true ,unique: true},
    customer_email: {type: String}
}, { timestamps: true });

const customerMaster = mongoose.model("customerMaster", customerMasterSchema);

export default customerMaster;
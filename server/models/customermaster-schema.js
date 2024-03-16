import mongoose from "mongoose";

const customerMasterSchema = new mongoose.Schema({
    event_name: { type: String, required: true, unique:true},
}, { timestamps: true });

const customerMaster = mongoose.model("customerMaster", customerMasterSchema);

export default customerMaster;
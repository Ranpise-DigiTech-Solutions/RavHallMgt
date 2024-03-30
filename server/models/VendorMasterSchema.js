import mongoose from "mongoose";

const vendorMasterSchema = new mongoose.Schema({
    vendor_type: { type: String, required: true, unique:true},
}, { timestamps: true });

const vendorMaster = mongoose.model("vendorMaster", vendorMasterSchema);

export default vendorMaster;
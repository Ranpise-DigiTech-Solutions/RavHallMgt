import mongoose from "mongoose";

const vendorBusinessMasterSchema = new mongoose.Schema({
    
}, { timestamps: true });

const vendorBusinessMaster = mongoose.model("vendorBusinessMaster", vendorBusinessMasterSchema);

export default vendorBusinessMaster;
import mongoose from "mongoose";

const venueMasterSchema = new mongoose.Schema({
    venue_type: { type: String, required: true, unique:true},
}, { timestamps: true });

const venueMaster = mongoose.model("venueMaster", venueMasterSchema);

export default venueMaster;
import mongoose from "mongoose";

const eventMasterSchema = new mongoose.Schema({
    event_name: { type: String, required: true, unique:true},
}, { timestamps: true });

const eventMaster = mongoose.model("eventMaster", eventMasterSchema);

export default eventMaster;
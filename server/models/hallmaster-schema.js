import mongoose from "mongoose";

const hallMasterSchema = new mongoose.Schema({
    hall_name: { type: String, required: true, unique:true},
    hall_description: { type: String },
    hall_age: { type: Number},
    hall_nrooms: { type: Number},
    hall_vrate: { type: Number},
    hall_nvrate: { type: Number},
    hall_mobcontact: { type: String},
    hall_landcontact: { type: String},
    hall_eventtype: [{ type: mongoose.Schema.Types.ObjectId, ref: 'eventmasters'}], 
    hall_country: { type: String},
    hall_state: { type: String},
    hall_city: { type: String},
    hall_taluk: { type: String},
    hall_pincd: { type: Number},
    hall_mgrnm: { type: String},     
    hall_email: { type: String},
    hall_images: [{ type: String}],
    hall_description: {type: String}
}, { timestamps: true });

const hallMaster = mongoose.model("hallMaster", hallMasterSchema);

export default hallMaster;
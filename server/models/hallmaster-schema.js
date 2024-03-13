import { Int32 } from "mongodb";
import mongoose from "mongoose";

const hallMasterSchema = new mongoose.Schema({
    hall_name: { type: String},
    hall_age: { type: Number},
    hall_nrooms: { type: Number},
    hall_vrate: { type: Number},
    hall_nvrate: { type: Number},
    hall_mobcontact: { type: String},
    hall_landcontact: { type: String},
    hall_country: { type: String},
    hall_state: { type: String},
    hall_city: { type: String},
    hall_taluk: { type: String},
    hall_pincd: { type: Number},
    hall_mgrnm: { type: String},     
    hall_email: { type: String},
    hall_image: { type: String},
    hall_description: {type: String}
})

const hallMaster = mongoose.model("hallMaster1", hallMasterSchema);

export default hallMaster;
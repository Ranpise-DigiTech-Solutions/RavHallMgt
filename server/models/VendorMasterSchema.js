import mongoose from "mongoose";

const vendorMasterSchema = new mongoose.Schema({
    companyName: { type: String, required: true, unique: true },
    companyAddress: { type: String, required: true },
    companyCity: { type: String, required: true },
    companyPincode: { type: Number, required: true },
    companyState: { type: String, required: true },
    companyTaluk: { type: String, required: true },
    companyCountry: { type: String, required: true },

    vendorRegisterNo: { type: String },
    vendorRegisterDate: { type: Date },

    vendorMainContact: { type: String, required: true },
    vendorMainDesignation: { type: String },
    vendorMainOfficeNo: { type: Number, required: true },
    vendorMainMobile: { type: Number, required: true },
    vendorMainEmail: { type: String, required: true },

    vendorAlternateContact: { type: String },
    vendorAlternateDesignation: { type: String },
    vendorAlternateOfficeNo: { type: Number },
    vendorAlternateMobile: { type: Number },
    vendorAlternateEmail: { type: String },

    vendorTypeId: { type: mongoose.Schema.Types.ObjectId, ref: 'vendortypes', required: true }, // vendor type id
    vendorDescription: { type: String, required: true },
    vendorImages: [{ type: String, required: true }],

    programId: { type: String, required: true },
    vendorUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'serviceprovidermasters', required: true },
    
}, { timestamps: true });

const vendorMaster = mongoose.model("vendorMaster", vendorMasterSchema);

export default vendorMaster;
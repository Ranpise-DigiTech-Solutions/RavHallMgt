import { default as express } from 'express';
const router = express.Router();

import vendorMaster from '../models/vendormaster-schema.js';

router.get("/", async (req, res) => {
    try {
        const vendorDetails = await vendorMaster.find(filter);

        if(!vendorDetails) {
            return res.status(404).json({message: "No Records Found"});
        }

        return res.status(200).json(vendorDetails); 
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
});

router.post("/", async (req, res) => { 
    const newDocument = new vendorMaster(req.body);

    if(!newDocument) {
        return res.status(404).json({message: "Request Body attachment not found!!"});
    }

    try {
        const savedDocument = await newDocument.save();
        return res.status(200).json(savedDocument);
    } catch(err) {
        return res.status(500).json(err);
    }
});

export default router;
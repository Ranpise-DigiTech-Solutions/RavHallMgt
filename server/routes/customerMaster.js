import { default as express } from 'express';
const router = express.Router();

import customerMaster from '../models/customermaster-schema.js';

router.get("/", async (req, res) => {
    const filter = {};

    try {
        const customerDetails = await customerMaster.find(filter);

        if(!customerDetails) {
            return res.status(404).json({message: "No Records Found"});
        }

        return res.status(200).json(eventDetails); 
    } catch(error) {
        return res.status(500).json({message: error.message});
    }
});

router.post("/", async (req, res) => { 
    const newDocument = new customerMaster(req.body);

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
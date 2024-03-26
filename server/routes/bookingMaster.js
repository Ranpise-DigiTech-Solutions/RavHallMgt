import { default as express } from 'express';
const router = express.Router();

import { bookingMaster } from '../models/index.js';

router.get("/", async (req, res) => {
    try {
        console.log("");
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
});

router.post("/", async (req, res) => { 
    const newDocument = new bookingMaster(req.body);

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
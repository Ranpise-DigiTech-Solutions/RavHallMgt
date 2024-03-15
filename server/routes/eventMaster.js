import { default as express } from 'express';
const router = express.Router();

import eventMaster from '../models/eventmaster-schema.js';

router.post("/", async (req, res) => { 
    const newDocument = new eventMaster(req.body);

    try {
        const savedDocument = await newDocument.save();
        return res.status(200).json(savedDocument);
    } catch(err) {
        return res.status(500).json(err);
    }
});

router.get("/", async (req, res) => {

    const filter = {};

    try {
        const eventDetails = await eventMaster.find(filter);
        return res.status(200).json(eventDetails); 
    } catch(error) {
        return res.status(500).json({message: error.message});
    }
});

router.get("/getEventId", async (req, res) => {

    const { eventName } = req.query;

    try {
        var document = await eventMaster.findOne({ "event_name": eventName });

        if (document) {
            var documentId = document._id;
            return res.status(200).json(documentId);
        } else {
            return res.status(404).json({message: "Not Found! No documents match your condition!"});
        }

    } catch(error) {
        return res.status(500).json({message: error.message});
    }
});

export default router;
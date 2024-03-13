import { default as express } from 'express';
const router = express.Router();

import hallMaster from "../models/hallmaster-schema.js";

router.get('/', async(req, res)=> {
    try {
        const hallDetails = await hallMaster.find({});
        res.status(200).json(hallDetails); 
    } catch(error) {
        res.status(500).json({message: error.message});
    }
})

router.post('/', async (req, res) => {
    const newDocument = new hallMaster(req.body);
    console.log(newDocument);
    try {
        const savedDocument = await newDocument.save();
        res.status(200).json(savedDocument);
    } catch(err) {
        res.status(500).json(err);
    }
});

export default router;
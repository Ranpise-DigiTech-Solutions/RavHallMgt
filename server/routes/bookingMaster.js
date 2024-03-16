import { default as express } from 'express';
const router = express.Router();

import bookingMaster from '../models/bookingmaster-schema.js';

router.get("/", async (req, res) => {
    try {
        console.log("");
    } catch (error) {
        return res.status(404).json({message: ""});
    }
});

export default router;
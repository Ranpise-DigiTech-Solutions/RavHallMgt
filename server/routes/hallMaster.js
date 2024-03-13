import { default as express } from 'express';
const router = express.Router();

import hallMaster from "../models/hallmaster-schema.js";

router.get('/', async(req, res)=> {

    const { hall_city } = req.query;

    // Build the filter object based on the provided parameters
    const filter = {};

    if (hall_city) {
        filter.hall_city = hall_city;
    }

    try {
        const hallDetails = await hallMaster.find(filter);
        return res.status(200).json(hallDetails); 
    } catch(error) {
        return res.status(500).json({message: error.message});
    }
})

router.post('/', async (req, res) => {
    const newDocument = new hallMaster(req.body);
    console.log(newDocument);
    try {
        const savedDocument = await newDocument.save();
        return res.status(200).json(savedDocument);
    } catch(err) {
        return res.status(500).json(err);
    }
});

router.patch('/:id', async (req, res) => {

    const resourceId = req.params.id;
    const updatedFields = req.body;

    try {
        const updatedResource = await hallMaster.findOneAndUpdate(
            { _id: mongoose.Types.ObjectId(resourceId) },
            { $set: updatedFields },
            { new: true }
          );
      
          if (!updatedResource) {
            return res.status(404).json({ message: 'Resource not found' });
          }
      
          res.status(200).json(updatedResource);
    } catch(err) {
        return res.status(500),json({message: err.message});
    }
})

export default router;
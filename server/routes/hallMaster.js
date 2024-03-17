import { default as express } from 'express';
const router = express.Router();
import { ObjectId } from 'mongodb';

import hallMaster from "../models/hallmaster-schema.js";

router.get('/', async(req, res)=> {

    const { hallCity, eventId } = req.query;
    let specificObjectId = "";

    function isObjectIdFormat(str) {
        return /^[0-9a-fA-F]{24}$/.test(str);
      }
    
    if (eventId && isObjectIdFormat(eventId)) {
        specificObjectId = new ObjectId(eventId);
        if (!ObjectId.isValid(specificObjectId)) {
            specificObjectId = null;
        }
    } else {
        specificObjectId = null;    
    }

    try {
        const hallDetails = await hallMaster.aggregate([
            {
                $match: {
                    "hall_city": hallCity ? hallCity : {$exists: true},
                    "hall_eventtype" : specificObjectId ? { $in: [specificObjectId] } : { $exists: true }
                }
            }
        ]);
        return res.status(200).json(hallDetails); 
    } catch(error) {
        return res.status(500).json({message: error.message});
    }
});

router.post('/', async (req, res) => {
    const newDocument = new hallMaster(req.body);

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

router.patch('/:id', async (req, res) => {

    const resourceId = req.params.id;
    const updatedFields = req.body;

    if(!resourceId || !updatedFields) {
        return res.status(404).json({message: "Required fields missing!!"});
    }

    try {
        const updatedResource = await hallMaster.findOneAndUpdate(
            { _id: resourceId },
            { $set: updatedFields },
            { new: true }
          );
      
          if (!updatedResource) {
            return res.status(404).json({ message: 'Resource not found' });
          }
      
          res.status(200).json(updatedResource);
    } catch(err) {
        return res.status(500).json({message: err.message});
    }
});

router.delete("/:id", async (req, res) => {

    const { id } = req.params;

    if(!id) {
        return res.status(404).json({message: "Missing Id parameter!!"});
    }

    try {
      const deletedHall = await hallMaster.findByIdAndDelete(id);
  
      if (!deletedHall) {
        return res.status(404).json({ message: 'Document not found.' });
      }
  
      return res.status(200).json({ message: 'Document deleted successfully.', deletedHall });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
});

export default router;
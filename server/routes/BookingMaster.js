import { default as express } from 'express';
const router = express.Router();
import { bookingMaster } from '../models/index.js';

router.get("/", async (req, res) => {
    try {
        // Add logic here to fetch data from the database
        const data = await bookingMaster.find(); // Example: fetching all bookingMaster documents

        // Send the fetched data in the response
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
});
router.get("/:id", async (req, res) => {
    const bookingId = req.params.id;

    try {
        const bookingdata = await bookingMaster.findById(bookingId);

        if (!bookingdata) {
            return res.status(404).json({ message: "Customer not found" });
        }

        return res.status(200).json(bookingdata);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    
    try {
        const { id } = req.params;
        const{bookingStatus}=req.body;
        
        // Update the bookingStatus to 'confirmed' or 'REJECTED' in the bookingMaster table
        const updatedBooking = await bookingMaster.findByIdAndUpdate(
          id,
          { bookingStatus: bookingStatus },
          { new: true }
        );
    
        res.status(200).json(updatedBooking);
      } catch (error) {
        res.status(500).json({ error: error.message });
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
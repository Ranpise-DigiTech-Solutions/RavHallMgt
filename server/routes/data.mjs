import express from 'express';
import cors from 'cors';
const router = express.Router();
// Assuming db.js is in a database folder
import Connection from '../database/db.mjs'
// Route for fetching data (GET request)
router.get('/api/data', async (req, res) => {
  try {
    const db = await connectToDb();
    const collection = db.collection('venueMasterDB'); // Replace with your collection name
    const data = await collection.find().toArray();

    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error");
  }
});

// Add more routes for handling data access (e.g., POST to create new data, PUT to update)

export { router as dataRouter }; 

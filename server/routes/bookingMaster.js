import { default as express } from 'express';
const router = express.Router();
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import {doc, getDoc, updateDoc} from 'firebase/firestore';

import { bookingMaster } from '../models/index.js';
import {firestore} from "../database/FirebaseDb.js";

router.get("/", async (req, res) => {
    try {
        console.log("");
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
});

router.post("/", async (req, res) => { 
    const postData = req.body;
    // console.log(data);
    if(!postData) {
        return res.status(404).json({message: "Request Body attachment not found!!"});
    }

    const hallObjectId = new mongoose.Types.ObjectId(postData.hallId);
    const vendorTypeObjectId = new mongoose.Types.ObjectId(postData.vendorTypeId);
    const eventTypeObjectId = new mongoose.Types.ObjectId(postData.eventId);
    const customerObjectId = new mongoose.Types.ObjectId(postData.customerId);

    // to get the updated booking id from firebase
    const docRef = doc(firestore, "counters", "bookingMasterId");
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        return res.status(404).send("Document not found!");
    }

    const data = docSnap.data();
    const prevId = data.currentId;
    const newId = prevId + 1;
    
    console.log("New Booking Id: " + newId);

    const updatedData = {
        documentId: parseInt(newId),
        ...postData,
        hallId: hallObjectId,
        vendorTypeId: vendorTypeObjectId,
        eventId: eventTypeObjectId,
        customerId: customerObjectId,
    };

    const newDocument = new bookingMaster(updatedData);

    if(!newDocument) {
        return res.status(404).json({message: "Operation Failed!!"});
    }

    try {
        const savedDocument = await newDocument.save();
        
        // Update the Firestore document with the new ID
        await updateDoc(docRef, {currentId: newId});

        return res.status(200).json(savedDocument);
    } catch(err) {
        return res.status(500).json(err);
    }
});

export default router;
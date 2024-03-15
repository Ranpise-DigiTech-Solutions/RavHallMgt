import { default as express } from 'express';
const router = express.Router();

import { collection, addDoc, query, getDocs } from 'firebase/firestore';
import { firestore } from '../database/FirebaseDb.js';

router.get("/", async (req, res) => {

    const { sessionId } = req.query;

    try {
        const messagesQuery = query(collection(firestore, `/chats/SessionID_${sessionId}/Messages/`));
        const querySnapshot = await getDocs(messagesQuery);
        const fetchedMessages = querySnapshot.docs.map((doc) => doc.data());

        return res.status(200).json(fetchedMessages);

    } catch(error) {
        console.log(error);
        return res.status(500).json({message: error.message});
    }
});

router.post("/", async (req, res) => {

    const { sessionId, inputValue } = req.body;
    console.log("SessionId",sessionId);

    try {
        const docRef = await addDoc(collection(firestore, `/chats/SessionID_${sessionId}/Messages/`), {
            content: inputValue,
            sender: 'me',
            timestamp: new Date().toISOString(),
          });
          console.log('Document written with ID: ', docRef.id);

          return res.status(200).json({message: "Document Upload Successfull!!"});

    } catch (error) {
        return res.status(500).json({message: error.message});
    }
});

export default router;
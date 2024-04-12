import { default as express } from 'express';
const router = express.Router();
import { firebaseStorage } from '../database/FirebaseDb.js';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { default as multer } from 'multer';
// import { upload } from '../index.js';

import { customerMaster } from '../models/index.js';

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     }
// });

// export const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
    const filter = {};

    try {
        const customerDetails = await customerMaster.find(filter);

        if(!customerDetails) {
            return res.status(404).json({message: "No Records Found"});
        }

        return res.status(200).json(customerDetails); 
    } catch(error) {
        return res.status(500).json({message: error.message});
    }
});

router.post("/", async (req, res) => { 
    const newDocument = new customerMaster(req.body);

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

router.patch('/updateCustomer', async (req, res) => {
    
    if(!req.body || !req.query.userId || !req.query.documentId) {
        return res.status(404).json({message: "Required Fields missing in the Request body!!"});
    }

    const {customerProfileImage, ...customerData} = req.body;
    // const customerProfileImage = req.files.customerProfileImage;
    const { userId, documentId } = req.query;
    let customerProfileImageUrl = "";
    const customerProfileImageRef = ref(firebaseStorage, `CUSTOMER/${userId}/ProfileImage/`);

    // console.log(customerProfileImage);
    // return res.status(200).json({message: req.body});

    try {
        if(customerProfileImage) {
            await uploadBytes(customerProfileImageRef, customerProfileImage);
            customerProfileImageUrl = await getDownloadURL(customerProfileImageRef);
        }

        const postBody = {
            ...customerData,
            customerProfileImage: customerProfileImageUrl
        }

        const updatedDocument = await customerMaster.findByIdAndUpdate(
            documentId,
            postBody,
            { new: true }
        );
        
        if (!updatedDocument) {
            return res.status(404).json({ message: "Document not found!" });
        }
        
        return res.status(200).json(updatedDocument);
    } catch(error) {
        console.log(error.message);
        return res.status(500).json(error.message);
    }
});

export default router;
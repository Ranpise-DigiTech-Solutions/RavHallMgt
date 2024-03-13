import { default as express } from 'express';
const router = express.Router();
import axios from 'axios';


router.get('/', async(req, res)=> {
    try {
        const apiURL = `https://countriesnow.space/api/v0.1/countries/state/cities`;
        const postData = {
            "country": "India",
            "state": "Karnataka"
        }

        const response = await axios.post(apiURL, postData);
        if (!response) {
            console.log("Error!!");
            return;
        }

        return res.status(200).json(response.data.data); 
    } catch(error) {
        return res.status(500).json({message: error.message});
    }
})

export default router;
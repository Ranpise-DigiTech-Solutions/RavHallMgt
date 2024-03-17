import { default as express } from 'express';
const router = express.Router();
import axios from 'axios';


router.get('/', async(req, res)=> {
    try {
        const apiURL = `https://countriesnow.space/api/v0.1/countries`;
        
        const response = await axios.get(apiURL);
        
        if (!response) {
            return res.status(502).json({message: "Bad Gateway! Received Invalid response from CountriesNow Server"});
        }

        const formatCity = (city, country) => `${city}, ${country}`;
        const indianCities = response.data.data
        .filter(({ country }) => country === "India")
        .map(({ country, cities }) => cities.map(city => formatCity(city, country)))
        .flat();
        
        // const formattedCities = response.data.data.flatMap(({ country, cities }) =>
        //     cities.map(city => formatCity(city, country))
        // );

        return res.status(200).json(indianCities); 
    } catch(error) {
        return res.status(500).json({message: error.message});
    }
})

export default router;
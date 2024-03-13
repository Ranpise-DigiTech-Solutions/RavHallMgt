import { default as express } from 'express';
import { default as dotenv } from 'dotenv';

import cors from 'cors';
import bodyParser from 'body-parser';
import Connection from './database/db.js';

import hallMasterRoute from './routes/hallMaster.js';

const app = express();
app.use(cors());
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json())

dotenv.config()
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
const PORT = process.env.SERVER_PORT_NUMBER;
Connection(USERNAME, PASSWORD);

app.use('/eventify_server/hallMaster/', hallMasterRoute);

app.listen(PORT, () => console.log(`server running successfully on 8000`));
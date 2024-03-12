import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { dataRouter } from './routes/data.mjs'; // Use import for ES modules
import { usersRouter } from './routes/api/users.mjs';
const app = express();
const router = express.Router();
app.use(cors());
app.use(bodyParser.json({extended: true})); // extended = true allows parsing of nested objects within the request body
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', router);
app.use('/data', dataRouter);
app.use('/api/users', usersRouter);

dotenv.config()

const PORT = process.env.SERVER_PORT_NUMBER;

app.listen(PORT, () => console.log(`server running successfully on 8000`));
import { Connection } from './database/db.mjs';

(async () => {
  try {
    const connected = await Connection();
    if (connected) {
      console.log("Database connected successfully!");
      // Start your server here
    } else {
      console.error("Failed to connect to database!");
      // Handle connection error
    }
  } catch (error) {
    console.error("Error during connection check:", error.message);
  }
})();


import express from 'express';
import dotenv from 'dotenv';
import Connection from './database/db.js';
import Router from './routes/route.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';

const __dirname = path.resolve();

const app = express();

dotenv.config();

const PORT = process.env.PORT || 8000; 

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

Connection(username, password);

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', Router);
app.use(express.static(path.join(__dirname, './client/build')));


app.get('*', function (_, res) {
  const err = new Error('Something went wrong.');

  if (err) {
    return res.status(500).send(err);
  }

  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));

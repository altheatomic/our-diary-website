import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './utils/db.js';

dotenv.config();

const app = express();
connectDB();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Our Diary API is working!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

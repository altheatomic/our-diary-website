import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './utils/db.js';
import authRoutes from './routes/authRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import emotionRoutes from './routes/emotionRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
connectDB();

app.use(express.json());
app.use('/api/auth', authRoutes); 
app.use('/api/notes', noteRoutes);
app.use('/api/emotions', emotionRoutes);

app.get('/', (req, res) => {
  res.send('Our Diary API is working!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
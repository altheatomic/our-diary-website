import express from 'express';
import protect from '../middleware/authMiddleware.js';
import { createNote, getNotes } from '../controllers/noteController.js';

const router = express.Router();

router.post('/', protect, createNote);
router.get('/', protect, getNotes);

export default router;

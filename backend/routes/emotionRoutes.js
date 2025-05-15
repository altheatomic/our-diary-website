import express from "express";
import protect from '../middleware/authMiddleware.js';
import {
  getEmotionsByUser,
  setOrUpdateEmotion,
} from "../controllers/emotionController.js";

const router = express.Router();

router.get("/:userId", protect, getEmotionsByUser);
router.post("/", protect, setOrUpdateEmotion);

export default router;

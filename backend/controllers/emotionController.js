import Emotion from '../models/Emotion.js';

// [GET] /api/emotions/:userId
export const getEmotionsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const emotions = await Emotion.find({ userId });
    res.json(emotions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch emotions" });
  }
};

// [POST] /api/emotions
export const setOrUpdateEmotion = async (req, res) => {
  try {
    const { userId, date, emotion } = req.body;

    if (!userId || !date || !emotion) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const updated = await Emotion.findOneAndUpdate(
      { userId, date },
      { emotion },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to save emotion" });
  }
};
